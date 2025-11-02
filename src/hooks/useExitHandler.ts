import { useEffect, useState, useCallback, useRef } from "react";
import { Page } from "../types";
import { AppOpenAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

export const useExitHandler = (setContentPage: (page: Page) => void) => {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showFinishScreen, setShowFinishScreen] = useState(false);
  const [showAddScreen, setShowAddScreen] = useState(false);
  const [isAddLoaded, setIsAddLoaded] = useState(false);
  const [hasAddError, setHasAddError] = useState(false);

  const adUnitId = __DEV__
    ? TestIds.APP_OPEN
    : 'ca-app-pub-5341979570890330/2010509293';

  const appOpenAdRef = useRef<AppOpenAd | null>(null);
  const isLoadedRef = useRef(false);
  const isShowingRef = { current: false };

  if (!appOpenAdRef.current) {
    appOpenAdRef.current = AppOpenAd.createForAdRequest(adUnitId, {
      keywords: ['fashion', 'clothing'],
    });
  }

  const handleExitClick = () => {
    console.log("handleExitClick")
    setShowExitPopup(true);
    loadAd();
  };

  const handleCancelExitGame = () => setShowExitPopup(false);

  const handleExitGame = () => {
    console.log("showAd")
    setShowExitPopup(false);
    setContentPage("landing");
    showAd();
  };

  const handleCloseFinishScreen = () => {
    console.log("handleCloseFinishScreen")
    setShowFinishScreen(false)
  };

  useEffect(() => {
    const ad = appOpenAdRef.current!;
    const onLoaded = () => {
      console.log("onLoaded")
      if (isShowingRef.current) {
        return;
      }
      isLoadedRef.current = true;
      setIsAddLoaded(true);
    };
    const onError = (error: any) => {
      console.log("onError")
      console.warn('AppOpenAd error:', error);
      setHasAddError(true);
    };
    const onClosed = () => {
      console.log("onClosed")
      setShowAddScreen(false);
      setShowFinishScreen(true)
      isLoadedRef.current = false;
      isShowingRef.current = false;
    };

    const subs = [
      ad.addAdEventListener(AdEventType.LOADED, onLoaded),
      ad.addAdEventListener(AdEventType.ERROR, onError),
      ad.addAdEventListener(AdEventType.CLOSED, onClosed),
    ];

    return () => subs.forEach((unsub) => unsub());
  }, []);

  const loadAd = useCallback(() => {
    console.log("loadAd")
    const ad = appOpenAdRef.current!;
    setHasAddError(false);
    ad.load();
  }, []);

  const showAd = useCallback(() => {
    console.log("showAd")
    const ad = appOpenAdRef.current!;
    if (hasAddError) {

      setHasAddError(false);
      setShowFinishScreen(true)
      return;
    }
    if (isLoadedRef.current && isAddLoaded && !showAddScreen) {
      isShowingRef.current = true
      ad.show();
      setShowAddScreen(true);
    }
  }, [isAddLoaded]);

  return {
    showExitPopup,
    handleExitClick,
    handleCancelExitGame,
    handleExitGame,
    showFinishScreen,
    handleCloseFinishScreen
  };
};
