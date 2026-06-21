import {PermissionsAndroid, Platform} from 'react-native';
import notifee, {
  AndroidImportance,
  AndroidStyle,
  type Notification,
} from '@notifee/react-native';
import {
  AuthorizationStatus,
  getAPNSToken,
  getMessaging,
  getToken,
  onTokenRefresh,
  requestPermission,
  type RemoteMessage,
} from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DEFAULT_CHANNEL_ID = 'default';
const __seenMessageIds = new Map<string, number>();
const SEEN_TTL_MS = 10 * 60 * 1000; // 10 minutes
const PUSH_PREF_KEY = 'push_notifications_enabled';

function getMessagingInstance() {
  return getMessaging();
}

function markSeen(messageId: string): boolean {
  const now = Date.now();
  // cleanup
  for (const [k, t] of __seenMessageIds.entries()) {
    if (now - t > SEEN_TTL_MS) __seenMessageIds.delete(k);
  }
  const prev = __seenMessageIds.get(messageId);
  if (prev && now - prev < SEEN_TTL_MS) return true;
  __seenMessageIds.set(messageId, now);
  return false;
}

export async function getPushNotificationsEnabledPref(): Promise<boolean> {
  try {
    const raw = await AsyncStorage.getItem(PUSH_PREF_KEY);
    // Default: enabled (so first-time users with OS permission ON see the toggle ON)
    if (raw == null) return true;
    return raw === 'true';
  } catch {
    return true;
  }
}

export async function setPushNotificationsEnabledPref(enabled: boolean): Promise<void> {
  try {
    await AsyncStorage.setItem(PUSH_PREF_KEY, enabled ? 'true' : 'false');
  } catch {}
}

export async function ensureDefaultChannel(): Promise<string> {
  if (Platform.OS !== 'android') return DEFAULT_CHANNEL_ID;
  try {
    return await notifee.createChannel({
      id: DEFAULT_CHANNEL_ID,
      name: 'Default',
      importance: AndroidImportance.HIGH,
    });
  } catch {
    return DEFAULT_CHANNEL_ID;
  }
}

export async function requestNotificationPermission(): Promise<{
  granted: boolean;
  status?: string;
}> {
  try {
    if (Platform.OS === 'android') {
      // Android 13+ runtime permission
      if ((Platform.Version as number) >= 33) {
        const res = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        return { granted: res === PermissionsAndroid.RESULTS.GRANTED, status: res };
      }
      return { granted: true, status: 'GRANTED' };
    }

    const settings = await notifee.requestPermission();
    // notifee uses iOS authorizationStatus; keep it as a string for callers
    const granted =
      settings.authorizationStatus === 1 || // AUTHORIZED
      settings.authorizationStatus === 2; // PROVISIONAL
    return { granted, status: String(settings.authorizationStatus) };
  } catch (e) {
    return { granted: false, status: String((e as any)?.message ?? e) };
  }
}

export async function requestFcmPermissionIOS(): Promise<{
  granted: boolean;
  status?: number;
}> {
  if (Platform.OS !== 'ios') return { granted: true };
  try {
    const status = await requestPermission(getMessagingInstance(), {
      alert: true,
      sound: true,
      badge: true,
      provisional: true,
    });
    const granted =
      status === AuthorizationStatus.AUTHORIZED ||
      status === AuthorizationStatus.PROVISIONAL;
    return { granted, status };
  } catch {
    return { granted: false };
  }
}

// FC Token (FCM token)
export async function getFcmToken(): Promise<string | null> {
  try {
    const token = await getToken(getMessagingInstance());
    return token || null;
  } catch {
    return null;
  }
}

export async function getPushDebugTokens(): Promise<{
  fcmToken: string | null;
  apnsToken: string | null;
}> {
  try {
    const [fcmToken, apnsToken] = await Promise.all([
      getToken(getMessagingInstance()).catch(() => null),
      Platform.OS === 'ios'
        ? getAPNSToken(getMessagingInstance()).catch(() => null)
        : Promise.resolve(null),
    ]);

    return {
      fcmToken: fcmToken || null,
      apnsToken: apnsToken || null,
    };
  } catch {
    return {
      fcmToken: null,
      apnsToken: null,
    };
  }
}

export function onFcmTokenRefresh(cb: (token: string) => void) {
  return onTokenRefresh(getMessagingInstance(), cb);
}

export async function displayLocalNotification(opts: {
  id?: string;
  title: string;
  body?: string;
  data?: Record<string, string>;
  android?: Partial<Notification['android']>;
}): Promise<void> {
  const prefEnabled = await getPushNotificationsEnabledPref();
  if (!prefEnabled) {
    console.log('[Notifications] skip display (disabled by user pref)');
    return;
  }
  const channelId = await ensureDefaultChannel();
  await notifee.displayNotification({
    ...(opts.id ? { id: opts.id } : {}),
    title: opts.title,
    body: opts.body,
    data: opts.data,
    android: {
      channelId,
      pressAction: { id: 'default' },
      style: opts.body
        ? { type: AndroidStyle.BIGTEXT, text: opts.body }
        : undefined,
      ...opts.android,
    },
    ios: {
      foregroundPresentationOptions: {
        alert: true,
        badge: true,
        sound: true,
      },
    },
  });
}

export async function displayFromRemoteMessage(
  message: RemoteMessage,
  context: 'foreground' | 'background' = 'foreground'
) {
  const prefEnabled = await getPushNotificationsEnabledPref();
  if (!prefEnabled) {
    console.log('[Notifications] skip remote display (disabled by user pref):', {
      messageId: message?.messageId,
      context,
    });
    return;
  }

  const messageId =
    message.messageId ||
    (typeof message.sentTime === 'number' ? String(message.sentTime) : null) ||
    null;
  if (messageId && markSeen(messageId)) {
    console.log('[Notifications] deduped message:', messageId, context);
    return;
  }

  // In background, if the push already has a "notification" payload, the OS will
  // typically display it automatically. Avoid double notifications.
  if (context === 'background' && message.notification) {
    console.log('[Notifications] skip notifee display (OS notification payload):', {
      messageId: message.messageId,
    });
    return;
  }

  const title =
    message.notification?.title ||
    (message.data?.title as string) ||
    'Notification';
  const body =
    message.notification?.body || (message.data?.body as string) || undefined;
  const data = message.data ? (message.data as Record<string, string>) : undefined;
  await displayLocalNotification({
    id: messageId || undefined,
    title,
    body,
    data,
  });
}

