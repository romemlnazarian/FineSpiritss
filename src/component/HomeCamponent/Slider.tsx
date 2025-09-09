import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React, {useState, useMemo, useCallback, memo} from 'react';
import Swiper from 'react-native-swiper';
import {StyleComponent} from '../../utiles/styles';
import Banner from '../../assets/svg/Banner.svg';
import {Color} from '../../utiles/color';
interface SliderProps {
  style?: StyleProp<ViewStyle>;
}
// Memoized slide component to prevent unnecessary re-renders
const SlideItem = memo(({_index}: {_index: number}) => (
  <View style={styles.slide1}>
    <Banner />
  </View>
));

// Memoized pagination dot component
const PaginationDot = memo(({isActive, index}: {isActive: boolean; index: number}) => (
  <View
    key={index}
    style={isActive ? styles.activeDotStyle : styles.dotStyle}
  />
));

const Slider = memo(({style}: SliderProps) => {
  const {Styles} = StyleComponent();
  const [activeIndex, setActiveIndex] = useState(0);

  // Memoize the images array to prevent recreation on every render
  const images = useMemo(() => [0, 1, 2], []);

  // Memoize the onIndexChanged callback to prevent unnecessary re-renders
  const handleIndexChanged = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Memoize pagination dots to prevent recreation
  const paginationDots = useMemo(() =>
    images.map((_, index) => (
      <PaginationDot
        key={index}
        isActive={index === activeIndex}
        index={index}
      />
    )), [activeIndex, images]
  );

  return (
    <View style={[Styles.alignSelf, styles.wrapper, style]}>
      <Swiper
        style={styles.swiperContainer}
        onIndexChanged={handleIndexChanged}
        loop={false}
        removeClippedSubviews={true}
        showsPagination={false}
        autoplay={false}
        autoplayTimeout={3}
        loadMinimal={true}
        loadMinimalSize={1}>
        {images.map((_, index) => (
          <SlideItem key={index} _index={index} />
        ))}
      </Swiper>
      <View style={styles.customPaginationContainer}>
        {paginationDots}
      </View>
    </View>
  );
});

export default Slider;

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
