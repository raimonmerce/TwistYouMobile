import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface DropdownSelectorProps {
  name: string;
  description: string;
  items: { value: string; label: string }[];
  onChange: (value: string) => void;
  initialValue: string;
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  name,
  description,
  items,
  onChange,
  initialValue,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={initialValue}
          onValueChange={(itemValue) => onChange(itemValue)}
          style={styles.dropdown}
          dropdownIconColor="#333"
        >
          {items.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default DropdownSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    width: '100%',
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
  pickerWrapper: {
    borderWidth: 2,
    borderColor: '#007AFF', // replace with your var(--color-primary)
    borderRadius: 6,
    backgroundColor: '#fff',
    minWidth: 120,
  },
  dropdown: {
    color: '#333',
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
