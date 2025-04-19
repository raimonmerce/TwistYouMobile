import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Turn from "../components/pages/Turn";
import { GameSettings, Page } from "../types";

export const useGameState = () => {
    const { t } = useTranslation();
    const [contentPage, setContentPage] = useState<Page>("landing");
    const [players, setPlayers] = useState<string[]>([]);
    const [numberPlayers, setNumberPlayers] = useState(4);
    const [settings, setSettings] = useState<GameSettings>({
        colorMode: false,
        alcoholMode: false,
        extremoMode: false,
        masterMode: false,
    });
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [currentTurn, setCurrentTurn] = useState("");
    const [turn, setTurn] = useState<Turn | null>(null);
    const [round, setRound] = useState(1);

    const getTurn = (player: string, turn: Turn | null) => {
        if (!turn) return "";
        return turn.generateText(player);
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
        setCurrentTurn(getTurn(newPlayers[0], turnTmp));
    };

    useEffect(() => {
        if (round === 1 && currentPlayerIndex === 0 && turn && currentTurn) {
          setContentPage("game");
        }
      }, [round, turn, currentPlayerIndex, currentTurn]);
      

    const handleSpin = () => {
        const nextIndex = (currentPlayerIndex + 1) % players.length;
        if (nextIndex === 0) setRound(round + 1);
        const playerName = players[nextIndex];
        setCurrentPlayerIndex(nextIndex);
        setCurrentTurn(getTurn(playerName, turn));
    };

    const handleImpossible = () => {
        setCurrentTurn(getTurn(players[currentPlayerIndex], turn));
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
    currentTurn,
    round,
    handlePlay,
    handleStartGame,
    handleSpin,
    handleImpossible,
    handleGoToPage
  };
};
