import React, { useRef, useEffect } from 'react';
import { Animated, Image, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Page } from '../../types';
import { H1 } from '../commons/Text';
import ButtonBase from '../commons/ButtonBase';
import { useTheme } from '../ThemeProvider';
import mainImage from "../../assets/png/concepts/main.png";

interface LandingProps {
  setContentPage: (value: Page) => void;
}

const Landing: React.FC<LandingProps> = ({ setContentPage }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handlePlay = () => {
    setContentPage('main');
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
      backgroundColor: colors.background
    }
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
        <H1>TwistYou</H1>

        <Image 
          source={mainImage}
          style={{ width: 400, height: 400, resizeMode: "contain" }}
        />

        <ButtonBase text={t("footer.play")} onPress={handlePlay} />
      </Animated.View>
    </View>
  );
};

export default Landing;
