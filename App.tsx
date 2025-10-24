import React from 'react';
import './i18n/i18n'; 
import Main from './src/components/Main';
import * as Font from 'expo-font';
import { ThemeProvider } from './src/components/ThemeProvider';

function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      await Font.loadAsync({
        Fredoka: require('./src/assets/fonts/Fredoka.ttf'),
        Arco: require('./src/assets/fonts/ARCO.ttf'),
        SetiaHati: require('./src/assets/fonts/SetiaHati-Regular.ttf'),
      });
      setFontsLoaded(true);
    })();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <Main/>
    </ThemeProvider>
  );
}

export default App;