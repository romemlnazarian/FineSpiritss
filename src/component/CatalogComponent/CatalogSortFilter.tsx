import React, {useMemo} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import {Language} from '../../utiles/Language/i18n';
import {CatalogSortType} from '../../utiles/sortProducts';

type SortOption = {
  id: CatalogSortType;
  label: string;
  icon: string;
};

type Props = {
  value: CatalogSortType;
  onChange: (sort: CatalogSortType) => void;
};

export default function CatalogSortFilter({value, onChange}: Props) {
  const {Styles} = StyleComponent();

  const options = useMemo<SortOption[]>(
    () => [
      {
        id: 'newest',
        label: Language.sort_newest_first,
        icon: 'schedule',
      },
      {
        id: 'oldest',
        label: Language.sort_oldest_first,
        icon: 'history',
      },
      {
        id: 'title_asc',
        label: Language.sort_name_a_to_z,
        icon: 'sort-by-alpha',
      },
      {
        id: 'title_desc',
        label: Language.sort_name_z_to_a,
        icon: 'sort-by-alpha',
      },
      {
        id: 'price_asc',
        label: Language.sort_price_low_to_high,
        icon: 'south',
      },
      {
        id: 'price_desc',
        label: Language.sort_price_high_to_low,
        icon: 'north',
      },
    ],
    [],
  );

  return (
    <View style={styles.container}>
      <Text style={[Styles.h5_Medium, styles.title]}>{Language.sort_by}</Text>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {options.map(option => {
          const isSelected = value === option.id;
          return (
            <TouchableOpacity
              key={option.id}
              activeOpacity={0.75}
              onPress={() => onChange(option.id)}
              style={[styles.optionCard, isSelected && styles.optionCardSelected]}>
              <View
                style={[
                  styles.iconWrap,
                  isSelected && styles.iconWrapSelected,
                ]}>
                <MaterialIcons
                  name={option.icon}
                  size={20}
                  color={isSelected ? Color.white : Color.primary}
                  style={
                    option.id === 'title_desc' ? styles.flipIcon : undefined
                  }
                />
              </View>
              <Text
                style={[
                  Styles.body_Regular,
                  styles.optionLabel,
                  isSelected && styles.optionLabelSelected,
                ]}>
                {option.label}
              </Text>
              <View
                style={[
                  styles.radioOuter,
                  isSelected && styles.radioOuterSelected,
                ]}>
                {isSelected ? <View style={styles.radioInner} /> : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    gap: 10,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Color.lineGray,
    backgroundColor: Color.white,
    gap: 12,
  },
  optionCardSelected: {
    borderColor: Color.primary,
    backgroundColor: '#FDF5F5',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3E8E9',
  },
  iconWrapSelected: {
    backgroundColor: Color.primary,
  },
  flipIcon: {
    transform: [{scaleY: -1}],
  },
  optionLabel: {
    flex: 1,
    color: Color.black,
  },
  optionLabelSelected: {
    color: Color.primary,
    fontWeight: '600',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Color.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: Color.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Color.primary,
  },
});
