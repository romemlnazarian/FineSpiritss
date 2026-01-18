import React, {useEffect, useRef} from 'react';
import {ActivityIndicator, Linking, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import useAuthStore from '../../zustland/AuthStore';
import {ButtonScreenNavigationProp} from '../../navigation/types';

export default function GoogleAuthScreen() {
  const navigation = useNavigation<ButtonScreenNavigationProp>();

  const {
    setToken,
    setRefreshToken,
    setIsLoggedIn,
    setUserData,
  } = useAuthStore();

  const authUrl =
    'https://finespirits.pl/wp-json/mobile/v1/auth/social/redirect/google/?state=app';

  const redirectScheme = 'com.finespirits.app://SocialAuth';
  const finishedRef = useRef(false);

  useEffect(() => {
    const parseCallbackUrl = (url: string) => {
      const query = url.split('?')[1] || '';
      const params: Record<string, string> = {};

      query.split('&').forEach(p => {
        if (!p) {
          return;
        }
        const [k, v = ''] = p.split('=');
        const key = decodeURIComponent(String(k ?? '')).trim();
        const value = decodeURIComponent(String(v ?? '')).trim();
        if (key) {
          params[key] = value;
        }
      });

      return params;
    };

    const handleAuthCallback = (url: string) => {
      if (!url?.startsWith(redirectScheme)) {
        return;
      }

      try {
        const params = parseCallbackUrl(url);
        if (!params.access) {
          return;
        }

        setToken(params.access);
        if (params.refresh) {
          setRefreshToken(params.refresh);
        }
        if (params.email) {
          setUserData({email: params.email});
        }

        setIsLoggedIn(true);
        finishedRef.current = true;

        navigation.reset({
          index: 0,
          routes: [{name: 'AppTabs'}],
        });
      } catch (e) {
        console.log('Deep link parse error:', e);
      }
    };

    const handleUrlEvent = ({url}: {url: string}) => handleAuthCallback(url);

    const sub = Linking.addEventListener('url', handleUrlEvent);

    (async () => {
      // If app was opened by a deep-link before this screen mounted, handle it.
      Linking.getInitialURL()
        .then(initialUrl => {
          if (initialUrl) {
            handleAuthCallback(initialUrl);
          }
        })
        .catch(() => {});

      const isAvailable = await InAppBrowser.isAvailable().catch(() => false);

      // Prefer openAuth on BOTH platforms when available: it returns the callback URL reliably.
      if (isAvailable) {
        const result = await InAppBrowser.openAuth(authUrl, redirectScheme, {
          // UI
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        }).catch(err => {
          console.log('InAppBrowser.openAuth error:', err);
          return null;
        });

        if (result && result.type === 'success' && typeof result.url === 'string') {
          handleAuthCallback(result.url);
          return;
        }

        // User cancelled/dismissed: go back to previous screen (e.g. Signin)
        if (!finishedRef.current) {
          navigation.goBack();
        }
        return;
      }

      // Fallback: open in browser and wait for deep-link back into the app
      Linking.openURL(authUrl).catch(err => console.log('Linking.openURL error:', err));
    })();

    return () => {
      sub.remove();
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
