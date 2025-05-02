import React from "react";
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontSizes, Fonts } from '../../../styles/theme';
import { useTheme } from '../ThemeProvider';

interface ButtonBaseProps {
  onPress: () => void;
  text: string;
}

const ButtonBase: React.FC<ButtonBaseProps> = ({ onPress, text }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    button: {
      backgroundColor: colors.primary,
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
  
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonBase;
