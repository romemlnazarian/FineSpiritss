import {Platform} from 'react-native';
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
  type User,
} from '@react-native-google-signin/google-signin';
import {GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID} from './config';

const LOG_PREFIX = '[GoogleSignIn]';

let configured = false;

export type GoogleSignInProfile = User['user'];

export type GoogleSignInResult = {
  user: GoogleSignInProfile;
  idToken: string | null;
  serverAuthCode: string | null;
};

function logStep(step: string, payload?: unknown) {
  if (payload === undefined) {
    console.log(`${LOG_PREFIX} ${step}`);
    return;
  }
  console.log(`${LOG_PREFIX} ${step}`, payload);
}

export function configureGoogleSignIn() {
  if (configured) {
    logStep('already configured, skipping');
    return;
  }

  if (Platform.OS === 'android' && !GOOGLE_WEB_CLIENT_ID) {
    logStep(
      'missing GOOGLE_WEB_CLIENT_ID for Android — Google Sign-In disabled until configured',
    );
    return;
  }

  const config: Parameters<typeof GoogleSignin.configure>[0] = {
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    offlineAccess: true,
    scopes: ['email', 'profile'],
  };

  if (GOOGLE_WEB_CLIENT_ID) {
    config.webClientId = GOOGLE_WEB_CLIENT_ID;
  }

  logStep('configure start', {
    platform: Platform.OS,
    webClientId: GOOGLE_WEB_CLIENT_ID || '(not set)',
    iosClientId: GOOGLE_IOS_CLIENT_ID,
  });

  try {
    GoogleSignin.configure(config);
    configured = true;
    logStep('configure done');
  } catch (error) {
    logStep('configure failed — rebuild native app after pod install', error);
  }
}

export async function signInWithGoogle(): Promise<GoogleSignInResult> {
  if (Platform.OS === 'android' && !GOOGLE_WEB_CLIENT_ID) {
    throw new Error(
      'Set GOOGLE_WEB_CLIENT_ID in src/service/googleSignIn/config.ts. Run: npm run google-signin:android-setup',
    );
  }

  configureGoogleSignIn();

  try {
    if (Platform.OS === 'android') {
      logStep('checking Play Services');
      const hasPlayServices = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      logStep('Play Services available', {hasPlayServices});
    }

    logStep('opening Google sign-in UI');
    const response = await GoogleSignin.signIn();
    logStep('signIn response', response);

    if (!isSuccessResponse(response)) {
      throw new Error('Google sign-in was cancelled');
    }

    const profile = response.data.user;
    logStep('signed-in user', {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      photo: profile.photo,
    });

    const tokens = await GoogleSignin.getTokens();
    logStep('tokens received', {
      hasIdToken: Boolean(tokens.idToken),
      idTokenPreview: tokens.idToken
        ? `${tokens.idToken.slice(0, 20)}...`
        : null,
      hasAccessToken: Boolean(tokens.accessToken),
    });

    return {
      user: profile,
      idToken: tokens.idToken ?? null,
      serverAuthCode: response.data.serverAuthCode ?? null,
    };
  } catch (error) {
    if (isErrorWithCode(error)) {
      logStep('native error', {
        code: error.code,
        message: error.message,
      });

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw new Error('Google sign-in cancelled');
      }
      if (error.code === statusCodes.IN_PROGRESS) {
        throw new Error('Google sign-in already in progress');
      }
      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new Error('Google Play Services not available');
      }
      if (String(error.code) === '10') {
        logStep('DEVELOPER_ERROR hint', {
          fix:
            'Add SHA-1/SHA-256 in Firebase (finespirits-6bf74), re-download google-services.json, set GOOGLE_WEB_CLIENT_ID',
          run: 'npm run google-signin:android-setup',
        });
        throw new Error(
          'Google Sign-In config error. Run: npm run google-signin:android-setup',
        );
      }
    }

    logStep('unknown error', error);
    throw error;
  }
}

export async function signOutFromGoogle() {
  try {
    await GoogleSignin.signOut();
    logStep('sign out success');
  } catch (error) {
    logStep('sign out error', error);
  }
}
