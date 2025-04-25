import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useGameState } from './src/hooks/useGameState';
import { useExitHandler } from './src/hooks/useExitHandler';

import Header from './src/components/Header';
import Content from './src/components/Content';
import Footer from './src/components/Footer';
import ButtonHeader from './src/components/commons/ButtonHeader';
import ButtonBase from './src/components/commons/ButtonBase';
import Landing from './src/components/pages/Landing';
import Game from './src/components/pages/Game';
import Main from './src/components/pages/Main';
import Players from './src/components/pages/Players';
import Settings from './src/components/pages/Settings';
import ExitPopup from './src/components/popups/ExitPopup';
import FinishScreenPopup from './src/components/popups/FinishScreenPopup';
import * as Font from 'expo-font';
import { assets } from './src/assets/assets';
import { Colors, FontSizes, Fonts} from './styles/theme';
import { H2 } from './src/components/commons/Text';

function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const { t } = useTranslation();

  const {
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
  } = useGameState();

  const { showExitPopup, handleExitClick, handleCancelExitGame, handleExitGame, showFinishScreen } = useExitHandler(setContentPage);

  React.useEffect(() => {
    (async () => {
      await Font.loadAsync({
        Fredoka: require('./src/assets/fonts/Fredoka.ttf'),
      });
      setFontsLoaded(true);
    })();
  }, []);

  if (!fontsLoaded) return null;

  const renderContent = () => {
    switch (contentPage) {
      case "main":
        return <Main setNumberPlayers={setNumberPlayers} numberPlayers={numberPlayers} settings={settings} setSettings={setSettings} />;
      case "players":
        return <Players players={players} setPlayers={setPlayers} />;
      case "game":
        return <Game currentPlayer={players[currentPlayerIndex]} currentTurn={currentTurn} round={round} />;
      case "settings":
        return <Settings />;
      default:
        return null;
    }
  };



  return (
    <>
      {contentPage === 'landing' ? (
        <Landing setContentPage={setContentPage} />
      ) : (
        <>
          <Header>
            {(contentPage === 'players' || contentPage === 'settings') && (
              <View style={styles.left}>
                <ButtonHeader onPress={() => handleGoToPage('main')}>
                  <Image source={assets.png.back} style={styles.icon} />
                </ButtonHeader>
              </View>
            )}
            {contentPage === 'main' && (
              <View style={styles.left}>
                <ButtonHeader onPress={() => handleGoToPage('landing')}>
                  <Image source={assets.png.back} style={styles.icon} />
                </ButtonHeader>
              </View>
            )}

            <H2>TwistYou</H2>

            {contentPage === 'main' && (
              <View style={styles.right}>
                <ButtonHeader onPress={() => handleGoToPage('settings')}>
                  <Image source={assets.png.settings} style={styles.icon} />
                </ButtonHeader>
              </View>
            )}
            {contentPage === 'game' && (
              <View style={styles.right}>
                <ButtonHeader onPress={handleExitClick}>
                  <Image source={assets.png.close} style={styles.icon} />
                </ButtonHeader>
              </View>
            )}
          </Header>

          <Content>{renderContent()}</Content>

          <Footer>
            {contentPage === 'main' && (
              <ButtonBase text={t('footer.players', 'Jugar')} onPress={handlePlay} />
            )}
            {contentPage === 'players' && (
              <ButtonBase text={t('footer.start', 'Empezar')} onPress={handleStartGame} />
            )}
            {contentPage === 'game' && (
              <>
                <ButtonBase text={t('footer.impossible', 'Imposible')} onPress={handleImpossible} />
                <ButtonBase text={t('footer.spin', 'Girar')} onPress={handleSpin} />
              </>
            )}
          </Footer>
        </>
      )}

      {showExitPopup && <ExitPopup onConfirm={handleExitGame} onCancel={handleCancelExitGame} visible={showExitPopup}/>}
      {showFinishScreen && <FinishScreenPopup round={round} visible={showFinishScreen}/>}
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  left: {
    position: 'absolute',
    top: '55%',
    transform: [{ translateY: -0.5 }],
    left: 16,
  },
  right: {
    position: 'absolute',
    top: '55%',
    transform: [{ translateY: -0.5 }],
    right: 16,
  },
  title: {
    fontSize: FontSizes.h2,
    color: Colors.secondary,
    marginTop: 32,
    marginHorizontal: 0,
    fontFamily: Fonts.base
  },
  icon: {
    width: 32,
    height: 32,
    filter: 'invert(40%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%)', // React Native does not support filter
  },
});