import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from "react-native";
import AnimatedCharacter from '../animations/AnimatedCharacter';
import { useTranslation } from 'react-i18next';
import CameraCapture from '../commons/CameraButton';
import { H2, H3, H4 } from '../commons/Text';
import { Task } from "../../types";

interface GameProps {
  nextPlayer: string;
  nextTask: Task | null;
  nextRound: number | null;
}

const Game: React.FC<GameProps> = ({ nextPlayer, nextTask, nextRound }) => {
  if (!nextTask) return;

  const { t } = useTranslation();
  const [currentRound, setCurrentRound] = useState<number | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const mt1 = t('game.masterTasks.mt1');
  const mt2 = t('game.masterTasks.mt2');

  if (!mt1 || !mt2) return null; 

  const fadeRound = useRef(new Animated.Value(1)).current;
  const fadePlayer = useRef(new Animated.Value(1)).current;
  const fadeTask = useRef(new Animated.Value(1)).current;

  const transRound = useRef(new Animated.Value(0)).current;
  const transPlayer = useRef(new Animated.Value(0)).current;
  const transTask = useRef(new Animated.Value(0)).current;

  const animateSwap = (
    fadeVal: Animated.Value,
    transVal: Animated.Value,
    setState: (val: any) => void,
    newValue: any
  ) => {
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
    ]).start(() => {
      setState(newValue);

      transVal.setValue(50);
      fadeVal.setValue(0);

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
      ]).start();
    });
  };

  useEffect(() => {
    if (nextRound !== null && nextRound !== currentRound) {
      animateSwap(fadeRound, transRound, setCurrentRound, nextRound);
    }
  }, [nextRound]);

  useEffect(() => {
    if (nextPlayer !== currentPlayer) {
      animateSwap(fadePlayer, transPlayer, setCurrentPlayer, nextPlayer);
    }
  }, [nextPlayer]);

  useEffect(() => {
    if (nextTask && nextTask !== currentTask) {
      animateSwap(fadeTask, transTask, setCurrentTask, nextTask);
    }
  }, [nextTask]);

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
    <View pointerEvents="none" style={styles.container}>
      <AnimatedCharacter newTask={nextTask} />

      {/* Round */}
      <Animated.View
        style={{
          opacity: fadeRound,
          transform: [{ translateX: transRound }],
          alignItems: "center",
        }}
      >
        {currentRound && (<H3>{t('game.round', 'Round')} {currentRound}</H3>)}
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
        <H4 style={styles.turnText}>{currentTask?.text}</H4>

        {currentTask?.text === mt1 && <CameraCapture captureMode="environment" />}
        {currentTask?.text === mt2 && <CameraCapture captureMode="user" />}
      </Animated.View>
    </View>
  );
};

export default Game;
