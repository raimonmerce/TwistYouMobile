import React, { useEffect, useRef } from 'react';
import { Image, Modal, View, StyleSheet, Animated, Easing, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { H4, BaseText } from '../commons/Text';
import { useTheme } from '../ThemeProvider';
import { assets } from '../../assets/assets';
import { useSoundPlayer } from '../../hooks/useSoundPlayer';
import ButtonHeader from '../commons/ButtonHeader';

import { AppOpenAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

interface FinishScreenPopupProps {
  round: number;
  onClose: () => void;
  visible: boolean;
}

const FinishScreenPopup: React.FC<FinishScreenPopupProps> = ({ round, onClose, visible }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const playSound = useSoundPlayer();

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const adUnitId = __DEV__
      ? TestIds.APP_OPEN
      : 'ca-app-pub-5341979570890330/2010509293';

    const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
      keywords: ['fashion', 'clothing'],
    });

    const unsubscribeLoaded = appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
      appOpenAd.show();
    });

    const unsubscribeError = appOpenAd.addAdEventListener(AdEventType.ERROR, (error) => {
      console.log('AppOpenAd error:', error);
    });

    appOpenAd.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeError();
    };
  }, []);

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
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10 
    },
    icon: {
      width: 24,
      height: 24,
      filter: 'invert(40%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%)'
    },
  });

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable onPress={() => {}} style={styles.popup}>
          <View style={styles.closeButton}>
            <ButtonHeader onPress={onClose}>
              <Image source={assets.png.icons.close} style={styles.icon}/>
            </ButtonHeader>
          </View>
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
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default FinishScreenPopup;
