import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Splash from '../screens/splash';

export default createAppContainer(
    createSwitchNavigator(
        {
            Lobby: { screen: Splash },
            RunPrepare: { screen: Splash },
            Race: { screen: Splash }
        },
        {
            initialRouteName: 'Lobby',
            headerMode: 'none',
        }
    )
);