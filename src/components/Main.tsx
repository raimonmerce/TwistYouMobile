import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import ButtonHeader from './commons/ButtonHeader';
import ButtonBase from './commons/ButtonBase';
import { assets } from '../assets/assets';
import { H2 } from './commons/Text';
import { View, Image, StyleSheet, BackHandler } from 'react-native';
import { useTheme } from './ThemeProvider';
import { useEffect } from 'react';
import Game from './pages/Game';
import HomeScreen from './pages/HomeScreen';
import Players from './pages/Players';
import Settings from './pages/Settings';
import { useGameState } from '../hooks/useGameState';
import { useExitHandler } from '../hooks/useExitHandler';
import { useTranslation } from 'react-i18next';
import Landing from './pages/Landing';
import ExitPopup from './popups/ExitPopup';
import FinishScreenPopup from './popups/FinishScreenPopup';

interface MainProps {

}

const Main: React.FC<MainProps> = ({}) => {

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
        currentTask,
        round,
        handlePlay,
        handleStartGame,
        handleSpin,
        handleImpossible,
        handleGoToPage
    } = useGameState();

    const { showExitPopup, handleExitClick, handleCancelExitGame, handleExitGame, showFinishScreen } = useExitHandler(setContentPage);
    
    const { t } = useTranslation();

    const renderContent = () => {
        switch (contentPage) {
            case "main":
            return <HomeScreen setNumberPlayers={setNumberPlayers} numberPlayers={numberPlayers} settings={settings} setSettings={setSettings} />;
            case "players":
            return <Players players={players} setPlayers={setPlayers} />;
            case "game":
            return <Game currentPlayer={players[currentPlayerIndex]} currentTask={currentTask} round={round} />;
            case "settings":
            return <Settings settings={settings} setSettings={setSettings}/>;
            default:
            return null;
        }
    };

    const { colors } = useTheme();

    useEffect(() => {
        const backAction = () => {
            if (contentPage === 'landing') return true;
            if (contentPage === 'players' || contentPage === 'settings') handleGoToPage('main');
            else if(contentPage === 'main') handleGoToPage('landing');
            else if (contentPage === 'game') handleExitClick();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [contentPage, handleExitClick]);

    const styles = StyleSheet.create({
        main: {
            height: '100%',
            width: '100%',
            backgroundColor: colors.background
        },
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
            marginTop: 50,
            marginHorizontal: 0,
        },
        icon: {
            width: 32,
            height: 32,
            filter: 'invert(40%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%)'
        },
    });

    return(
        <>
            {contentPage === 'landing' ? (
                <Landing setContentPage={setContentPage} />
            ) : (
                <View style={styles.main}>
                    <Header>
                    {(contentPage === 'players' || contentPage === 'settings') && (
                        <View style={styles.left}>
                        <ButtonHeader onPress={() => handleGoToPage('main')}>
                            <Image source={assets.png.icons.back} style={styles.icon} />
                        </ButtonHeader>
                        </View>
                    )}
                    {contentPage === 'main' && (
                        <View style={styles.left}>
                        <ButtonHeader onPress={() => handleGoToPage('landing')}>
                            <Image source={assets.png.icons.back} style={styles.icon} />
                        </ButtonHeader>
                        </View>
                    )}
                    <View style={styles.title}>
                        <H2>TwistYou</H2>
                    </View>

                    {contentPage === 'main' && (
                        <View style={styles.right}>
                        <ButtonHeader onPress={() => handleGoToPage('settings')}>
                            <Image source={assets.png.icons.settings} style={styles.icon} />
                        </ButtonHeader>
                        </View>
                    )}
                    {contentPage === 'game' && (
                        <View style={styles.right}>
                        <ButtonHeader onPress={handleExitClick}>
                            <Image source={assets.png.icons.close} style={styles.icon} />
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
                </View>
            )}
            
            {showExitPopup && <ExitPopup onConfirm={handleExitGame} onCancel={handleCancelExitGame} visible={showExitPopup}/>}
            {showFinishScreen && <FinishScreenPopup round={round} visible={showFinishScreen}/>}
        </>
    );
};

export default Main;