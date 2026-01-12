import React, {useEffect, useRef} from 'react';
import {ActivityIndicator, AppState, BackHandler, Linking, StyleSheet, View} from 'react-native';
import useAuthStore from '../../zustland/AuthStore';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ButtonScreenNavigationProp } from '../../navigation/types';
import InAppBrowser from 'react-native-inappbrowser-reborn';

export default function AppleAuthScreen() {
  const navigation = useNavigation<ButtonScreenNavigationProp>();

  const { setToken, setRefreshToken, setIsLoggedIn, setUserData } = useAuthStore();

  const redirectScheme = 'com.finespirits.app://SocialAuth';
  const authUrl = 'https://finespirits.pl/wp-json/mobile/v1/auth/social/redirect/apple/?state=app';

  // Track flow state across effects
  const finishedRef = useRef(false);
  const openedRef = useRef(false);

  // On hardware back while focused, return to previous screen (e.g., Signin)
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
    let finished = false;

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

        console.log('@ Apple Login Result (deep link):', { access, refresh, email });

        if (access) { setToken(access); }
        if (refresh) { setRefreshToken(refresh); }
        if (email) { setUserData({ email }); }

        setIsLoggedIn(true);

        finished = true;
        finishedRef.current = true;
        navigation.reset({index: 0, routes: [{name: 'AppTabs'}]});

      } catch (e) {
        console.log('Deep link parse error:', e);
      }
    };

    const subscription = Linking.addEventListener('url', ({url}) => handleAuthCallback(url));

    (async () => {
      // Handle case where the app is opened via deep link directly
      Linking.getInitialURL()
        .then((url) => {
          if (url) {
            handleAuthCallback(url);
          }
        })
        .catch(() => {});

      const isAvailable = await InAppBrowser.isAvailable().catch(() => false);

      // Prefer openAuth when available (fixes iOS "loading" stuck cases)
      if (isAvailable) {
        const result = await InAppBrowser.openAuth(authUrl, redirectScheme, {
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

        if (!finishedRef.current) {
          navigation.goBack();
        }
        return;
      }

      // Fallback: open in system browser and wait for deep-link back
      Linking.openURL(authUrl).catch(err => console.log('OpenURL error:', err));
      openedRef.current = true;
    })();

    // If user returns from browser without completing auth, go back
    const appStateSub = AppState.addEventListener('change', (state) => {
      if (state === 'active' && openedRef.current && !finishedRef.current) {
        navigation.goBack();
      }
    });

    return () => {
      subscription.remove();
      appStateSub.remove();
      if (!finished) {
        // stay on the screen, spinner will continue until user returns or deep link arrives
      }
    };
  }, [navigation, setIsLoggedIn, setRefreshToken, setToken, setUserData]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
