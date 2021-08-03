import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Lobby from '../screens/run/lobby';
import RunPrepare from '../screens/run/prepare';
import Running from '../screens/run/run';
import Result from '../screens/profile/result';

export default createAppContainer(
    createSwitchNavigator(
        {
            Lobby: { screen: Lobby },
            RunPrepare: { screen: RunPrepare },
            Running: { screen: Running },
            Result: { screen: Result },
        },
        {
            initialRouteName: 'Lobby',
            headerMode: 'none',
        }
    )
);