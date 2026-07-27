import React, {useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  AppState,
  BackHandler,
  Linking,
  StyleSheet,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {ButtonScreenNavigationProp} from '../../navigation/types';
import useAuthStore from '../../zustland/AuthStore';

export default function GoogleAuthScreen() {
  const navigation = useNavigation<ButtonScreenNavigationProp>();
  const {setToken, setRefreshToken, setIsLoggedIn, setUserData} = useAuthStore();

  const redirectScheme = 'com.finespirits.app://SocialAuth';
  const authUrl = 'https://api.finespirits.pl/api/auth/google/init/';

  const finishedRef = useRef(false);
  const openedRef = useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      const onBack = () => {
        navigation.goBack();
        return true;
      };
      const sub = BackHandler.addEventListener('hardwareBackPress', onBack);
      return () => sub.remove();
    }, [navigation]),
  );

  useEffect(() => {
    const parseCallbackUrl = (url: string) => {
      const queryString = url.split('?')[1] || '';
      const params: Record<string, string> = {};
      queryString.split('&').forEach(pair => {
        if (!pair) {
          return;
        }
        const [rawKey, rawValue = ''] = pair.split('=');
        const key = decodeURIComponent(rawKey || '').trim();
        const value = decodeURIComponent(rawValue || '').trim();
        if (key) {
          params[key] = value;
        }
      });
      return params;
    };

    const handleAuthCallback = (url: string) => {
      if (!url || !url.startsWith(redirectScheme)) {
        return;
      }

      try {
        const params = parseCallbackUrl(url);
        const access = params.access;
        const refresh = params.refresh;
        const email = params.email;

        console.log('[GoogleAuth] deep link result:', {access, refresh, email});

        if (!access) {
          return;
        }

        setToken(access);
        if (refresh) {
          setRefreshToken(refresh);
        }
        if (email) {
          setUserData({email});
        }

        setIsLoggedIn(true);
        finishedRef.current = true;

        navigation.reset({
          index: 0,
          routes: [{name: 'AppTabs'}],
        });
      } catch (e) {
        console.log('[GoogleAuth] deep link parse error:', e);
      }
    };

    const subscription = Linking.addEventListener('url', ({url}) =>
      handleAuthCallback(url),
    );

    (async () => {
      Linking.getInitialURL()
        .then(url => {
          if (url) {
            handleAuthCallback(url);
          }
        })
        .catch(() => {});

      const isAvailable = await InAppBrowser.isAvailable().catch(() => false);

      if (isAvailable) {
        const result = await InAppBrowser.openAuth(authUrl, redirectScheme, {
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
          ephemeralWebSession: false,
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        }).catch(err => {
          console.log('[GoogleAuth] InAppBrowser.openAuth error:', err);
          return null;
        });

        if (result && result.type === 'success' && typeof result.url === 'string') {
          handleAuthCallback(result.url);
          return;
        }

        if (!finishedRef.current) {
          navigation.goBack();
        }
        return;
      }

      Linking.openURL(authUrl).catch(err =>
        console.log('[GoogleAuth] Linking.openURL error:', err),
      );
      openedRef.current = true;
    })();

    const appStateSub = AppState.addEventListener('change', state => {
      if (state === 'active' && openedRef.current && !finishedRef.current) {
        navigation.goBack();
      }
    });

    return () => {
      subscription.remove();
      appStateSub.remove();
      if (!finishedRef.current) {
        InAppBrowser.close();
      }
    };
  }, [
    authUrl,
    navigation,
    redirectScheme,
    setIsLoggedIn,
    setRefreshToken,
    setToken,
    setUserData,
  ]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
