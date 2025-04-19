import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, GestureResponderEvent } from 'react-native';

interface ButtonHeaderProps {
  onPress: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
}

const ButtonHeader: React.FC<ButtonHeaderProps> = ({ onPress, children }) => {

  return (
    <TouchableOpacity  style={styles.buttonHeader} onPress={onPress}>
      {children}
    </TouchableOpacity >
  );
};

export default ButtonHeader;

const styles = StyleSheet.create({
  buttonHeader: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    minHeight: 0,
    minWidth: 0,
    padding: 4,
  } as ViewStyle,
});