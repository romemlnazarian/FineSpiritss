import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  LayoutChangeEvent,
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  View,
} from 'react-native';
import {Color} from '../../utiles/color';

type Props = {
  min: number;
  max: number;
  step?: number;
  low: number;
  high: number;
  onChange: (low: number, high: number) => void;
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const snap = (v: number, step: number) => {
  if (step <= 0) return v;
  return Math.round(v / step) * step;
};

const RangeSlider = memo(({min, max, step = 1, low, high, onChange}: Props) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const trackXRef = useRef(0);

  const range = useMemo(() => Math.max(1, max - min), [max, min]);

  const valueToX = useCallback(
    (value: number) => {
      if (trackWidth <= 0) return 0;
      const t = (clamp(value, min, max) - min) / range;
      return t * trackWidth;
    },
    [min, max, range, trackWidth],
  );

  const xToValue = useCallback(
    (x: number) => {
      const t = trackWidth <= 0 ? 0 : clamp(x, 0, trackWidth) / trackWidth;
      const raw = min + t * range;
      const snapped = snap(raw, step);
      return clamp(snapped, min, max);
    },
    [min, max, range, step, trackWidth],
  );

  const onTrackLayout = useCallback((e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
  }, []);

  const updateLowFromGesture = useCallback(
    (gesture: PanResponderGestureState) => {
      const x = gesture.moveX - trackXRef.current;
      const nextLow = xToValue(x);
      const clampedLow = Math.min(nextLow, high);
      onChange(clampedLow, high);
    },
    [high, onChange, xToValue],
  );

  const updateHighFromGesture = useCallback(
    (gesture: PanResponderGestureState) => {
      const x = gesture.moveX - trackXRef.current;
      const nextHigh = xToValue(x);
      const clampedHigh = Math.max(nextHigh, low);
      onChange(low, clampedHigh);
    },
    [low, onChange, xToValue],
  );

  const lowPan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (_evt, gesture) => updateLowFromGesture(gesture),
        onPanResponderMove: (_evt, gesture) => updateLowFromGesture(gesture),
      }),
    [updateLowFromGesture],
  );

  const highPan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (_evt, gesture) => updateHighFromGesture(gesture),
        onPanResponderMove: (_evt, gesture) => updateHighFromGesture(gesture),
      }),
    [updateHighFromGesture],
  );

  // Measure absolute X of track so moveX -> relative X works correctly.
  const onTrackContainerLayout = useCallback((e: LayoutChangeEvent) => {
    // This layout gives relative within parent; we still need absolute for moveX.
    // We measure using onLayout + setTimeout with measure (works without refs to native handle here by using a ref).
    // We'll update trackXRef via measure in effect below.
    void e;
  }, []);

  const trackRef = useRef<View>(null);
  useEffect(() => {
    if (!trackRef.current) return;
    trackRef.current.measureInWindow((x) => {
      trackXRef.current = x;
    });
  }, [trackWidth]);

  const lowX = valueToX(low);
  const highX = valueToX(high);

  return (
    <View style={styles.wrapper}>
      <View ref={trackRef} onLayout={onTrackContainerLayout} style={styles.trackContainer}>
        <View onLayout={onTrackLayout} style={styles.track} />
        <View
          pointerEvents="none"
          style={[
            styles.activeTrack,
            {left: Math.min(lowX, highX), width: Math.max(0, Math.abs(highX - lowX))},
          ]}
        />

        <View
          style={[styles.thumb, {left: lowX - styles.thumb.width / 2}]}
          {...lowPan.panHandlers}
        />
        <View
          style={[styles.thumb, {left: highX - styles.thumb.width / 2}]}
          {...highPan.panHandlers}
        />
      </View>
    </View>
  );
});

export default RangeSlider;

const styles = StyleSheet.create({
  wrapper: {
    width: '93%',
    alignSelf: 'center',
    marginTop: 12,
    paddingVertical: 14,
  },
  trackContainer: {
    width: '100%',
    height: 24,
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
    height: 4,
    borderRadius: 4,
    backgroundColor: Color.primary,
  },
  thumb: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 18,
    backgroundColor: Color.primary,
    borderWidth: 2,
    borderColor: Color.white,
  },
});













