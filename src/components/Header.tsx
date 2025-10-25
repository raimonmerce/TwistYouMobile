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
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 128,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "transparent",
      zIndex: 1000,
      elevation: 1000,
    },
  });
  
  return <View style={styles.header}>{children}</View>;
};

export default Header;


