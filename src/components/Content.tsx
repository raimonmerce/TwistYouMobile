import React from 'react';
import { View, StyleSheet } from 'react-native';
interface ContentProps {
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 128,
    paddingBottom: 80,
  },
});

export default Content;
