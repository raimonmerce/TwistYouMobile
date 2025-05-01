import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { H5, BaseText } from '../commons/Text';
import { Colors } from '../../../styles/theme';

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
        <H5>{name}</H5>
        <BaseText>{description}</BaseText>
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
    backgroundColor: Colors.background
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 16,
  },
  pickerWrapper: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 10,
    minWidth: 100,
    maxWidth: 120,
    justifyContent: 'center',
    width: 180,
    height: 55,
    backgroundColor: Colors.input
  },
  dropdown: {
    color: '#333',
    fontSize: 16,
  },
});
