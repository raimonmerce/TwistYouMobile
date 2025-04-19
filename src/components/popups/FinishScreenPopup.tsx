import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

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
          <Text style={styles.title}>{t('popup.gameFinished')}</Text>
          <Text style={styles.message}>
            {t('popup.roundsReached', 'You reached round')} {round}
          </Text>
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
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5, // for Android shadow
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
});
