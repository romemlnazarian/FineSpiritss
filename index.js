/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App.tsx';
import '@react-native-firebase/app';
import notifee, {EventType} from '@notifee/react-native';
import {getMessaging, setBackgroundMessageHandler} from '@react-native-firebase/messaging';
import {displayFromRemoteMessage} from './src/component/notifications/notifee-service';

const messagingInstance = getMessaging();

// Notifee background event handler (required for press actions when app is in background/quit)
notifee.onBackgroundEvent(async ({type, detail}) => {
  try {
    if (type === EventType.PRESS) {
      console.log('[Notifications] Notifee background event:', {
        type,
        detail,
      });
      // Keep minimal to avoid side effects; foreground handling happens in-app.
      // You can inspect `detail.notification?.data` here if needed.
    }
  } catch (error) {
    console.error('[Notifications] Notifee background event error:', error);
  }
});

// FCM background handler (required for data-only messages in background/quit)
setBackgroundMessageHandler(messagingInstance, async remoteMessage => {
  try {
    console.log('[Notifications] FCM background message:', {
      messageId: remoteMessage?.messageId,
      data: remoteMessage?.data,
      notification: remoteMessage?.notification,
    });
    await displayFromRemoteMessage(remoteMessage, 'background');
  } catch (error) {
    console.error('[Notifications] FCM background message error:', error);
  }
});

AppRegistry.registerComponent(appName, () => App);
