import React from 'react';
import { View, StyleSheet } from 'react-native';

interface FooterProps {
  children: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ children }) => {
  return <View style={styles.footer}>{children}</View>;
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
  },
});
