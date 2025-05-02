import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { H5, BaseText } from '../commons/Text';
import { useTheme } from '../ThemeProvider';
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
  const { colors } = useTheme();
    
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderBottomWidth: 1,
      borderBottomColor: colors.text,
      width: '100%',
      backgroundColor: colors.background
    },
    info: {
      flex: 1,
      flexDirection: 'column',
      marginRight: 16,
    },
    pickerWrapper: {
      borderWidth: 2,
      borderColor: colors.primary,
      borderRadius: 10,
      minWidth: 100,
      maxWidth: 120,
      justifyContent: 'center',
      width: 180,
      height: 55,
      backgroundColor: colors.input
    },
    dropdown: {
      color: colors.text,
      fontSize: 16,
    },
    item: {
      color: colors.text,
      //backgroundColor: colors.background
    }
  });

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
          dropdownIconColor={colors.text}
        >
          {items.map((item) => (
            <Picker.Item
              key={item.value}
              style={styles.item}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default DropdownSelector;
