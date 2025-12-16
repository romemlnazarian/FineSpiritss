import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {StyleComponent} from '../../utiles/styles';
// import Slider from '@react-native-community/slider';
import {Color} from '../../utiles/color';

interface ButtonSheetFilterProps {
  onPriceChange?: (minPrice: number, maxPrice: number) => void;
  onLowerPricePress?: () => void;
  onHigherPricePress?: () => void;
}

export default function ButtonSheetFilter({
  onPriceChange,
  onLowerPricePress,
  onHigherPricePress,
}: ButtonSheetFilterProps) {
  const {Styles} = StyleComponent();
  const [sliderValue, setSliderValue] = useState<number>(0);
  
  return (
    <View style={styles.container}>
      <Text style={[Styles.h5_Medium, Styles.textAlign]}>Filter</Text>
      <Text style={[Styles.h6_Medium, styles.priceRangeTitle]}>Price Range</Text>
      
      <View style={styles.priceRangeContainer}>
        <Text style={styles.priceText}>${Math.round(sliderValue)}</Text>
        <Text style={styles.priceText}>${Math.round(sliderValue)}</Text>
      </View>
      
      {/* <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={1000}
        value={sliderValue}
        onValueChange={(value) => {
          setSliderValue(value);
          onPriceChange?.(value, value);
        }}
        minimumTrackTintColor={Color.primary}
        maximumTrackTintColor={Color.gray}
        thumbTintColor={Color.primary}
      /> */}
      
      <View style={styles.optionContainer}>
        <Text style={[Styles.body_Regular]}>Lower Price</Text>
        <TouchableOpacity 
          style={styles.radioButton}
          onPress={onLowerPricePress}
        />
      </View>
      
      <View style={styles.separator} />
      
      <View style={styles.optionContainer}>
        <Text style={[Styles.body_Regular]}>Higher Price</Text>
        <TouchableOpacity 
          style={styles.radioButton}
          onPress={onHigherPricePress}
        />
      </View>
      
      <View style={styles.separator} />
    </View>
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
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '5%',
    justifyContent: 'space-between',
  },
  slider: {
    width: '100%',
    marginTop: '2%',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: Color.black,
    minWidth: 60,
    textAlign: 'center',
  },
  optionContainer: {
    width: '93%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '5%',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: Color.gray,
    borderRadius: 24,
  },
  separator: {
    width: '93%',
    alignSelf: 'center',
    marginTop: '5%',
    backgroundColor: Color.lineGray,
    height: 1,
  },
});
