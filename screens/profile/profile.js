import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Pressable, Alert, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import global from '../../global';
import css from '../../css';
import ProfileFinished from './finished';
import ProfileStatistics from './statistics';
import ProfileConnection from './connect';

import { useSelector } from 'react-redux';
import { getUserDetails } from '../../utils/api';

const TopTab = createMaterialTopTabNavigator();

const Profile = (props) => {

    const userId = useSelector(state => state.user.userId);
    const accessToken = useSelector(state => state.user.accessToken);
    const [userInfo, setUserInfo] = useState({
        avatar: null,
        firstName: '',
        lastName: '',
        phoneNumber: '',
    });

    useEffect(() => {
        StatusBar.setHidden(true);
        getUserDetails(userId, accessToken).then(result => {
            if(result == null || result.userId != userId) {
                Alert.alert('You are not authorized.');
            } else {
                const currentUser = {
                    avatar: result.avatar,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    phoneNumber: result.phoneNumber,
                };
                setUserInfo(currentUser);
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
                    <Pressable style={[css.inviteButton, styles.editButton]} onPress={() => props.navigation.navigate('Edit')}>
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
                            inactiveTintColor: global.COLOR.PRIMARY50,
                            labelStyle: styles.tabText,
                            style: { backgroundColor: 'white' },
                            indicatorStyle: { backgroundColor: global.COLOR.PRIMARY100 },
                        }}
                        backBehavior='none'
                    >
                        <TopTab.Screen
                            name='ProfileFinished'
                            children={() => <ProfileFinished navigation={props.navigation}/>}
                            options={{ tabBarLabel: 'Finished Runs' }}
                        />
                        <TopTab.Screen
                            name='ProfileStatistics'
                            component={ProfileStatistics}
                            options={{ tabBarLabel: 'Statistics' }}
                        />
                        <TopTab.Screen
                            name='ProfileConnection'
                            children={() => <ProfileConnection navigation={props.navigation}/>}
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
    editButton: {
        backgroundColor: global.COLOR.BACKGROUND,
        position: 'absolute',
        right: 1,
    },
});

export default Profile;