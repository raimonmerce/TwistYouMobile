import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import CameraCapture from '../commons/CameraButton';
import { H3, H4 } from '../commons/Text';

interface GameProps {
  currentPlayer: string;
  currentTurn: string;
  round: number;
}

const Game: React.FC<GameProps> = ({ currentPlayer, currentTurn, round }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <H4>{t('game.round', 'Round')} {round}</H4>
      <H3>{currentPlayer}</H3>
      <H4>{currentTurn}</H4>

      {currentTurn === t('game.masterTasks.mt1') && (
        <CameraCapture captureMode="environment" />
      )}
      {currentTurn === t('game.masterTasks.mt2') && (
        <CameraCapture captureMode="user" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 32,
  },
  roundText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  playerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  turnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Game;
