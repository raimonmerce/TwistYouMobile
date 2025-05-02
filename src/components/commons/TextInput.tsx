import React from 'react';
import { TextInput as RNTextInput, StyleSheet, View } from 'react-native';
import { useTheme } from '../ThemeProvider';

interface TextInputProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const { colors } = useTheme();

const TextInput: React.FC<TextInputProps> = ({ id, placeholder, value, onChange }) => {
  const handleChange = (input: string) => {
    onChange(input);
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    textInput: {
      fontSize: 16,
      borderWidth: 2,
      borderColor: colors.secondary,
      borderRadius: 6,
      backgroundColor: colors.text,
      color: '#333',
      paddingHorizontal: 12,
      paddingVertical: 8,
      height: 40,
      width: '100%',
    },
    textInputFocus: {
      borderColor: colors.secondary,
    },
  });

  return (
    <View style={styles.container}>
      <RNTextInput
        id={id}
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={handleChange}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

export default TextInput;
