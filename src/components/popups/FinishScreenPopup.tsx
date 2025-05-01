import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { H4, BaseText } from '../commons/Text';
import { Colors } from '../../../styles/theme';
interface FinishScreenPopupProps {
  round: number;
  visible: boolean;
}

const FinishScreenPopup: React.FC<FinishScreenPopupProps> = ({ round, visible }) => {
  const { t } = useTranslation();

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <H4>{t('popup.gameFinished')}</H4>
          <BaseText>
            {t('popup.roundsReached', 'You reached round')} {round}
          </BaseText>
        </View>
      </View>
    </Modal>
  );
};

export default FinishScreenPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  popup: {
    backgroundColor: Colors.background,
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
  }
});
