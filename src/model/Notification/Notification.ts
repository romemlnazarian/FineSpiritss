import {Platform} from 'react-native';
import {Route} from '../../api/Route';
import {GET, POST} from '../../api/Network';
import {refreshTokenModel} from '../Auth/RefreshTokenModel';
import useAuthStore from '../../zustland/AuthStore';

export function getNotificationDeviceType(): 'android' | 'ios' {
  return Platform.OS === 'ios' ? 'ios' : 'android';
}

export const getNotificationsModel = (
  token: string,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
  callbackUnauthorized?: () => void,
) => {
  GET(
    Route.root,
    Route.notification,
    (data, status) => {
      if (status === 200) {
        callback(data);
      } else if (status === 401) {
        callbackUnauthorized?.();
      } else {
        console.log('get notifications error', data, status);
        errorcallback('error please try again');
      }
    },
    token,
  );
};



export const FcmTokenModel = (
  token: string,
  fcm_token: string,
  device_type: string,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
  callbackUnauthorized?: () => void,
) => {
  POST(
    Route.root,
    Route.fcm_token,
    (data, status) => {
      if (status === 200 || status === 201) {
        callback(data);
      } else if (status === 401) {
        callbackUnauthorized?.();
      } else {
        console.log('register fcm token error', data, status);
        errorcallback('error please try again');
      }
    },
    token,
    {fcm_token, device_type},
  );
};

export function registerFcmTokenWithServer(fcmToken: string): void {
  if (!fcmToken) {
    return;
  }

  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore.getState();
  if (!token) {
    console.log('[Notifications] skip FCM register: user not logged in');
    return;
  }

  const device_type = getNotificationDeviceType();

  const submit = (accessToken: string) => {
    FcmTokenModel(
      accessToken,
      fcmToken,
      device_type,
      data => {
        console.log('[Notifications] FCM token registered:', data);
      },
      error => {
        console.log('[Notifications] FCM register error:', error);
      },
      () => {
        refreshTokenModel(
          refreshToken,
          tokens => {
            setToken(tokens.access);
            setRefreshToken(tokens.refresh);
            FcmTokenModel(
              tokens.access,
              fcmToken,
              device_type,
              data => {
                console.log('[Notifications] FCM token registered after refresh:', data);
              },
              error => {
                console.log('[Notifications] FCM register error:', error);
              },
            );
          },
          error => {
            console.log('[Notifications] refresh error:', error);
          },
        );
      },
    );
  };

  submit(token);
}
