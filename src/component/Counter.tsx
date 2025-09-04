import React, { useCallback, useEffect, useReducer, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Color } from "../utiles/color";
import BackgroundTimer from 'react-native-background-timer';
import { StyleComponent } from "../utiles/styles";

interface Props {
  onCountdownComplete: () => void;
}

const Counter: React.FC<Props> = ({ onCountdownComplete }) => {
  const { Styles } = StyleComponent();
  const [SecondsLeft, setSecondsLeft] = useState(60);
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
    <>
      <Text style={[Styles.title_Medium, styles.text]}>{clockify().displayMins} : {clockify().displaySecs}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color:Color.black,
    alignSelf: "center",
  },
});

export default Counter;