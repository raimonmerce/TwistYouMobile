import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Page } from '../../types';
import { H1 } from '../commons/Text';
import ButtonBase from '../commons/ButtonBase';
import { Colors } from '../../../styles/theme';
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
      <H1>TwistYou</H1>
      <ButtonBase text={t('footer.play')} onPress={handlePlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    backgroundColor: Colors.background
  }
});

export default Landing;
