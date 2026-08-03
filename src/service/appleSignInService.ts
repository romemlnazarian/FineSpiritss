import {Platform} from 'react-native';
import appleAuth, {
  type AppleRequestResponse,
  type AppleRequestResponseFullName,
} from '@invertase/react-native-apple-authentication';

const LOG_PREFIX = '[AppleSignIn]';

export type AppleSignInProfile = {
  user: string;
  email: string | null;
  fullName: AppleRequestResponseFullName | null;
};

export type AppleSignInResult = {
  user: AppleSignInProfile;
  identityToken: string | null;
  authorizationCode: string | null;
  nonce: string;
};

function logStep(step: string, payload?: unknown) {
  if (payload === undefined) {
    console.log(`${LOG_PREFIX} ${step}`);
    return;
  }
  console.log(`${LOG_PREFIX} ${step}`, payload);
}

export function isAppleSignInSupported(): boolean {
  return Platform.OS === 'ios' && appleAuth.isSupported;
}

function formatFullName(fullName: AppleRequestResponseFullName | null): string | null {
  if (!fullName) {
    return null;
  }
  const parts = [
    fullName.givenName,
    fullName.familyName,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(' ') : null;
}

function mapResponse(response: AppleRequestResponse): AppleSignInResult {
  return {
    user: {
      user: response.user,
      email: response.email,
      fullName: response.fullName,
    },
    identityToken: response.identityToken,
    authorizationCode: response.authorizationCode,
    nonce: response.nonce,
  };
}

export async function signInWithApple(): Promise<AppleSignInResult> {
  if (!isAppleSignInSupported()) {
    throw new Error('Sign in with Apple is only available on iOS 13+');
  }

  try {
    logStep('opening Apple sign-in UI');
    const response = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    logStep('performRequest response', {
      user: response.user,
      email: response.email,
      hasIdentityToken: Boolean(response.identityToken),
      hasAuthorizationCode: Boolean(response.authorizationCode),
      fullName: formatFullName(response.fullName),
    });

    if (!response.identityToken && !response.authorizationCode) {
      throw new Error('Apple sign-in did not return credentials');
    }

    // getCredentialStateForUser is unreliable on the iOS Simulator (often NOT_FOUND).
    // A successful performRequest with identityToken is sufficient proof of authorization.
    try {
      const credentialState = await appleAuth.getCredentialStateForUser(
        response.user,
      );
      logStep('credential state', {credentialState});

      if (credentialState !== appleAuth.State.AUTHORIZED) {
        logStep(
          'credential state not AUTHORIZED — continuing because performRequest returned tokens',
          {credentialState},
        );
      }
    } catch (credentialError) {
      logStep(
        'getCredentialStateForUser failed (common on Simulator) — continuing',
        credentialError,
      );
    }

    return mapResponse(response);
  } catch (error: any) {
    const code = error?.code;
    logStep('error', {code, message: error?.message, error});

    if (code === appleAuth.Error.CANCELED || code === '1001') {
      throw new Error('Apple sign-in cancelled');
    }
    if (code === appleAuth.Error.FAILED) {
      throw new Error('Apple sign-in failed');
    }
    if (code === appleAuth.Error.INVALID_RESPONSE) {
      throw new Error('Invalid response from Apple sign-in');
    }
    if (code === appleAuth.Error.NOT_HANDLED) {
      throw new Error('Apple sign-in was not handled');
    }
    if (code === appleAuth.Error.UNKNOWN) {
      throw new Error('Unknown Apple sign-in error');
    }

    throw error;
  }
}

export function subscribeToAppleCredentialRevoked(
  listener: () => void,
): () => void {
  if (!isAppleSignInSupported()) {
    return () => {};
  }
  return appleAuth.onCredentialRevoked(listener);
}
