import React from "react";
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, FontSizes, Fonts } from '../../../styles/theme';

interface ButtonBaseProps {
  onPress: () => void;
  text: string;
}

const ButtonBase: React.FC<ButtonBaseProps> = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonBase;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    minHeight: 32,
    minWidth: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts.base,
    fontSize: FontSizes.h4,
    color: '#fff',
  }
});
