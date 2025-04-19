import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useGameState } from './src/hooks/useGameState';
import { useExitHandler } from './src/hooks/useExitHandler';

import Header from './src/components/Header';
import Content from './src/components/Content';
import Footer from './src/components/Footer';
import ButtonHeader from './src/components/commons/ButtonHeader';
import ButtonFooter from './src/components/commons/ButtonFooter';
import Landing from './src/components/pages/Landing';
import Game from './src/components/pages/Game';
import Main from './src/components/pages/Main';
import Players from './src/components/pages/Players';
import Settings from './src/components/pages/Settings';
import ExitPopup from './src/components/popups/ExitPopup';
import FinishScreenPopup from './src/components/popups/FinishScreenPopup';

import { assets } from './src/assets/assets';

function App() {
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

  // const contentPage = 'players';
  // const handleTest = (a: string) => {
  //   console.log("Test", a)
  // };


  return (
    <>
      {/* <Header>
        {(contentPage === 'players' || contentPage === 'settings') && (
          <View style={styles.left}>
            <ButtonHeader onPress={() => handleTest('main')}>
              <Image source={assets.png.back} style={styles.icon} resizeMode="contain"/>
            </ButtonHeader>
          </View>
        )}
        {contentPage === 'main' && (
          <View style={styles.left}>
            <ButtonHeader onPress={() => handleTest('landing')}>
              <Image source={assets.png.back} style={styles.icon} />
            </ButtonHeader>
          </View>
        )}

        <Text style={styles.title}>TwistYou</Text>

        {contentPage === 'main' && (
          <View style={styles.right}>
            <ButtonHeader onPress={() => handleTest('settings')}>
              <Image source={assets.png.settings} style={styles.icon} />
            </ButtonHeader>
          </View>
        )}
        {contentPage === 'game' && (
          <View style={styles.right}>
            <ButtonHeader onPress={() => handleTest('settings')}>
              <Image source={assets.png.close} style={styles.icon} />
            </ButtonHeader>
          </View>
        )}
      </Header> */}
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

            <Text style={styles.title}>TwistYou</Text>

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
              <ButtonFooter text={t('footer.players', 'Jugar')} onPress={handlePlay} />
            )}
            {contentPage === 'players' && (
              <ButtonFooter text={t('footer.start', 'Empezar')} onPress={handleStartGame} />
            )}
            {contentPage === 'game' && (
              <>
                <ButtonFooter text={t('footer.spin', 'Girar')} onPress={handleSpin} />
                <ButtonFooter text={t('footer.impossible', 'Imposible')} onPress={handleImpossible} />
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
    fontSize: 32, // Adjust to match --font-size-h1 in React Native
    fontFamily: 'Fredoka', // Assuming you are loading this font
    color: '#b14141', // --color-primary
    marginVertical: 0,
    marginHorizontal: 0,
  },
  icon: {
    width: 32,
    height: 32,
    filter: 'invert(40%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%)', // React Native does not support filter
  },
});