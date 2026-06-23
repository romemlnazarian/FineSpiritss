import {useCallback, useEffect, useState} from 'react';
import {getNotificationsModel} from '../../model/Notification/Notification';
import {refreshTokenModel} from '../../model/Auth/RefreshTokenModel';
import useAuthStore from '../../zustland/AuthStore';

export interface NotificationItem {
  id: string;
  title: string;
  text: string;
  createdAt?: string;
}



export default function NotificationLogic() {
  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);

 const fetchNotifications = useCallback(() => {
    setLoading(true);
    getNotificationsModel(token, (data: any) => {
      setLoading(false);
      setNotifications(data);
    },
    () => {
      refreshTokenModel(refreshToken, (data: any) => {
        setToken(data.access);
        setRefreshToken(data.refresh);
        fetchNotifications();
        setLoading(false);

      }, (error: any) => {
        console.log(error);
        setLoading(false);
      });
    });
  }, [token, refreshToken, setToken, setRefreshToken]);

 useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    loading,
  };
}
