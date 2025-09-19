import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Time from '../../assets/svg/Time.svg';
export default function AwardsProfile({onHandlerShowHistory}:{onHandlerShowHistory:()=>void}) {
  const {Styles} = StyleComponent();
  const GOLD_LIGHT = 'rgba(222,165,51,0.25)';

  const tiers = [
    {name: 'Standard', sale: '0% sale', active: true},
    {name: 'Basic', sale: '3% sale', active: false},
    {name: 'Plus', sale: '5% sale', active: false},
    {name: 'Premium', sale: '7% sale', active: false},
    {name: 'VIP', sale: '10% sale', active: false},
  ];
  return (
    <View style={styles.container}>
      <Text style={Styles.h6_Medium}>My awards</Text>
      <View style={styles.headerRow}>
        <Text style={Styles.h3_SemiBold}>0 Points</Text>
        <TouchableOpacity style={styles.historyRow} onPress={onHandlerShowHistory}>
          <Time />
          <Text style={Styles.body_Medium}>Show history</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.timelineWrapper}>
        {tiers.map((tier, index) => {
          const isLast = index === tiers.length - 1;
          return (
            <View key={tier.name} style={styles.tierRow}>
              <View style={styles.leftCol}>
                <View
                  style={[
                    styles.tierCircle,
                    tier.active ? styles.circleActive : {borderColor: GOLD_LIGHT},
                  ]}
                >
                  <View
                    style={[
                      styles.tierDot,
                      {backgroundColor: tier.active ? Color.white : GOLD_LIGHT},
                    ]}
                  />
                </View>
                {!isLast && (
                  <View
                    style={[
                      styles.verticalLine,
                      {backgroundColor: tier.active ? Color.gold : GOLD_LIGHT},
                    ]}
                  />
                )}
              </View>
              <View style={styles.rightCol}>
                <Text
                  style={[
                    Styles.body_Bold,
                    {color: tier.active ? Color.black : Color.gray},
                  ]}
                >
                  {tier.name}
                </Text>
                <Text
                  style={[
                    Styles.body_Regular,
                    {color: tier.active ? Color.black : Color.gray},
                  ]}
                >
                  {tier.sale}
                </Text>
              </View>
            </View>
          );
        })}
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
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '2%',
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timelineWrapper: {
    marginTop: '4%',
  },
  tierRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 22,
  },
  leftCol: {
    width: 42,
    alignItems: 'center',
  },
  tierCircle: {
    width: 25,
    height: 25,
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleActive: {
    backgroundColor: Color.gold,
    borderColor: Color.gold,
  },
  tierDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  verticalLine: {
    width: 2,
    height: 28,
    marginTop: 6,
    marginBottom: -6,
    borderRadius: 1,
  },
  rightCol: {
    flex: 1,
  },
});
