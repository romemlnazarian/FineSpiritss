import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import BottomCardComponent from '../BottomCard';
// import RangeSlider from './RangeSlider';
import {Language} from '../../utiles/Language/i18n';
import RangeSlider from './RangeSlider';

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
  const [low, setLow] = useState<number>(currentMinPrice ?? min);
  const [high, setHigh] = useState<number>(currentMaxPrice ?? max);

  const onSubmit = useCallback(() => {
    const clampedLow = Math.max(min, Math.min(low, max));
    const clampedHigh = Math.max(min, Math.min(high, max));
    const finalLow = Math.min(clampedLow, clampedHigh);
    const finalHigh = Math.max(clampedLow, clampedHigh);
    onPriceChange?.(finalLow, finalHigh);
  }, [high, low, max, min, onPriceChange]);

  // Keep slider in sync when BottomSheet re-opens / selected values change
  useEffect(() => {
    setLow(currentMinPrice ?? min);
  }, [currentMinPrice, min]);
  useEffect(() => {
    setHigh(currentMaxPrice ?? max);
  }, [currentMaxPrice, max]);

  const onSliderChange = useCallback((nextLow: number, nextHigh: number) => {
    setLow(nextLow);
    setHigh(nextHigh);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={[Styles.h5_Medium, Styles.textAlign]}>{Language.filter_price}</Text>
      <Text style={[Styles.h6_Medium, {textAlign: 'left',marginLeft: '5%',marginTop: 10}]}>{Language.filter_price_range}</Text>
      <View style={styles.priceRow}>
        <Text style={[styles.priceText]}>
          {Math.round(low)} zł
        </Text>
        <Text style={[styles.priceText]}>
         {Math.round(high)} zł
        </Text>
      </View> 

      <RangeSlider
        min={min}
        max={max}
        step={1}
        minRange={0}
        low={low}
        high={high}
        onChange={onSliderChange}
      /> 

         <BottomCardComponent
        title={Language.filter_submit}
        onHandler={onSubmit}
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
  priceRow: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceText: {
    color: Color.black,
  },
  button: {
    width: '93%',
    alignSelf: 'center',
    marginTop: '15%',
  },
});
