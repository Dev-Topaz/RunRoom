import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import InviteFriends from '../screens/setting/invite';
import Feedback from '../screens/setting/feedback';
import Contact from '../screens/setting/contact';
import PrivacyPolicy from '../screens/setting/policy';
import TermsAndConditions from '../screens/setting/term';

export default createAppContainer(
    createSwitchNavigator(
        {
            InviteFriend: { screen: InviteFriends },
            Feedback: { screen: Feedback },
            Contact: { screen: Contact },
            PrivacyPolicy: { screen: PrivacyPolicy },
            TermsAndConditions: { screen: TermsAndConditions },
        },
        {
            initialRouteName: 'InviteFriend',
            headerMode: 'none',
        }
    )
);