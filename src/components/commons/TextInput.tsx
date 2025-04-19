import React from 'react';
import { TextInput as RNTextInput, StyleSheet, View } from 'react-native';

interface TextInputProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ id, placeholder, value, onChange }) => {
  const handleChange = (input: string) => {
    onChange(input);
  };

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

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  textInput: {
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#007AFF', // replace with your --color-primary
    borderRadius: 6,
    backgroundColor: 'white',
    color: '#333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 40,
    width: '100%',
    //boxSizing: 'border-box' as any, // RN doesn't have boxSizing, so ignoring it
  },
  textInputFocus: {
    borderColor: '#4CAF50', // Add any focus styles you need
  },
});
