import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Page } from '../../types';

interface LandingProps {
  setContentPage: (value: Page) => void;
}

const Landing: React.FC<LandingProps> = ({ setContentPage }) => {
  const { t } = useTranslation();

  const handlePlay = () => {
    setContentPage('main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TwistYou</Text>
      <Button title={t('footer.play')} onPress={handlePlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Landing;
