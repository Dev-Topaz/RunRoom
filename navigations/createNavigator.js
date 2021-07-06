import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import RoomCreate from '../screens/room/create';
import RoomComplete from '../screens/room/complete';

export default createAppContainer(
    createSwitchNavigator(
        {
            RoomCreate: { screen: RoomCreate },
            RoomComplete: { screen: RoomComplete },
        },
        {
            initialRouteName: 'RoomCreate',
            headerMode: 'none',
        }
    )
);