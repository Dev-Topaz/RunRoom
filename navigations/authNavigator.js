import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MobileInput from '../screens/auth/mobile';
import Verification from '../screens/auth/verify';
import Username from '../screens/auth/username';
import LocationPermission from '../screens/auth/allow';

export default createAppContainer(
    createStackNavigator(
        {
            PhoneNumber: { screen: MobileInput },
            Verify: { screen: Verification },
            UserName: { screen: Username },
            LocationPermission: { screen: LocationPermission }
        },
        {
            initialRouteName: 'PhoneNumber',
            headerMode: 'none',
        }
    )
);