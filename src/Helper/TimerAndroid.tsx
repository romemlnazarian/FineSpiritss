import React, {useCallback, useEffect, useReducer, useRef, useState} from 'react';
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

const Timer: React.FC<Props> = ({onCountdownComplete, restartKey, startSeconds}) => {
  const {Styles} = StyleComponent();
  const initialSeconds = startSeconds ?? 60;
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const endTimeRef = useRef<number | null>(null);

  const [event, updateEvent] = useReducer(
    (
      prev: {
        timerOn: boolean;
        disableResend: boolean;
        expiredCode: boolean;
      },
      next: Partial<{
        timerOn: boolean;
        disableResend: boolean;
        expiredCode: boolean;
      }>,
    ) => ({...prev, ...next}),
    {timerOn: true, disableResend: false, expiredCode: false},
  );

  const computeSecondsLeft = useCallback(() => {
    if (!endTimeRef.current) return 0;
    const diffMs = endTimeRef.current - Date.now();
    const remaining = Math.ceil(diffMs / 1000);
    return remaining > 0 ? remaining : 0;
  }, []);

  const startTimer = useCallback(
    (secondsToStart: number) => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      endTimeRef.current = Date.now() + secondsToStart * 1000;
      setSecondsLeft(secondsToStart);
      intervalRef.current = setInterval(() => {
        setSecondsLeft(() => computeSecondsLeft());
      }, 1000);
    },
    [computeSecondsLeft],
  );

  // React to timerOn changes
  useEffect(() => {
    if (event.timerOn) {
      startTimer(secondsLeft || initialSeconds);
      updateEvent({disableResend: true});
    } else {
      updateEvent({disableResend: false, expiredCode: true});
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event.timerOn]);

  // Control start/stop by boolean restartKey
  useEffect(() => {
    if (restartKey === false) return;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (restartKey === true) {
      updateEvent({timerOn: true, disableResend: true, expiredCode: false});
      startTimer(initialSeconds);
    } else {
      updateEvent({timerOn: false});
    }
  }, [restartKey, initialSeconds, startTimer]);

  // When reaches zero
  useEffect(() => {
    if (secondsLeft === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      onCountdownComplete();
      updateEvent({timerOn: false});
    }
  }, [secondsLeft, onCountdownComplete]);

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

export default Timer;


