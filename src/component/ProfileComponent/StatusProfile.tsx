import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Star from 'react-native-vector-icons/AntDesign';
import Svg, {Circle} from 'react-native-svg';

type StatusProfileProps = {
  currentPoints?: number;
  targetPoints?: number;
};

export default function StatusProfile({
  currentPoints = 0,
  targetPoints = 600,
}: StatusProfileProps) {
  const {Styles} = StyleComponent();
  const size = 100;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, targetPoints > 0 ? currentPoints / targetPoints : 0));
  const strokeDashoffset = circumference * (1 - progress);
  return (
    <View style={styles.container}>
      <View style={styles.avatarOuter}>
        <Svg width={size} height={size} style={styles.progressSvg}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={Color.background}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={Color.gold}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            strokeLinecap="round"
          />
        </Svg>
        <View style={styles.avatarInner}>
          <Star name="star" size={25} color={Color.gold} />
        </View>
      </View>
      <View style={styles.textBlock}>
          <Text style={[Styles.title_Bold]}>Your Status - Standard</Text>
          <Text style={[Styles.title_Regular, styles.descWidth]}>
          Accumulate 600 points before 09/03/2025,
          to get your Basic status for a 3% discount!
          </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: 12,
    padding: 10,
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarInner: {
    width: 60,
    height: 60,
    backgroundColor: Color.background,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  textBlock: {
    marginLeft: '2%',
    gap: 5,
  },
  descWidth: { width: '40%' },
});
