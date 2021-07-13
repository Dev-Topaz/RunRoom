import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import InviteFriends from '../screens/setting/invite';
import Feedback from '../screens/splash';

export default createAppContainer(
    createSwitchNavigator(
        {
            InviteFriend: { screen: InviteFriends },
            Feedback: { screen: Feedback },
        },
        {
            initialRouteName: 'InviteFriend',
            headerMode: 'none',
        }
    )
);