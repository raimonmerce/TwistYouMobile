import React from 'react';
import { View, StyleSheet } from 'react-native';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return <View style={styles.header}>{children}</View>;
};

export default Header;

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    height: 80, // 5em = ~80px, adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
});
