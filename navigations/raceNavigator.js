import { createAppContainer, createSwitchNavigator } from 'react-navigation';

export default createAppContainer(
    createSwitchNavigator(
        {
            Lobby: {},
            RunPrepare: {},
            Race: {}
        },
        {
            initialRouteName: 'Lobby',
            headerMode: 'none',
        }
    )
);