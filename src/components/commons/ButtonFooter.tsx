import React from "react";
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ButtonFooterProps {
  onPress: () => void;
  text: string;
}

const ButtonFooter: React.FC<ButtonFooterProps> = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonFooter;
