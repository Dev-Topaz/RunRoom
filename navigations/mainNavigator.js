import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';
import global from '../global';

import Splash from '../screens/splash';
import RoomMain from '../screens/room/main';
import RunMain from '../screens/run/main';
import Profile from '../screens/profile/profile';
import EditProfile from '../screens/profile/edit';

export default createAppContainer(
    createMaterialBottomTabNavigator(
        {
            Room: createSwitchNavigator(
                {
                    RoomMain: { screen: RoomMain },
                },
                {
                    initialRouteName: 'RoomMain',
                    headerMode: 'none',
                    navigationOptions: {
                        tabBarLabel: 'RunRooms',
                        tabBarIcon: ({ tintColor }) => (
                            <Icon
                                name='home-outline'
                                type='material-community'
                                size={24}
                                color={tintColor}
                                iconStyle={{ width: 24 }}
                            />
                        ),
                    },
                }
            ),
            Run: createSwitchNavigator(
                {
                    RunMain: { screen: RunMain },
                },
                {
                    initialRouteName: 'RunMain',
                    headerMode: 'none',
                    navigationOptions: {
                        tabBarLabel: 'My Runs',
                        tabBarIcon: ({ tintColor }) => (
                            <Icon
                                name='run'
                                type='material-community'
                                size={24}
                                color={tintColor}
                                iconStyle={{ width: 24 }}
                            />
                        ),
                    },
                }
            ),
            Account: createSwitchNavigator(
                {
                    Profile: { screen: Profile },
                    Edit: { screen: EditProfile },
                },
                {
                    initialRouteName: 'Profile',
                    headerMode: 'none',
                    navigationOptions: {
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ tintColor }) => (
                            <Icon
                                name='account-circle'
                                type='material-community'
                                size={24}
                                color={tintColor}
                                iconStyle={{ width: 24 }}
                            />
                        ),
                    },
                }
            ),
            Settings: createSwitchNavigator(
                {
                    Setting: { screen: Splash },
                },
                {
                    initialRouteName: 'Setting',
                    headerMode: 'none',
                    navigationOptions: {
                        tabBarLabel: 'Settings',
                        tabBarIcon: ({ tintColor }) => (
                            <Icon
                                name='cog-outline'
                                type='material-community'
                                size={24}
                                color={tintColor}
                                iconStyle={{ width: 24 }}
                            />
                        ),
                    },
                }
            ),
        },
        {
            initialRouteName: 'Room',
            barStyle: { backgroundColor: 'white', height: global.CONSTANTS.BOTTOM_TAB_84 },
            resetOnBlur: true,
            shifting: false,
            activeColor: global.COLOR.PRIMARY100,
            inactiveColor: global.COLOR.PRIMARY50,
        }
    )
);
