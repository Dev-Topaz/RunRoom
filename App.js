import React, { useState, useEffect } from 'react';
import { AppState } from 'react-native';
import { useFonts } from 'expo-font';
import { useAssets } from 'expo-asset';
import { Provider } from 'react-redux';
import global from './global';
import configureStore from './store/configureStore';
import Splash from './screens/splash';
import AppNavigator from './navigations/appNavigator';

const store = configureStore()

export default function App() {

  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    
    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if(appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground');
    } else {
      console.log('App has come to the background');
    }

    setAppState(nextAppState);
  }

  const [fontsLoaded] = useFonts({
    FuturaT: global.FONT.FUTURA,
    SFProRegular: global.FONT.SFProRegular,
    SFProMedium: global.FONT.SFProMedium,
    SFProBold: global.FONT.SFProBold,
  });

  const [imagesLoaded] = useAssets([
    global.IMAGE.STOCK.STOCK_1,
    global.IMAGE.STOCK.STOCK_2,
    global.IMAGE.STOCK.STOCK_3,
    global.IMAGE.STOCK.STOCK_4,
    global.IMAGE.STOCK.STOCK_5,
    global.IMAGE.STOCK.STOCK_6,
    global.IMAGE.STOCK.STOCK_7,
    global.IMAGE.STOCK.STOCK_8,
    global.IMAGE.STOCK.STOCK_9,
    global.IMAGE.STOCK.STOCK_10,
    global.IMAGE.STOCK.STOCK_11,
    global.IMAGE.STOCK.STOCK_12,
    global.IMAGE.STOCK.STOCK_13,
    global.IMAGE.STOCK.STOCK_14,
    global.IMAGE.STOCK.STOCK_15,
    global.IMAGE.STOCK.STOCK_16,
    global.IMAGE.STOCK.STOCK_17,
    global.IMAGE.STOCK.STOCK_18,
    global.IMAGE.STOCK.STOCK_19,
    global.IMAGE.UNKNOWN,
  ]);

  if(!fontsLoaded || !imagesLoaded)
    return (<Splash/>);

  return (
    <Provider store = { store }>
      <AppNavigator/>
    </Provider>
  );
}