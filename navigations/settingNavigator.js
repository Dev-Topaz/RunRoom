import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import InviteFriends from '../screens/setting/invite';
import Feedback from '../screens/setting/feedback';
import Contact from '../screens/setting/contact';

export default createAppContainer(
    createSwitchNavigator(
        {
            InviteFriend: { screen: InviteFriends },
            Feedback: { screen: Feedback },
            Contact: { screen: Contact },
        },
        {
            initialRouteName: 'InviteFriend',
            headerMode: 'none',
        }
    )
);