import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import {Language} from '../../utiles/Language/i18n';
import CustomHeader from '../../navigation/CustomHeader';
import {usePaymentStatus} from '../../logic/Payment/usePaymentStatus';
import type {PaymentStatus} from '../../model/Payment/paymentTypes';

type ResultView = {
  title: string;
  subtitle: string;
  color: string;
  showSpinner: boolean;
  primaryLabel?: string;
};

function viewForStatus(
  status: PaymentStatus | undefined,
  timedOut: boolean,
): ResultView {
  switch (status) {
    case 'paid':
      return {
        title: Language.payment_success_title,
        subtitle: Language.payment_success_subtitle,
        color: Color.green,
        showSpinner: false,
        primaryLabel: Language.payment_done,
      };
    case 'failed':
      return {
        title: Language.payment_failed_title,
        subtitle: Language.payment_failed_subtitle,
        color: Color.red,
        showSpinner: false,
        primaryLabel: Language.payment_retry,
      };
    case 'cancelled':
      return {
        title: Language.payment_cancelled_title,
        subtitle: Language.payment_cancelled_subtitle,
        color: Color.red,
        showSpinner: false,
        primaryLabel: Language.payment_retry,
      };
    case 'refunded':
      return {
        title: Language.payment_refunded_title,
        subtitle: Language.payment_refunded_subtitle,
        color: Color.gold,
        showSpinner: false,
      };
    default:
      // created / registered / pending / verifying / undefined
      return {
        title: Language.payment_confirming_title,
        subtitle: timedOut
          ? Language.payment_pending_timeout
          : Language.payment_confirming_subtitle,
        color: Color.primary,
        showSpinner: !timedOut,
      };
  }
}

export default function PaymentResultScreen() {
  const {Styles} = StyleComponent();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const paymentId: string = route.params?.paymentId ?? '';

  const {data, isLoading, timedOut, refresh} = usePaymentStatus(paymentId);

  const status = data?.status;
  const isFinal = data?.is_final ?? false;
  const view = viewForStatus(status, timedOut);

  const goHome = () => {
    navigation.navigate('AppTabs', {screen: 'Home'});
  };

  const onPrimary = () => {
    if (status === 'paid') {
      goHome();
    } else if (status === 'failed' || status === 'cancelled') {
      // Order remains payable: return to cart to retry.
      navigation.navigate('AppTabs', {screen: 'CardScreen'});
    }
  };

  return (
    <View style={Styles.container}>
      <CustomHeader
        showBack={true}
        subTitle={Language.setting_pay}
        onSubmitBack={goHome}
      />

      <View style={styles.center}>
        {view.showSpinner || (isLoading && !data) ? (
          <ActivityIndicator size="large" color={view.color} />
        ) : null}

        <Text style={[Styles.h4_Bold, styles.title, {color: view.color}]}>
          {view.title}
        </Text>
        <Text style={[Styles.h6_Regular, Styles.textAlign, styles.subtitle]}>
          {view.subtitle}
        </Text>

        {view.primaryLabel ? (
          <TouchableOpacity style={styles.primaryButton} onPress={onPrimary}>
            <Text style={[Styles.title_Regular, styles.primaryText]}>
              {view.primaryLabel}
            </Text>
          </TouchableOpacity>
        ) : null}

        {!isFinal ? (
          <TouchableOpacity style={styles.secondaryButton} onPress={refresh}>
            <Text style={[Styles.title_Regular, styles.secondaryText]}>
              {Language.payment_refresh}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    width: '90%',
    color: Color.gray,
  },
  primaryButton: {
    marginTop: 30,
    backgroundColor: Color.primary,
    borderRadius: 10,
    height: 50,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: Color.white,
  },
  secondaryButton: {
    marginTop: 14,
    height: 44,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    color: Color.primary,
  },
});
