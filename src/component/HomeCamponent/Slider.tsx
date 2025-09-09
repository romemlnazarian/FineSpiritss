import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import Swiper from 'react-native-swiper';
import {StyleComponent} from '../../utiles/styles';
import Banner from '../../assets/svg/Banner.svg';
// import Image from '../../assets/svg/Image.svg'; // Remove Image import if not used elsewhere
import {Color} from '../../utiles/color';
interface SliderProps {
  style?: StyleProp<ViewStyle>;
}
export default function Slider({style}: SliderProps) {
  const {Styles} = StyleComponent();
  const [activeIndex, setActiveIndex] = useState(0);
  // const banners = [<Banner />, <Banner />, <Banner />];
  const Images = [
    <Banner />,
    <Banner />,
    <Banner />,
  ];

  return (
    <View style={[Styles.alignSelf, styles.wrapper, style]}>
      <Swiper
        style={styles.swiperContainer}
        onIndexChanged={index => setActiveIndex(index)}
        loop={false}
        removeClippedSubviews={false} // Restore this
        showsPagination={false}>
        {Images.map((banner, index) => (
          <View key={index} style={styles.slide1}>
            {banner}
          </View>
        ))}
      </Swiper>
      <View style={styles.customPaginationContainer}>
        {Images.map((_, index) => (
          <View
            key={index}
            style={
              index === activeIndex ? styles.activeDotStyle : styles.dotStyle
            }
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 200,
    borderRadius: 20,
    marginTop: '2%',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 0,
  },
  swiperContainer: {
    borderRadius: 20,
  },
  dotStyle: {
    backgroundColor: Color.lightGray,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDotStyle: {
    backgroundColor: Color.primary,
    width: 24,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  customPaginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});
