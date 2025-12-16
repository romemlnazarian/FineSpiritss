import React, { useEffect, useRef } from 'react';
import { View, ActivityIndicator, Linking, BackHandler, AppState } from 'react-native';
import useAuthStore from '../../zustland/AuthStore';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ButtonScreenNavigationProp } from '../../navigation/types';

export default function GoogleAuthScreen() {
  const navigation = useNavigation<ButtonScreenNavigationProp>();

  const { setToken, setRefreshToken, setIsLoggedIn, setUserData } = useAuthStore();

  const redirectScheme = 'com.finespirits.app://SocialAuth';
  const authUrl = 'https://finespirits.pl/wp-json/mobile/v1/auth/social/redirect/google/?state=app';

  // Track flow state across effects
  const finishedRef = useRef(false);
  const openedRef = useRef(false);

  // On hardware back while focused, return to previous (e.g., Signin)
  useFocusEffect(
    React.useCallback(() => {
      const onBack = () => {
        navigation.goBack();
        return true; // consume event
      };
      const sub = BackHandler.addEventListener('hardwareBackPress', onBack);
      return () => sub.remove();
    }, [navigation]),
  );

  useEffect(() => {
    let finished = false;

    const handleUrl = async ({ url }: { url: string }) => {
      if (!url || !url.startsWith(redirectScheme)) { return; }
      try {
        const queryString = url.split('?')[1] || '';
        const params: Record<string, string> = {};
        queryString.split('&').forEach(pair => {
          if (!pair) { return; }
          const [rawKey, rawValue = ''] = pair.split('=');
          const key = decodeURIComponent(rawKey || '').trim();
          const value = decodeURIComponent(rawValue || '').trim();
          if (key) { params[key] = value; }
        });
        const access = params['access'];
        const refresh = params['refresh'];
        const email = params['email'];

        console.log('@ Google Login Result (deep link):', { access, refresh, email });

        if (access) { setToken(access); }
        if (refresh) { setRefreshToken(refresh); }
        if (email) { setUserData({ email }); }

        setIsLoggedIn(true);

        finished = true;
        finishedRef.current = true;
        navigation.goBack();

        navigation.navigate('AppTabs');

      } catch (e) {
        console.log('Deep link parse error:', e);
      }
    };

    const subscription = Linking.addEventListener('url', handleUrl);
    // Open the auth URL in the system browser (Custom Tabs)
    Linking.openURL(authUrl).catch(err => console.log('OpenURL error:', err));
    openedRef.current = true;

    // Handle case where the app is opened via deep link directly
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleUrl({ url });
      }
    }).catch(() => {});

    // If user returns from browser without deep link, go back to previous screen
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
