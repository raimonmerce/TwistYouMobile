import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, GestureResponderEvent } from 'react-native';
import { assets } from '../../assets/assets';
import { useSoundPlayer } from '../../hooks/useSoundPlayer';

interface ButtonHeaderProps {
  onPress: () => void;
  children: React.ReactNode;
  soundKey?: keyof typeof assets.sounds;
}

const ButtonHeader: React.FC<ButtonHeaderProps> = ({ onPress, children, soundKey = 'settingsSound'  }) => {

  const playSound = useSoundPlayer();
  
  const handlePress = async () => {
    await playSound(soundKey);
    onPress();
  };

  return (
    <TouchableOpacity  style={styles.buttonHeader} onPress={handlePress}>
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