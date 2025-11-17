import React, { useCallback, useEffect, useReducer, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StyleComponent } from "../utiles/styles";
import BackgroundTimer from "react-native-background-timer";
import { Color } from "../utiles/color";

interface Props {
  onCountdownComplete: () => void;
  // true => start/reset timer, false => stop timer
  restartKey?: boolean;
  // optional custom start seconds, defaults to 60
  startSeconds?: number;
}

const Timer: React.FC<Props> = ({ onCountdownComplete, restartKey, startSeconds }) => {
  const { Styles } = StyleComponent();
  const [SecondsLeft, setSecondsLeft] = useState(startSeconds ?? 60);
  const [Event, updateEvent] = useReducer(
    (
      prev: {
        TimerOn: boolean;
        DisableResend: boolean;
        ExpirCode: boolean
      },
      next: {
        TimerOn?: boolean;
        DisableResend?: boolean;
        ExpirCode?: boolean
      }
    ) => {
      return { ...prev, ...next };
    },
    {
      TimerOn: true,
      DisableResend: false,
      ExpirCode: false
    }
  );


  // Countdown //
  useEffect(() => {
    if (Event.TimerOn) {
      startTimer();
      updateEvent({ DisableResend: true });
    } else {
      updateEvent({ DisableResend: false, ExpirCode: true });
      BackgroundTimer.stopBackgroundTimer();
    }
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [Event.TimerOn]);

  // Control start/stop by boolean restartKey
  useEffect(() => {
    if (restartKey === false) return;
    BackgroundTimer.stopBackgroundTimer();
    if (restartKey === true) {
      setSecondsLeft(startSeconds ?? 60);
      updateEvent({ TimerOn: true, DisableResend: true, ExpirCode: false });
    } else {
      updateEvent({ TimerOn: false });
    }
  }, [restartKey, startSeconds]);


  useEffect(() => {
    if (SecondsLeft === 0) {
      BackgroundTimer.stopBackgroundTimer();
      onCountdownComplete()
      updateEvent({
        TimerOn: false,
      });
    }
  }, [SecondsLeft]);

  const startTimer = useCallback(() => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft((secs) => {
        if (secs > 0) return secs - 1;
        else return 0;
      });
    }, 1000);
  }, [SecondsLeft]);

  const clockify = () => {
    let mins = Math.floor((SecondsLeft / 60) % 60);
    let seconds = Math.floor(SecondsLeft % 60);
    let displayMins = mins < 1 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayMins,
      displaySecs,
    };
  };

  return (
    <View>
      <Text style={[Styles.title_Regular, styles.text, Styles.marginVertical]}>{clockify().displayMins} : {clockify().displaySecs}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color:Color.gray,
    alignSelf: "center",
  },
});

export default Timer;