import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import NavigationService from '../utils/navigationService';

import AuthNavigator from './authNavigator';
import MainNavigator from './mainNavigator';
import CreateNavigator from './createNavigator';
import SettingNavigator from './settingNavigator';
import RaceNavigator from './raceNavigator';

const TopLevelNavigator = createSwitchNavigator(
    {
        Auth: AuthNavigator,
        Main: MainNavigator,
        Create: CreateNavigator,
        AppSetting: SettingNavigator,
        Race: RaceNavigator,
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
