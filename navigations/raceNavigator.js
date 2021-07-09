import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Lobby from '../screens/run/lobby';
import RunPrepare from '../screens/run/prepare';
import Running from '../screens/run/run';

export default createAppContainer(
    createSwitchNavigator(
        {
            Lobby: { screen: Lobby },
            RunPrepare: { screen: RunPrepare },
            Running: { screen: Running }
        },
        {
            initialRouteName: 'Lobby',
            headerMode: 'none',
        }
    )
);