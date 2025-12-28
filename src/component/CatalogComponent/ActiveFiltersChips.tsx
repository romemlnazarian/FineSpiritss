import React, {memo, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color} from '../../utiles/color';
import {StyleComponent} from '../../utiles/styles';

type Chip = {type: 'Country' | 'Brand' | 'Capacity'; value: string; label: string};

type Props = {
  countries?: string[];
  brands?: string[];
  volumes?: string[];
  onRemove: (type: Chip['type'], value: string) => void;
};

const ActiveFiltersChips = memo(({countries = [], brands = [], volumes = [], onRemove}: Props) => {
  const {Styles} = StyleComponent();

  const chips = useMemo<Chip[]>(() => {
    const c: Chip[] = [];
    countries.forEach(v => c.push({type: 'Country', value: v, label: v}));
    brands.forEach(v => c.push({type: 'Brand', value: v, label: v}));
    volumes.forEach(v => {
      const isNumberLike = /^\d+(\.\d+)?$/.test(String(v));
      c.push({type: 'Capacity', value: v, label: isNumberLike ? `${v} ml` : String(v)});
    });
    return c;
  }, [brands, countries, volumes]);

  if (chips.length === 0) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        {chips.map(chip => (
          <View key={`${chip.type}:${chip.value}`} style={styles.chip}>
            <Text style={[Styles.subtitle_Regular, styles.chipText]} numberOfLines={1}>
              {chip.label}
            </Text>
            <TouchableOpacity
              onPress={() => onRemove(chip.type, chip.value)}
              hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
              style={styles.closeBtn}>
              <Text style={[Styles.subtitle_Regular, styles.closeText]}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
});

export default ActiveFiltersChips;

const styles = StyleSheet.create({
  wrapper: {
    width: '93%',
    alignSelf: 'center',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.white,
    borderWidth: 1,
    borderColor: Color.lightGray,
    borderRadius: 18,
    paddingLeft: 12,
    paddingRight: 10,
    paddingVertical: 6,
    maxWidth: '100%',
  },
  chipText: {
    color: Color.black,
    maxWidth: 220,
  },
  closeBtn: {
    marginLeft: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.background,
  },
  closeText: {
    color: Color.gray,
    marginTop: -1,
  },
});


