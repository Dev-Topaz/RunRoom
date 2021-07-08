import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Splash from '../screens/splash';
import Lobby from '../screens/run/lobby';
import RunPrepare from '../screens/run/prepare';

export default createAppContainer(
    createSwitchNavigator(
        {
            Lobby: { screen: Lobby },
            RunPrepare: { screen: RunPrepare },
            Running: { screen: Splash }
        },
        {
            initialRouteName: 'Lobby',
            headerMode: 'none',
        }
    )
);