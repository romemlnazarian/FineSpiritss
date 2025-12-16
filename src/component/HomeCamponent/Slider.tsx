import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useState, useMemo, useCallback, memo, useEffect} from 'react';
import Swiper from 'react-native-swiper';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';

interface SliderProps {
  style?: StyleProp<ViewStyle>;
  data?: any[];
  onSubmit?: (item: any) => void;
}

const SlideItem = memo(
  ({item, onSubmit}: {item: any; onSubmit?: (item: any) => void}) => {
    const {Styles} = StyleComponent();
    const source = item?.image_mobile_url;
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.slide1} onPress={() => onSubmit?.(item)}>
        <Text
          style={[
            Styles.title_Bold,
            {color: Color.white, position: 'absolute', top: 10, left: 10,zIndex: 100},
          ]}>
          {item.title}
        </Text>
        <Text
          style={[
            Styles.title_Regular,
            {color: Color.white, position: 'absolute', top: 35, left: 10,zIndex: 100,width: '80%'},
          ]}>
          {item.text}
        </Text>
        <Image source={{uri: source}} style={styles.slideImage} />
      </TouchableOpacity>
    );
  },
);

// Memoized pagination dot component
const PaginationDot = memo(
  ({isActive, index}: {isActive: boolean; index: number}) => (
    <View
      key={index}
      style={isActive ? styles.activeDotStyle : styles.dotStyle}
    />
  ),
);

const Slider = memo(({style, data = [], onSubmit}: SliderProps) => {
  const {Styles} = StyleComponent();
  const [activeIndex, setActiveIndex] = useState(0);

  // Derive item count from data
  const itemCount = useMemo(
    () => (Array.isArray(data) ? data.length : 0),
    [data],
  );

  // Build indices array for pagination dots based on item count
  const images = useMemo(
    () => Array.from({length: itemCount}, (_, i) => i),
    [itemCount],
  );

  // Memoize the onIndexChanged callback to prevent unnecessary re-renders
  const handleIndexChanged = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Reset active index when data changes to avoid out-of-range
  useEffect(() => {
    if (activeIndex >= itemCount) {
      setActiveIndex(0);
    }
  }, [itemCount, activeIndex]);

  // Memoize pagination dots to prevent recreation
  const paginationDots = useMemo(
    () =>
      images.map((_, index) => (
        <PaginationDot
          key={index}
          isActive={index === activeIndex}
          index={index}
        />
      )),
    [activeIndex, images],
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
        {(Array.isArray(data) ? data : []).map((item, index) => (
          <SlideItem key={index} item={item} onSubmit={onSubmit} />
        ))}
      </Swiper>
      <View style={styles.customPaginationContainer}>{paginationDots}</View>
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
    width: '90%',
    height: 200,
    alignSelf: 'center',
    borderRadius: 20,
  },
  slideImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
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
