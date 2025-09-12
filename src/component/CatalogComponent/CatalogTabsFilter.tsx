import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';

interface CatalogCountryProps {
  title: string;
  name: string;
  number: number;
  image?: boolean;
}

export default function CatalogTabsFilter({title, name, number, image}: CatalogCountryProps) {
  const {Styles} = StyleComponent();
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[Styles.h5_Medium, Styles.textAlign]}>{title}</Text>
        <View style={styles.itemContainer}>
          <View style={styles.leftSection}>
            {image && <View style={styles.imagePlaceholder} />}
            <Text style={[Styles.body_Regular, styles.itemText]}>
              {name} ({number})
            </Text>
          </View>
          <TouchableOpacity style={styles.checkbox} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '98%',
    alignSelf: 'center',
    marginTop: '2%',
  },
  itemContainer: {
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Color.gray,
  },
  itemText: {
    marginLeft: '5%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Color.gray,
  },
});
