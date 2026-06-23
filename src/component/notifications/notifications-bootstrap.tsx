import React from 'react';
import {Linking} from 'react-native';
import notifee, {EventType} from '@notifee/react-native';
import type {NavigationContainerRef} from '@react-navigation/native';
import {
  getInitialNotification,
  getMessaging,
  onMessage,
  onNotificationOpenedApp,
} from '@react-native-firebase/messaging';
import {
  displayFromRemoteMessage,
  ensureDefaultChannel,
  getFcmToken,
  getPushDebugTokens,
  onFcmTokenRefresh,
} from './notifee-service';
import {registerFcmTokenWithServer} from '../../model/Notification/Notification';

function getMessagingInstance() {
  return getMessaging();
}

type NotificationsBootstrapProps = {
  navigationRef?: NavigationContainerRef<any> | null;
};

export function NotificationsBootstrap({navigationRef}: NotificationsBootstrapProps) {
  React.useEffect(() => {
    (async () => {
      await ensureDefaultChannel();

      const tokens = await getPushDebugTokens();
      console.log('[Notifications] Push tokens:', tokens);

      const token = await getFcmToken();
      console.log('[Notifications] FCM token:', token);

      // If app was opened by tapping a notification
      try {
        const initial = await notifee.getInitialNotification();
        const url =
          (initial as any)?.notification?.data?.url ||
          (initial as any)?.notification?.data?.deeplink;
        if (url && typeof url === 'string') {
          Linking.openURL(url);
        }
      } catch {}
    })();
  }, []);

  React.useEffect(() => {
    // Foreground FCM messages: display via Notifee (data-only or notification payloads)
    const unsub = onMessage(getMessagingInstance(), async remoteMessage => {
      try {
        console.log('[Notifications] FCM foreground message:', {
          messageId: remoteMessage?.messageId,
          data: remoteMessage?.data,
          notification: remoteMessage?.notification,
        });
        // Show a local notification while app is in the foreground
        await displayFromRemoteMessage(remoteMessage, 'foreground');
      } catch {}
    });
    return () => unsub();
  }, []);

  React.useEffect(() => {
    // Token refresh
    const unsub = onFcmTokenRefresh((token) => {
      console.log('[Notifications] FCM token refreshed:', token);
      registerFcmTokenWithServer(token);
    });
    return () => unsub();
  }, []);

  React.useEffect(() => {
    // Open handlers for FCM notifications
    const unsubOpen = onNotificationOpenedApp(getMessagingInstance(), remoteMessage => {
      const url = remoteMessage?.data?.url || remoteMessage?.data?.deeplink;
      if (url && typeof url === 'string') Linking.openURL(url);
    });
    getInitialNotification(getMessagingInstance())
      .then((remoteMessage) => {
        const url = remoteMessage?.data?.url || remoteMessage?.data?.deeplink;
        if (url && typeof url === 'string') Linking.openURL(url);
      })
      .catch(() => {});
    return () => {
      try {
        unsubOpen();
      } catch {}
    };
  }, []);

  React.useEffect(() => {
    const unsub = notifee.onForegroundEvent(async ({ type, detail }) => {
      console.log('[Notifications] Notifee foreground event:', {
        type,
        data: (detail.notification as any)?.data,
      });
      if (type === EventType.PRESS) {
        const url = (detail.notification as any)?.data?.url || (detail.notification as any)?.data?.deeplink;
        if (url && typeof url === 'string') {
          try {
            await Linking.openURL(url);
            return;
          } catch {}
        }

        // Optional: navigate if a screen is provided
        const screen = (detail.notification as any)?.data?.screen;
        if (screen && navigationRef?.isReady?.()) {
          try {
            (navigationRef.navigate as any)(screen);
          } catch {}
        }
      }
    });
    return () => unsub();
  }, [navigationRef]);

  // No UI
  return null;
}

