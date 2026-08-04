import {Linking} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import {Color} from '../../utiles/color';

/**
 * Open the Przelewy24 hosted checkout in a secure in-app browser (custom tab /
 * SFSafariViewController). We do NOT inspect the returned URL to decide whether
 * payment succeeded - browser closure/return is never proof of payment. The
 * caller reads the authoritative status from the backend afterwards.
 */
export async function openP24Checkout(paymentUrl: string): Promise<void> {
  if (!paymentUrl) {
    throw new Error('Payment provider did not return a checkout URL.');
  }

  const isAvailable = await InAppBrowser.isAvailable().catch(() => false);

  if (isAvailable) {
    await InAppBrowser.open(paymentUrl, {
      showTitle: false,
      enableUrlBarHiding: true,
      enableDefaultShare: false,
      // iOS
      dismissButtonStyle: 'close',
      preferredBarTintColor: Color.white,
      preferredControlTintColor: Color.primary,
      modalEnabled: true,
      // Android
      showInRecents: false,
      forceCloseOnRedirection: false,
    }).catch(err => {
      console.log('[P24] InAppBrowser.open error:', err);
    });
    return;
  }

  // Fallback: open in the system browser.
  await Linking.openURL(paymentUrl).catch(err =>
    console.log('[P24] Linking.openURL error:', err),
  );
}
