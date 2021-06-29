import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import NavigationService from '../utils/navigationService';

import AuthNavigator from './authNavigator';
import MainNavigator from './mainNavigator';

const TopLevelNavigator = createSwitchNavigator(
    {
        Auth: AuthNavigator,
        Main: MainNavigator,
    },
    {
        initialRouteName: 'Auth',
    }
);

const AppContainer = createAppContainer(TopLevelNavigator);

export default function AppNavigator() {
    return (
        <AppContainer ref={(navigatorRef) => { NavigationService.setTopLevelNavigator(navigatorRef); }}/>
    );
}