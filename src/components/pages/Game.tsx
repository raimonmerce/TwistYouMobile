import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from "react-native";
import AnimatedCharacter from '../animations/AnimatedCharacter';
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

  const mt1 = t('game.masterTasks.mt1');
  const mt2 = t('game.masterTasks.mt2');

  if (!mt1 || !mt2) return null; 

  const fadeRound = useRef(new Animated.Value(1)).current;
  const fadePlayer = useRef(new Animated.Value(1)).current;
  const fadeTask = useRef(new Animated.Value(1)).current;

  const transRound = useRef(new Animated.Value(0)).current;
  const transPlayer = useRef(new Animated.Value(0)).current;
  const transTask = useRef(new Animated.Value(0)).current;

  const animate = (fadeVal: Animated.Value, transVal: Animated.Value) => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeVal, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(transVal, {
          toValue: -50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(transVal, {
          toValue: 50,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(fadeVal, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeVal, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(transVal, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  useEffect(() => {
    animate(fadeRound, transRound);
  }, [round]);

  useEffect(() => {
    animate(fadePlayer, transPlayer);
  }, [currentPlayer]);

  useEffect(() => {
    animate(fadeTask, transTask);
  }, [currentTask]);

  const styles = StyleSheet.create({
    container: {
      marginTop: 64,
      alignItems: 'center',
      margin: 32,
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
      <AnimatedCharacter newTask={currentTask} />

      {/* Round */}
      <Animated.View
        style={{
          opacity: fadeRound,
          transform: [{ translateX: transRound }],
          alignItems: "center",
        }}
      >
        <H3>{t('game.round', 'Round')} {round}</H3>
      </Animated.View>

      {/* Player */}
      <Animated.View
        style={{
          opacity: fadePlayer,
          transform: [{ translateX: transPlayer }],
          alignItems: "center",
        }}
      >
        <H2 style={styles.playerText}>{currentPlayer}</H2>
      </Animated.View>

      {/* Task */}
      <Animated.View
        style={{
          opacity: fadeTask,
          transform: [{ translateX: transTask }],
          alignItems: "center",
        }}
      >
        <H4 style={styles.turnText}>{currentTask.text}</H4>

        {currentTask.text === mt1 && <CameraCapture captureMode="environment" />}
        {currentTask.text === mt2 && <CameraCapture captureMode="user" />}
      </Animated.View>
    </View>
  );
};

export default Game;
