import { useState, useEffect } from "react";
import { Page } from "../types";
import { POPUP_EXIT_TIMER } from "../constants";

export const useExitHandler = (setContentPage: (page: Page) => void) => {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showFinishScreen, setShowFinishScreen] = useState(false);

  const handleExitClick = () => setShowExitPopup(true);
  const handleCancelExitGame = () => setShowExitPopup(false);

  const handleExitGame = () => {
    setShowExitPopup(false);
    setShowFinishScreen(true);
    setContentPage("landing");
  };

  useEffect(() => {
    if (showFinishScreen) {
      const timer = setTimeout(() => setShowFinishScreen(false), POPUP_EXIT_TIMER);
      return () => clearTimeout(timer);
    }
  }, [showFinishScreen]);

  return {
    showExitPopup,
    handleExitClick,
    handleCancelExitGame,
    handleExitGame,
    showFinishScreen,
  };
};
