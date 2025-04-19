import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

interface ExitPopupProps {
  onConfirm: () => void;
  onCancel: () => void;
  visible: boolean;
}

const ExitPopup: React.FC<ExitPopupProps> = ({ onConfirm, onCancel, visible }) => {
  const { t } = useTranslation();

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.message}>{t('popup.confirmExit', 'Seguro que quieres salir del juego?')}</Text>
          <View style={styles.container}>
            <Button title={t('popup.exit', 'Salir')} onPress={onConfirm} />
            <Button title={t('popup.cancel', 'Cancelar')} onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ExitPopup;

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
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
