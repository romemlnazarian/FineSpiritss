import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import {Language} from '../../utiles/Language/i18n';

interface CatalogCountryProps {
  data: any;
  title: string;
  onHandler: (type: string, item: any) => void;
  selectedCountries?: any[];
  selectedBrands?: any[];
  selectedVolumes?: any[];
}

export default function CatalogTabsFilter({
  data,
  title,
  onHandler,
  selectedCountries = [],
  selectedBrands = [],
  selectedVolumes = [],
}: CatalogCountryProps) {
  const {Styles} = StyleComponent();
  const normalizedTitle = String(title ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_');
  const key =
    normalizedTitle === 'country'
      ? 'country'
      : normalizedTitle === 'brand'
        ? 'brand'
        : normalizedTitle === 'capacity'
          ? 'capacity'
          : // Backward compat if older code passes "Country"/"Brand"/"Capacity"
            normalizedTitle;

  const titleLabel =
    key === 'country'
      ? Language.filter_country
      : key === 'brand'
        ? Language.filter_brand
        : key === 'capacity'
          ? Language.filter_capacity
          : title;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[Styles.h5_Medium, Styles.textAlign]}>{titleLabel}</Text>
        {key === 'country' &&
          data?.country?.map((item: any, index: number) => {
            const value =
              typeof item === 'string'
                ? item
                : item?.value ?? item?.name ?? String(item);
            const normalized = String(value);
            const isSelected = selectedCountries?.includes(normalized);
            return (
              <TouchableOpacity
                key={`country-${index}-${value}`}
                style={[
                  styles.itemContainer,
                ]}
                onPress={() => onHandler('country', item)}>
                <View style={styles.leftSection}>
                  <Text
                    style={[
                      Styles.body_Regular,
                      styles.itemText,
                      isSelected && styles.selectedText,
                    ]}>
                    {value}
                  </Text>
                </View>
                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]} />
              </TouchableOpacity>
            );
          })}
        {key === 'brand' &&
          data?.brand?.map((item: any, index: number) => {
            const value = item?.slug ?? item?.id ?? item?.name ?? String(item);
            const normalized = String(value);
            const isSelected = selectedBrands?.includes(normalized);
            return (
              <TouchableOpacity
                key={`brand-${index}-${value}`}
                style={[
                  styles.itemContainer,
                ]}
                onPress={() => onHandler('brand', item)}>
                <View style={styles.leftSection}>
                  <Text
                    style={[
                      Styles.body_Regular,
                      styles.itemText,
                      isSelected && styles.selectedText,
                    ]}>
                    {item?.name ?? value}
                  </Text>
                </View>
                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]} />
              </TouchableOpacity>
            );
          })}
        {key === 'capacity' &&
          data?.volume?.map((item: any, index: number) => {
            const value =
              typeof item === 'object'
                ? item?.slug ?? item?.value ?? item?.label ?? String(item)
                : String(item);
            const label =
              typeof item === 'object' ? item?.label ?? item?.value ?? item?.slug : item;
            const normalized = String(value);
            const isSelected = selectedVolumes?.includes(normalized);
            return (
              <TouchableOpacity
                key={`capacity-${index}-${value}`}
                style={[
                  styles.itemContainer,
                ]}
                onPress={() => onHandler('Capacity', item)}>
                <View style={styles.leftSection}>
                  <Text
                    style={[
                      Styles.body_Regular,
                      styles.itemText,
                      isSelected && styles.selectedText,
                    ]}>
                    {label} {Language.unit_ml}
                  </Text>
                </View>
                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]} />
              </TouchableOpacity>
            );
          })}
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
  itemContainerSelected: {
    backgroundColor: Color.lightGray,
    borderRadius: 12,
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
  checkboxSelected: {
    backgroundColor: Color.primary,
    borderColor: Color.primary,
  },
  selectedText: {
    color: Color.primary,
  },
});
