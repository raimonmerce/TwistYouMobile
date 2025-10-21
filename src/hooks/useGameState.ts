import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Turn from "../components/pages/Turn";
import { GameSettings, Page, Task } from "../types";

export const useGameState = () => {
    const { t } = useTranslation();
    const [contentPage, setContentPage] = useState<Page>("landing");
    const [players, setPlayers] = useState<string[]>([]);
    const [numberPlayers, setNumberPlayers] = useState(4);
    const [settings, setSettings] = useState<GameSettings>({
        adultMode: false,
        colorMode: false,
        alcoholMode: false,
        extremoMode: false,
        masterMode: false,
    });
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [turn, setTurn] = useState<Turn | null>(null);
    const [round, setRound] = useState(1);

    const getTask = (player: string, turn: Turn | null) => {
        if (!turn) return null;
        return turn.generateTask(player);
    };

    const handlePlay = () => {
        let updatedPlayers =
        players.length === 0
            ? Array(numberPlayers).fill("")
            : players.length > numberPlayers
            ? players.slice(0, numberPlayers)
            : [...players, ...Array(numberPlayers - players.length).fill("")];

        setPlayers(updatedPlayers);
        setContentPage("players");
    };

    const handleStartGame = () => {
        const newPlayers = players.map((player, index) =>
            player.trim() === "" ? `Player ${index + 1}` : player
        );
        if (settings.masterMode) newPlayers.push("Master")

        const turnTmp = new Turn(
            settings,
            newPlayers,
            t
        );
    
        setRound(1);
        setTurn(turnTmp);
        setPlayers(newPlayers);
        setCurrentPlayerIndex(0);
        setCurrentTask(getTask(newPlayers[0], turnTmp));
    };

    useEffect(() => {
        if (round === 1 && currentPlayerIndex === 0 && turn && currentTask) {
          setContentPage("game");
        }
      }, [round, turn, currentPlayerIndex, currentTask]);
      

    const handleSpin = () => {
        const nextIndex = (currentPlayerIndex + 1) % players.length;
        if (nextIndex === 0) setRound(round + 1);
        const playerName = players[nextIndex];
        setCurrentPlayerIndex(nextIndex);
        setCurrentTask(getTask(playerName, turn));
    };

    const handleImpossible = () => {
        setCurrentTask(getTask(players[currentPlayerIndex], turn));
    };

    const handleGoToPage = (page: Page) => {
        setContentPage(page);
    };

  return {
    contentPage,
    setContentPage,
    players,
    setPlayers,
    numberPlayers,
    setNumberPlayers,
    settings,
    setSettings,
    currentPlayerIndex,
    currentTask,
    round,
    handlePlay,
    handleStartGame,
    handleSpin,
    handleImpossible,
    handleGoToPage
  };
};
