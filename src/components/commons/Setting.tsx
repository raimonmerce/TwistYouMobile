import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { H5, BaseText } from '../commons/Text';

interface SettingProps {
  name: string;
  description: string;
  setValue: (value: boolean) => void;
  value: boolean;
}

const Setting: React.FC<SettingProps> = ({ name, description, setValue, value }) => {
  return (
    <View style={styles.setting}>
      <View style={styles.info}>
        <H5>{name}</H5>
        <BaseText>{description}</BaseText>
      </View>
      <Switch
        value={value}
        onValueChange={setValue}
        trackColor={{ false: '#e0e0e0', true: '#4cd137' }} // Green when true, gray when false
        thumbColor={value ? '#fff' : '#ccc'} // White thumb color when true, gray when false
        style={styles.switch}
      />
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  info: {
    flex: 1,
    flexDirection: 'column',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }], // Optional: Adjust switch size
  },
});
