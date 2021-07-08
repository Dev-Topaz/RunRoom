import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Splash from '../screens/splash';
import Lobby from '../screens/run/lobby'

export default createAppContainer(
    createSwitchNavigator(
        {
            Lobby: { screen: Lobby },
            RunPrepare: { screen: Splash },
            Race: { screen: Splash }
        },
        {
            initialRouteName: 'Lobby',
            headerMode: 'none',
        }
    )
);