import React, { useEffect, useRef } from 'react';
import { Modal, View, StyleSheet, Animated, Easing } from 'react-native';
import { useTranslation } from 'react-i18next';
import { H4, BaseText } from '../commons/Text';
import { useTheme } from '../ThemeProvider';
import { assets } from '../../assets/assets';
import { useSoundPlayer } from '../../hooks/useSoundPlayer';

interface FinishScreenPopupProps {
  round: number;
  visible: boolean;
}

const FinishScreenPopup: React.FC<FinishScreenPopupProps> = ({ round, visible }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const playSound = useSoundPlayer();

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const playVictory = async () => {
      await playSound("victory");
    };

    if (visible) {
      playVictory();
    }
  }, [visible]);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();

    return () => pulse.stop();
  }, [scaleAnim]);
  
  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    popup: {
      backgroundColor: colors.background,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      width: '80%',
      maxWidth: 300,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 5,
      gap: 20
    },
    image: {
      width: 150,
      height: 150,
      resizeMode: "contain"
    },
  });

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <H4>{t('popup.gameFinished')}</H4>
          <Animated.Image
            source={assets.png.finish}
            style={[
              styles.image,
              { transform: [{ scale: scaleAnim }] },
            ]}
          />
          <BaseText>
            {t('popup.roundsReached', 'You reached round')} {round}
          </BaseText>
        </View>
      </View>
    </Modal>
  );
};

export default FinishScreenPopup;
