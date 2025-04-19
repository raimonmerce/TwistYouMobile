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
    bottom: 0,
    left: 0,
    right: 0,
    height: 100, // ~6em, adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12, // React Native doesn't directly support gap, so use padding/margins for spacing
    paddingHorizontal: 16,
  },
});
