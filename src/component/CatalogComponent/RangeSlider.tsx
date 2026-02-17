import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Color} from '../../utiles/color';

type Props = {
  min: number;
  max: number;
  step?: number;
  minRange?: number;
  low: number;
  high: number;
  onChange: (low: number, high: number) => void;
};

const TRACK_HEIGHT = 4;
const TRACK_CONTAINER_HEIGHT = 28;
const THUMB_SIZE = 18;
const THUMB_TOUCH_SIZE = 40;

const clamp = (v: number, min: number, max: number) => {
  'worklet';
  return Math.max(min, Math.min(max, v));
};

const snap = (v: number, step: number) => {
  'worklet';
  if (step <= 0) {
    return v;
  }
  return Math.round(v / step) * step;
};

const RangeSlider = memo(({min, max, step = 1, minRange = 0, low, high, onChange}: Props) => {
  const range = useMemo(() => Math.max(1, max - min), [max, min]);

  const [trackWidth, setTrackWidth] = useState(0);
  const lastEmittedRef = useRef<{low: number; high: number}>({low, high});

  const trackW = useSharedValue(0);
  const activeThumb = useSharedValue<0 | 1 | 2>(0); // 1=low,2=high

  const lowX = useSharedValue(0);
  const highX = useSharedValue(0);

  const lastLow = useSharedValue<number>(low);
  const lastHigh = useSharedValue<number>(high);

  const minRangePx = useDerivedValue(() => {
    if (trackW.value <= 0) {
      return 0;
    }
    return (minRange / range) * trackW.value;
  }, [minRange, range]);

  const emitIfChanged = useCallback(
    (nextLow: number, nextHigh: number) => {
      lastEmittedRef.current = {low: nextLow, high: nextHigh};
      onChange(nextLow, nextHigh);
    },
    [onChange],
  );

  const valueToXJs = useCallback(
    (value: number) => {
      if (trackWidth <= 0) {
        return 0;
      }
      const t = (clamp(value, min, max) - min) / range;
      return t * trackWidth;
    },
    [max, min, range, trackWidth],
  );

  // Sync shared X positions only for EXTERNAL prop updates (reset, bounds change, etc.)
  useEffect(() => {
    if (trackWidth <= 0) {
      return;
    }
    const last = lastEmittedRef.current;
    if (last.low === low && last.high === high) {
      // change came from slider itself; don't fight the gesture with animations
      return;
    }
    lowX.value = withTiming(valueToXJs(low), {duration: 120});
    highX.value = withTiming(valueToXJs(high), {duration: 120});
    lastLow.value = low;
    lastHigh.value = high;
  }, [high, low, max, min, range, trackWidth, valueToXJs, highX, lowX, lastHigh, lastLow]);

  const onTrackLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    trackW.value = w;
    setTrackWidth(w);
    // initialize positions from props
    lowX.value = ((clamp(low, min, max) - min) / range) * w;
    highX.value = ((clamp(high, min, max) - min) / range) * w;
    lastLow.value = low;
    lastHigh.value = high;
    lastEmittedRef.current = {low, high};
  };

  const lowThumbStyle = useAnimatedStyle(() => ({
    left: lowX.value - THUMB_TOUCH_SIZE / 2,
    zIndex: activeThumb.value === 1 ? 3 : 2,
  }));

  const highThumbStyle = useAnimatedStyle(() => ({
    left: highX.value - THUMB_TOUCH_SIZE / 2,
    zIndex: activeThumb.value === 2 ? 3 : 1,
  }));

  const activeTrackStyle = useAnimatedStyle(() => {
    const left = Math.min(lowX.value, highX.value);
    const width = Math.max(0, Math.abs(highX.value - lowX.value));
    return {left, width};
  });

  const lowStartX = useSharedValue(0);
  const highStartX = useSharedValue(0);

  const lowPan = useMemo(() => {
    return Gesture.Pan()
      .onBegin(() => {
        activeThumb.value = 1;
        lowStartX.value = lowX.value;
      })
      .onUpdate(e => {
        const w = trackW.value;
        if (w <= 0) {
          return;
        }
        const rawX = lowStartX.value + e.translationX;
        const maxX = Math.max(0, highX.value - minRangePx.value);
        const clampedX = clamp(rawX, 0, maxX);

        const rawValue = min + (clampedX / w) * range;
        const nextLowValue = clamp(snap(rawValue, step), min, max);
        const snappedX = ((nextLowValue - min) / range) * w;

        const finalX = clamp(snappedX, 0, maxX);
        lowX.value = finalX;

        if (nextLowValue !== lastLow.value) {
          lastLow.value = nextLowValue;
          runOnJS(emitIfChanged)(nextLowValue, lastHigh.value);
        }
      })
      .onEnd(() => {
        activeThumb.value = 0;
      });
  }, [activeThumb, emitIfChanged, highX, lastHigh, lastLow, lowStartX, lowX, max, min, minRangePx, range, step, trackW]);

  const highPan = useMemo(() => {
    return Gesture.Pan()
      .onBegin(() => {
        activeThumb.value = 2;
        highStartX.value = highX.value;
      })
      .onUpdate(e => {
        const w = trackW.value;
        if (w <= 0) {
          return;
        }
        const rawX = highStartX.value + e.translationX;
        const minX = Math.min(w, lowX.value + minRangePx.value);
        const clampedX = clamp(rawX, minX, w);

        const rawValue = min + (clampedX / w) * range;
        const nextHighValue = clamp(snap(rawValue, step), min, max);
        const snappedX = ((nextHighValue - min) / range) * w;

        const finalX = clamp(snappedX, minX, w);
        highX.value = finalX;

        if (nextHighValue !== lastHigh.value) {
          lastHigh.value = nextHighValue;
          runOnJS(emitIfChanged)(lastLow.value, nextHighValue);
        }
      })
      .onEnd(() => {
        activeThumb.value = 0;
      });
  }, [activeThumb, emitIfChanged, highStartX, highX, lastHigh, lastLow, lowX, max, min, minRangePx, range, step, trackW]);

  const tapOrDragTrack = useMemo(() => {
    const updateNearest = (x: number) => {
      'worklet';
      const w = trackW.value;
      if (w <= 0) {
        return;
      }
      const clampedX = clamp(x, 0, w);
      const rawValue = min + (clampedX / w) * range;
      const snappedValue = clamp(snap(rawValue, step), min, max);
      const snappedX = ((snappedValue - min) / range) * w;

      const distLow = Math.abs(snappedX - lowX.value);
      const distHigh = Math.abs(snappedX - highX.value);

      if (distLow <= distHigh) {
        const maxX = Math.max(0, highX.value - minRangePx.value);
        const finalX = clamp(snappedX, 0, maxX);
        lowX.value = withSpring(finalX, {damping: 20, stiffness: 220});
        if (snappedValue !== lastLow.value) {
          lastLow.value = snappedValue;
          runOnJS(emitIfChanged)(snappedValue, lastHigh.value);
        }
        return;
      }

      const minX = Math.min(w, lowX.value + minRangePx.value);
      const finalX = clamp(snappedX, minX, w);
      highX.value = withSpring(finalX, {damping: 20, stiffness: 220});
      if (snappedValue !== lastHigh.value) {
        lastHigh.value = snappedValue;
        runOnJS(emitIfChanged)(lastLow.value, snappedValue);
      }
    };

    return Gesture.Pan()
      .onBegin(e => {
        updateNearest(e.x);
      })
      .onUpdate(e => {
        updateNearest(e.x);
      });
  }, [emitIfChanged, highX, lastHigh, lastLow, lowX, max, min, minRangePx, range, step, trackW]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.trackContainer} onLayout={onTrackLayout}>
        <GestureDetector gesture={tapOrDragTrack}>
          <View style={styles.track} />
        </GestureDetector>
        <Animated.View style={[styles.activeTrack, activeTrackStyle]} pointerEvents="none" />

        <GestureDetector gesture={lowPan}>
          <Animated.View style={[styles.thumbTouch, lowThumbStyle]}>
            <View style={styles.thumbVisual} />
          </Animated.View>
        </GestureDetector>

        <GestureDetector gesture={highPan}>
          <Animated.View style={[styles.thumbTouch, highThumbStyle]}>
            <View style={styles.thumbVisual} />
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
});

export default RangeSlider;

const styles = StyleSheet.create({
  wrapper: {
    width: '85%',
    alignSelf: 'center',
    paddingVertical: 14,
  },
  trackContainer: {
    width: '100%',
    height: TRACK_CONTAINER_HEIGHT,
    justifyContent: 'center',
  },
  track: {
    width: '100%',
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT,
    backgroundColor: Color.gray,
  },
  activeTrack: {
    position: 'absolute',
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT,
    backgroundColor: Color.primary,
  },
  thumbTouch: {
    position: 'absolute',
    width: THUMB_TOUCH_SIZE,
    height: THUMB_TOUCH_SIZE,
    top: (TRACK_CONTAINER_HEIGHT - THUMB_TOUCH_SIZE) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbVisual: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE,
    backgroundColor: Color.primary,
    borderWidth: 2,
    borderColor: Color.white,
  },
});

















