import {Text, StyleSheet, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import TextInputComponent from '../TextInputComponent';
import BottomCardComponent from '../BottomCard';

interface ButtonSheetFilterProps {
  // bounds from API
  minPrice?: number;
  maxPrice?: number;
  // currently selected min/max (optional)
  currentMinPrice?: number;
  currentMaxPrice?: number;
  onPriceChange?: (minPrice: number, maxPrice: number) => void;
}

export default function ButtonSheetFilter({
  minPrice,
  maxPrice,
  currentMinPrice,
  currentMaxPrice,
  onPriceChange,
}: ButtonSheetFilterProps) {
  const {Styles} = StyleComponent();
  const min = useMemo(() => (typeof minPrice === 'number' ? minPrice : 1), [minPrice]);
  const max = useMemo(() => (typeof maxPrice === 'number' ? maxPrice : 1000), [maxPrice]);
  const [minValue, setMinValue] = useState<string>(String(currentMinPrice ?? min));
  const [maxValue, setMaxValue] = useState<string>(String(currentMaxPrice ?? max));

  // Keep inputs in sync with applied filter values when BottomSheet re-opens
  // (BottomSheet often keeps children mounted, so initial state won't re-run).
  useEffect(() => {
    setMinValue(String(currentMinPrice ?? min));
  }, [currentMinPrice, min]);

  useEffect(() => {
    setMaxValue(String(currentMaxPrice ?? max));
  }, [currentMaxPrice, max]);

  const parsedMin = useMemo(() => {
    if (!minValue || minValue.trim() === '') {
      return undefined;
    }
    const parsed = Number(String(minValue).replace(/[^0-9.]/g, ''));
    return Number.isFinite(parsed) ? parsed : NaN;
  }, [minValue]);

  const parsedMax = useMemo(() => {
    if (!maxValue || maxValue.trim() === '') {
      return undefined;
    }
    const parsed = Number(String(maxValue).replace(/[^0-9.]/g, ''));
    return Number.isFinite(parsed) ? parsed : NaN;
  }, [maxValue]);

  const minErrorMessage = useMemo(() => {
    if (!minValue || minValue.trim() === '') {
      return undefined;
    }
    if (!Number.isFinite(parsedMin)) {
      return 'Please enter a valid number';
    }
    if ((parsedMin as number) < min) {
      return `Minimum allowed is ${min}`;
    }
    if ((parsedMin as number) > max) {
      return `Maximum allowed is ${max}`;
    }
    return undefined;
  }, [max, min, minValue, parsedMin]);

  const maxErrorMessage = useMemo(() => {
    if (!maxValue || maxValue.trim() === '') {
      return undefined;
    }
    if (!Number.isFinite(parsedMax)) {
      return 'Please enter a valid number';
    }
    if ((parsedMax as number) < min) {
      return `Minimum allowed is ${min}`;
    }
    if ((parsedMax as number) > max) {
      return `Maximum allowed is ${max}`;
    }
    return undefined;
  }, [max, maxValue, min, parsedMax]);

  const effectiveMin = useMemo(
    () => (typeof parsedMin === 'number' && Number.isFinite(parsedMin) ? parsedMin : min),
    [min, parsedMin],
  );
  const effectiveMax = useMemo(
    () => (typeof parsedMax === 'number' && Number.isFinite(parsedMax) ? parsedMax : max),
    [max, parsedMax],
  );

  const rangeErrorMessage = useMemo(() => {
    if (minErrorMessage || maxErrorMessage) {
      return undefined;
    }
    if (effectiveMin > effectiveMax) {
      return 'Max price must be greater than or equal to Min price';
    }
    return undefined;
  }, [effectiveMax, effectiveMin, maxErrorMessage, minErrorMessage]);

  const handleMinChange = useCallback((text: string) => {
    setMinValue(text);
  }, []);

  const handleMaxChange = useCallback((text: string) => {
    setMaxValue(text);
  }, []);

  const onSubmit = useCallback(() => {
    if (minErrorMessage || maxErrorMessage || rangeErrorMessage) {
      return;
    }
    const clampedMin = Math.max(min, Math.min(effectiveMin, max));
    const clampedMax = Math.max(min, Math.min(effectiveMax, max));
    if (clampedMin > clampedMax) {
      return;
    }
    onPriceChange?.(clampedMin, clampedMax);
  }, [
    effectiveMax,
    effectiveMin,
    max,
    maxErrorMessage,
    min,
    minErrorMessage,
    onPriceChange,
    rangeErrorMessage,
  ]);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={[Styles.h5_Medium, Styles.textAlign]}>Price</Text>
        {/* <Text style={[Styles.h6_Medium, styles.priceRangeTitle]}>
          Enter Price
        </Text> */}
          <Text style={[styles.priceText, styles.priceTextSpacing]}>
            Min Price: {effectiveMin} zł
          </Text>
        <TextInputComponent
          containerStyle={styles.textInputContainer}
          placeholder={'Min price'}
          onChangeText={handleMinChange}
          value={minValue}
          isPassword={false}
          showPass={true}
          errorMessage={minErrorMessage}
          // keyboard={'numeric'}
        />
                  <Text style={[styles.priceText, styles.priceTextSpacing]}>Max Price: {effectiveMax} zł</Text>

        <TextInputComponent
          containerStyle={styles.textInputContainer}
          placeholder={'Max price'}
          onChangeText={handleMaxChange}
          value={maxValue}
          isPassword={false}
          showPass={true}
          errorMessage={rangeErrorMessage ?? maxErrorMessage}
          // keyboard={'numeric'}
        />
        <BottomCardComponent
          title={'Submit'}
          onHandler={onSubmit}
          disabled={Boolean(minErrorMessage || maxErrorMessage || rangeErrorMessage)}
          style={styles.button}
        />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '98%',
    alignSelf: 'center',
    marginTop: '2%',
  },
  priceRangeTitle: {
    marginLeft: '4%',
  },
  priceRangeContainer: {
    width: '93%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '5%',
    justifyContent: 'space-between',
  },
  slider: {
    width: '100%',
    marginTop: '2%',
  },
  sliderBlock: {
    width: '93%',
    alignSelf: 'center',
    marginTop: 10,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  track: {
    width: '100%',
    height: 4,
    borderRadius: 4,
    backgroundColor: Color.gray,
  },
  activeTrack: {
    position: 'absolute',
    left: 0,
    height: 4,
    borderRadius: 4,
    backgroundColor: Color.primary,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: Color.black,
    minWidth: 60,
    textAlign: 'left',
    marginLeft: '5%',
  },
  priceTextSpacing: {
    marginTop: '5%',
  },
  textInputContainer: {
    width: '93%',
    alignSelf: 'center',
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.gray,
    marginTop: 10,
  },
  button: {
    width: '93%',
    alignSelf: 'center',
    marginTop: '15%',
  },
});
