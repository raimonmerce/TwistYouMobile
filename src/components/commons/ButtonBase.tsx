import React from "react";
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontSizes, Fonts } from '../../../styles/theme';
import { useTheme } from '../ThemeProvider';
import { assets } from '../../assets/assets';
import { useSoundPlayer } from '../../hooks/useSoundPlayer';

interface ButtonBaseProps {
  onPress: () => void;
  text: string;
  soundKey?: keyof typeof assets.sounds;
}

const ButtonBase: React.FC<ButtonBaseProps> = ({ onPress, text, soundKey = 'click2' }) => {
  const { colors } = useTheme();
  const playSound = useSoundPlayer();

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

  const handlePress = async () => {
    await playSound(soundKey);
    onPress();
  };
  
  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonBase;
