import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from './ThemeProvider';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    header: {
      position: 'relative',
      height: 128,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background
    },
  });
  
  return <View style={styles.header}>{children}</View>;
};

export default Header;


