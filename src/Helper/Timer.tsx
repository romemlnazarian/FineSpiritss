import React, { useCallback, useEffect, useReducer, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BackgroundTimer from "react-native-background-timer";
import { StyleComponent } from "../utiles/styles";
import { Color } from "../utiles/color";

interface Props {
  onCountdownComplete: () => void;
  restartKey?: number;
  startSeconds?: number;
}

const Timer: React.FC<Props> = ({ onCountdownComplete, restartKey, startSeconds }) => {
  const { Styles } = StyleComponent();
  const [SecondsLeft, setSecondsLeft] = useState<number>(startSeconds ?? 60);
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

  // Restart timer when restartKey changes
  useEffect(() => {
    if (restartKey !== undefined) {
      BackgroundTimer.stopBackgroundTimer();
      setSecondsLeft(startSeconds ?? 60);
      updateEvent({ TimerOn: true, DisableResend: true, ExpirCode: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restartKey]);


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
  }, []);

  const clockify = () => {
    const mins = Math.floor((SecondsLeft / 60) % 60);
    const seconds = Math.floor(SecondsLeft % 60);
    const displayMins = mins < 10 ? `0${mins}` : String(mins);
    const displaySecs = seconds < 10 ? `0${seconds}` : String(seconds);
    return { displayMins, displaySecs };
  };

  const { displayMins, displaySecs } = clockify();

  return (
    <View>
      <Text style={[Styles.title_Regular, styles.text, Styles.marginVertical]}>
        {displayMins} : {displaySecs}
      </Text>
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