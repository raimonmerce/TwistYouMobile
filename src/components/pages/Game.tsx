import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import CameraCapture from '../commons/CameraButton';

interface GameProps {
  currentPlayer: string;
  currentTurn: string;
  round: number;
}

const Game: React.FC<GameProps> = ({ currentPlayer, currentTurn, round }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.roundText}>{t('game.round', 'Round')} {round}</Text>
      <Text style={styles.playerText}>{currentPlayer}</Text>
      <Text style={styles.turnText}>{currentTurn}</Text>

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
    // flex: 1,
    // marginTop: 64, // Adjusted to match the top: 4em in CSS
    // alignItems: 'center',
    // justifyContent: 'center',
    // margin: 32,
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
