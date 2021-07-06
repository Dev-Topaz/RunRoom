import { createAppContainer, createSwitchNavigator } from 'react-navigation';

export default createAppContainer(
    createSwitchNavigator(
        {
            InviteFriend: {},
            Feedback: {},
        },
        {
            initialRouteName: 'InviteFriend',
            headerMode: 'none',
        }
    )
);