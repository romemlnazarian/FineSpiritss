// src/components/CustomHeader.js
import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

type CustomHeaderProps = {
  title?: string;
  showMenu?: boolean;
  showBack?: boolean;
};

export default function CustomHeader({ title, showMenu = true, showBack = false }:CustomHeaderProps) {
  const navigation = useNavigation();

  return (
    <Appbar.Header style={styles.header}>
      {showMenu && (
        <Appbar.Action
          icon="menu"
          // onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
      )}
      {showBack && (
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      )}
      <Appbar.Content title={title || ''} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6200ee',
  },
});
