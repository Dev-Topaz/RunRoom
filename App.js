import React from 'react';
import { useFonts } from 'expo-font';
import { useAssets } from 'expo-asset';
import { Provider } from 'react-redux';
import global from './global';
import configureStore from './store/configureStore';
import Splash from './screens/splash';
import AppNavigator from './components/distancePicker';

const store = configureStore()

export default function App() {

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
  ]);

  if(!fontsLoaded || !imagesLoaded)
    return (<Splash/>);

  return (
    <Provider store = { store }>
      <AppNavigator/>
    </Provider>
  );
}