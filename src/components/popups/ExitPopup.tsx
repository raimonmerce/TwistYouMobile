import React from 'react';
import { Modal, View, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import ButtonBase from '../commons/ButtonBase';
import { BaseText } from '../commons/Text';
import { useTheme } from '../ThemeProvider';
import { assets } from '../../assets/assets';

interface ExitPopupProps {
  onConfirm: () => void;
  onCancel: () => void;
  visible: boolean;
}

const ExitPopup: React.FC<ExitPopupProps> = ({ onConfirm, onCancel, visible }) => {
  const { t } = useTranslation();

  const { colors } = useTheme();
  
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
    },
    image: {
      width: 150,
      height: 150,
      resizeMode: "contain",
      marginTop: 20
    },
    message: {
      fontSize: 16,
      marginBottom: 20,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 20
    },
  });

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <BaseText>{t('popup.confirmExit', 'Seguro que quieres salir del juego?')}</BaseText>
          <Image source={assets.png.exit} style={styles.image} />
          <View style={styles.container}>
            <ButtonBase text={t('popup.exit', 'Salir')} onPress={onConfirm} />
            <ButtonBase text={t('popup.cancel', 'Cancelar')} onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ExitPopup;
