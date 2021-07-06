import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Splash from '../screens/splash';

export default createAppContainer(
    createSwitchNavigator(
        {
            InviteFriend: { screen: Splash },
            Feedback: { screen: Splash },
        },
        {
            initialRouteName: 'InviteFriend',
            headerMode: 'none',
        }
    )
);