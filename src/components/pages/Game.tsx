import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import CameraCapture from '../commons/CameraButton';
import { H2, H3, H4 } from '../commons/Text';
import { Colors } from '../../../styles/theme';
interface GameProps {
  currentPlayer: string;
  currentTurn: string;
  round: number;
}

const Game: React.FC<GameProps> = ({ currentPlayer, currentTurn, round }) => {
  const { t } = useTranslation();

  const mt1 = t('game.masterTasks.mt1');
  const mt2 = t('game.masterTasks.mt2');

  if (!mt1 || !mt2) return null; 

  return (
    <View style={styles.container}>
      <H3>{t('game.round', 'Round')} {round}</H3>
      <H2 style={styles.playerText}>{currentPlayer}</H2>
      <H4 style={styles.turnText}>{currentTurn}</H4>

      {currentTurn === mt1 && <CameraCapture captureMode="environment" />}
      {currentTurn === mt2 && <CameraCapture captureMode="user" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    alignItems: 'center',
    margin: 32,
    backgroundColor: Colors.background
  },
  playerText: {
    marginTop: 16,
    textAlign: 'center'
  },
  turnText: {
    marginTop: 64,
    textAlign: 'center'
  },
});

export default Game;
