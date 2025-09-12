import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Color } from '../utiles/color';
import Arrow from '../assets/svg/Arrow.svg';
import TextInputComponent from './TextInputComponent';

interface SearchBarProps {
  placeholder?: string;
  onBackPress?: () => void;
  onSearchChange?: (text: string) => void;
  value?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onBackPress,
  onSearchChange,
  value,
}) => {
  const [searchText, setSearchText] = useState(value || '');

  const handleTextChange = (text: string) => {
    setSearchText(text);
    onSearchChange?.(text);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Arrow width={24} height={24} fill={Color.black} />
      </TouchableOpacity>
      <View style={styles.textInputContainer}>
        <TextInputComponent
          placeholder={placeholder}
          value={searchText}
          onChangeText={handleTextChange}
          containerStyle={styles.textInputStyle}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Color.lightGray,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  textInputContainer: {
    flex: 1,
  },
  textInputStyle: {
    width: '100%',
    height: 50,
    marginLeft: 0,
    alignSelf: 'stretch',
  },
});