import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, Image, StyleSheet, Dimensions } from "react-native";
import AnimatedCharacter from './AnimatedCharacter';
import { useTranslation } from 'react-i18next';
import CameraCapture from '../commons/CameraButton';
import { H2, H3, H4 } from '../commons/Text';
import { useTheme } from '../ThemeProvider';
import { Task } from "../../types";

interface GameProps {
  currentPlayer: string;
  currentTask: Task;
  round: number;
}

const Game: React.FC<GameProps> = ({ currentPlayer, currentTask, round }) => {
  const { t } = useTranslation();

  const screenHeight = Dimensions.get("window").height;

  const mt1 = t('game.masterTasks.mt1');
  const mt2 = t('game.masterTasks.mt2');

  if (!mt1 || !mt2) return null; 

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginTop: 64,
      alignItems: 'center',
      margin: 32
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

  return (
    <View style={styles.container}>
      <H3>{t('game.round', 'Round')} {round}</H3>
      <H2 style={styles.playerText}>{currentPlayer}</H2>
      <H4 style={styles.turnText}>{currentTask.text}</H4>

      {currentTask.text === mt1 && <CameraCapture captureMode="environment" />}
      {currentTask.text === mt2 && <CameraCapture captureMode="user" />}
      <AnimatedCharacter triggerKey={currentTask.text} />
    </View>
  );
};

export default Game;
