import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StyleComponent} from '../utiles/styles';
import {Color} from '../utiles/color';

interface Props {
  onCountdownComplete: () => void;
  // true => start/reset timer, false => stop timer
  restartKey?: boolean;
  // optional custom start seconds, defaults to 60
  startSeconds?: number;
}

const TimerAndroid: React.FC<Props> = ({onCountdownComplete, restartKey, startSeconds}) => {
  const {Styles} = StyleComponent();
  const initialSeconds = startSeconds ?? 60;
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onCountdownComplete);
  const completedRef = useRef<boolean>(false);

  useEffect(() => {
    onCompleteRef.current = onCountdownComplete;
  }, [onCountdownComplete]);

  useEffect(() => {
    // restartKey === false => stop timer
    if (restartKey === false) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // (undefined or true) => start/reset timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    completedRef.current = false;
    setSecondsLeft(initialSeconds);
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [restartKey, initialSeconds]);

  // Fire completion callback AFTER render (avoids "setState while rendering another component")
  useEffect(() => {
    if (secondsLeft !== 0) {
      return;
    }
    if (completedRef.current) {
      return;
    }
    completedRef.current = true;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    onCompleteRef.current?.();
  }, [secondsLeft]);

  const clockify = () => {
    const mins = Math.floor((secondsLeft / 60) % 60);
    const seconds = Math.floor(secondsLeft % 60);
    const displayMins = mins < 10 ? `0${mins}` : String(mins);
    const displaySecs = seconds < 10 ? `0${seconds}` : String(seconds);
    return {displayMins, displaySecs};
  };

  return (
    <View>
      <Text style={[Styles.title_Regular, styles.text, Styles.marginVertical]}>
        {clockify().displayMins} : {clockify().displaySecs}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Color.gray,
    alignSelf: 'center',
  },
});

export default TimerAndroid;


