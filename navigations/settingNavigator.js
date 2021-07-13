import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import InviteFriends from '../screens/setting/invite';
import Feedback from '../screens/setting/feedback';

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