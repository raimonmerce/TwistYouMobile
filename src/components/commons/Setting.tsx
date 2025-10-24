import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { H5, BaseText } from '../commons/Text';
import { useTheme } from '../ThemeProvider';
import { assets } from '../../assets/assets';
import { useSoundPlayer } from '../../hooks/useSoundPlayer';

interface SettingProps {
  name: string;
  description: string;
  setValue: (value: boolean) => void;
  value: boolean;
  soundKey?: keyof typeof assets.sounds;
}

const Setting: React.FC<SettingProps> = ({ name, description, setValue, value, soundKey = 'settingsSound' }) => {
  const { colors } = useTheme();
  const playSound = useSoundPlayer();

  const handleValueChange = async (val : boolean) => {
    await playSound(soundKey);
    setValue(val);
  };

  const styles = StyleSheet.create({
    setting: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
      backgroundColor: colors.background
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
      transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    },
  });

  
  return (
    <View style={styles.setting}>
      <View style={styles.info}>
        <H5>{name}</H5>
        <BaseText>{description}</BaseText>
      </View>
      <Switch
        value={value}
        onValueChange={handleValueChange}
        trackColor={{ false: colors.text, true: colors.secondary }}
        thumbColor={value ? colors.text : '#ccc'} 
        style={styles.switch}
      />
    </View>
  );
};

export default Setting;