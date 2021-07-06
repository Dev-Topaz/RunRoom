import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Pressable, Alert, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import global from '../../global';
import css from '../../css';

import { useSelector } from 'react-redux';
import { getUserDetails } from '../../utils/api';

const TopTab = createMaterialTopTabNavigator();

const Profile = (props) => {

    const userId = useSelector(state => state.user.userId);
    const accessToken = useSelector(state => state.user.accessToken);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        StatusBar.setHidden(true);
        getUserDetails(userId, accessToken).then(result => {
            if(result == null || result.userId != userId) {
                Alert.alert('You are not authorized.');
            } else {
                setUserInfo(result);
            }
        });
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <Text style={[css.titleText, { color: global.COLOR.PRIMARY100, marginBottom: 10 }]}>PROFILE</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={userInfo.avatar == null ? global.IMAGE.UNKNOWN : { uri: userInfo.avatar }} style={css.hostAvatar}/>
                    <View style={[css.hostInfo, { justifyContent: 'center' }]}>
                        <Text style={[css.hostName, { color: global.COLOR.PRIMARY100 }]}>{userInfo.firstName + ' ' + userInfo.lastName}</Text>
                        <Text style={[css.hostLabel, { marginTop: 2 }]}>{userInfo.phoneNumber}</Text>
                    </View>
                    <Pressable style={[css.inviteButton, { backgroundColor: global.COLOR.BACKGROUND }]}>
                        <Text style={css.inviteButtonText}>Edit Profile</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <NavigationContainer>
                    <TopTab.Navigator
                        initialRouteName='ProfileFinished'
                        tabBarOptions={{
                            activeTintColor: global.COLOR.PRIMARY100,
                            inactiveTintColor: global.COLOR.PRIMARY70,
                            labelStyle: styles.tabText,
                            style: { backgroundColor: 'white', paddingVertical: 14 },
                            indicatorStyle: { color: global.COLOR.PRIMARY100 }
                        }}
                        backBehavior='none'
                    >
                        <TopTab.Screen
                            name='ProfileFinished'
                            component={ProfileFinished}
                            options={{ tabBarLabel: 'Finished Runs' }}
                        />
                        <TopTab.Screen
                            name='ProfileStatistics'
                            component={ProfileStatistics}
                            options={{ tabBarLabel: 'Statistics' }}
                        />
                        <TopTab.Screen
                            name='ProfileConnection'
                            component={ProfileConnection}
                            options={{ tabBarLabel: 'Connections' }}
                        />
                    </TopTab.Navigator>
                </NavigationContainer>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: global.CONSTANTS.SPACE_55,
        paddingHorizontal: global.CONSTANTS.SIZE_20,
        paddingBottom: 12,
    },
    tabText: {
        fontFamily: 'SFProMedium',
        fontSize: 14,
        textTransform: 'none',
    },
});

export default Profile;