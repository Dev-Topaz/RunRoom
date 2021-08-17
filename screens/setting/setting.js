import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Pressable, Modal, Alert, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';
import css from '../../css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../utils/api';
import { userLogout, changeUnit, clickInvite } from '../../store/actions/actions';

const Setting = (props) => {

    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.user.accessToken);
    const refreshToken = useSelector(state => state.user.refreshToken);

    const [unit, setUnit] = useState(0);
    const [unitVisible, setUnitVisible] = useState(false);

    useEffect(() => {
        StatusBar.setHidden(true);
        (async() => {
            try {
                const value = await AsyncStorage.getItem('unit');
                if(value != null)
                    setUnit(parseInt(value));
            } catch(err) {
                console.log(err);
            }
        })();
    }, []);

    const pressSubmitAction = () => {
        AsyncStorage.setItem('unit', `${unit}`, err => {
            if(err) {
                console.log('An error occured.');
                throw err;
            } else {
                dispatch(changeUnit(unit));
            }
        }).catch(err => {
            console.log(err);
        });

        setUnitVisible(false);
    }

    const pressLogoutAction = () => {
        Alert.alert('Are you sure?', 'Do you really want to logout?',
        [
            {
                text: 'No',
                onPress: () => { return; }
            },
            {
                text: 'Yes',
                onPress: () => {
                    logOut(accessToken, refreshToken).then(result => {
                        if(result) {
                            dispatch(userLogout());
                            AsyncStorage.multiRemove(['userId', 'accessToken', 'refreshToken', 'phoneNumber'], (err) => {
                                if(err) {
                                    console.log('An error occured.');
                                    throw err;
                                }
                            }).catch(err => {
                                console.log(err);
                            });
                            props.navigation.navigate('Auth');
                        } else {
                            Alert.alert('ERROR', 'There is an error in logout');
                        }
                    });
                }
            },
        ]);
    }

    const pressInviteAction = () => {
        dispatch(clickInvite(null));
        props.navigation.navigate('InviteFriend');
    }

    return (
        <View style={css.bgContainer}>
            <Text style={[css.titleText, { color: global.COLOR.PRIMARY100, marginBottom: 65 }]}>SETTINGS</Text>
            <Pressable style={styles.item}>
                <Icon name='star-circle' type='material-community' size={25} color={global.COLOR.SETTING_ICON}/>
                <View style={styles.indicatorContainer}>
                    <Text style={styles.indicatorTitle}>Rate App</Text>
                    <Text style={styles.indicatorText}>In the apple store</Text>
                </View>
                <View style={{ position: 'absolute', right: 10 }}>
                    <SvgIcon icon='Forward'/>
                </View>
            </Pressable>
            <Pressable style={styles.item} onPress={() => props.navigation.navigate('Feedback')}>
                <Icon name='email' type='material-community' size={25} color={global.COLOR.SETTING_ICON}/>
                <View style={styles.indicatorContainer}>
                    <Text style={styles.indicatorTitle}>Feedback</Text>
                    <Text style={styles.indicatorText}>Share your thoughts</Text>
                </View>
                <View style={{ position: 'absolute', right: 10 }}>
                    <SvgIcon icon='Forward'/>
                </View>
            </Pressable>
            <Pressable style={styles.item} onPress={pressInviteAction}>
                <Icon name='account-plus' type='material-community' size={25} color={global.COLOR.SETTING_ICON}/>
                <View style={styles.indicatorContainer}>
                    <Text style={styles.indicatorTitle}>Invite Friends</Text>
                    <Text style={styles.indicatorText}>Send invites</Text>
                </View>
                <View style={{ position: 'absolute', right: 10 }}>
                    <SvgIcon icon='Forward'/>
                </View>
            </Pressable>
            <Pressable style={styles.item} onPress={() => setUnitVisible(true)}>
                <Icon name='run' type='material-community' size={25} color={global.COLOR.SETTING_ICON}/>
                <View style={styles.indicatorContainer}>
                    <Text style={styles.indicatorTitle}>Unit of Measurement</Text>
                    <Text style={styles.indicatorText}>{unit == 1 ? 'Miles' : 'Kilometers'}</Text>
                </View>
                <View style={{ position: 'absolute', right: 10 }}>
                    <SvgIcon icon='Forward'/>
                </View>
            </Pressable>
            <Pressable style={[styles.textItem, { marginTop: 20 }]} onPress={() => props.navigation.navigate('TermsAndConditions')}>
                <Text style={styles.indicatorTitle}>Terms of Service</Text>
            </Pressable>
            <Pressable style={styles.textItem} onPress={() => props.navigation.navigate('PrivacyPolicy')}>
                <Text style={styles.indicatorTitle}>Privacy Policy</Text>
            </Pressable>
            <Pressable style={styles.textItem} onPress={pressLogoutAction}>
                <Text style={styles.indicatorTitle}>Logout</Text>
            </Pressable>

            <Modal
                animationType='slide'
                transparent
                visible={unitVisible}
                onRequestClose={() => {}}
            >
                <View style={css.overlay}>
                    <View style={styles.modalContainer}>
                        <Text style={[css.modalTitleText, { alignSelf: 'center' }]}>Select preferred unit of measurement</Text>
                        <View style={styles.buttonGroup}>
                            <Pressable style={unit == 1 ? styles.groupActiveButton : styles.groupInactiveButton} onPress={() => setUnit(1)}>
                                <Text style={unit == 1 ? styles.activeText : styles.inactiveText}>Miles</Text>
                                { unit == 1 ? <View style={{position: 'absolute', left: 20}}><SvgIcon icon='SmallCheck'/></View> : null }
                            </Pressable>
                            <Pressable style={unit == 2 ? styles.groupActiveButton : styles.groupInactiveButton} onPress={() => setUnit(2)}>
                                <Text style={unit == 2 ? styles.activeText : styles.inactiveText}>Kilometers</Text>
                                { unit == 2 ? <View style={{position: 'absolute', left: 20}}><SvgIcon icon='SmallCheck'/></View> : null }
                            </Pressable>
                        </View>
                        <View style={styles.footer}>
                            <TouchableOpacity style={css.submitButton} onPress={pressSubmitAction}>
                                <Text style={css.submitText}>DONE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    indicatorContainer: {
        justifyContent: 'space-between',
        marginLeft: 22,
    },
    indicatorTitle: {
        fontFamily: 'SFProBold',
        fontSize: 16,
        color: global.COLOR.SETTING_ICON,
    },
    indicatorText: {
        fontFamily: 'SFProRegular',
        fontSize: 13,
        color: global.COLOR.PRIMARY70,
    },
    textItem: {
        marginBottom: 25,
    },
    modalContainer: {
        width: global.CONSTANTS.WIDTH,
        height: global.CONSTANTS.WIDTH * 0.773,
        backgroundColor: 'white',
        top: global.CONSTANTS.HEIGHT - global.CONSTANTS.WIDTH * 0.773,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        paddingTop: 45,
        paddingHorizontal: global.CONSTANTS.SIZE_20,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
    },
    groupActiveButton: {
        width: global.CONSTANTS.WIDTH * 0.437,
        height: 50,
        borderRadius: 25,
        borderColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: global.COLOR.SECONDARY,
    },
    groupInactiveButton: {
        width: global.CONSTANTS.WIDTH * 0.437,
        height: 50,
        borderRadius: 25,
        borderColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: global.COLOR.STATUS_INACTIVE,
    },
    activeText: {
        fontFamily: 'SFProMedium',
        fontSize: 14,
        color: 'white',
    },
    inactiveText: {
        fontFamily: 'SFProMedium',
        fontSize: 14,
        color: global.COLOR.PRIMARY100,
    },
    footer: {
        position: 'absolute',
        left: global.CONSTANTS.SIZE_20,
        right: global.CONSTANTS.SIZE_20,
        bottom: global.CONSTANTS.SPACE_40,
    },
});

export default Setting;