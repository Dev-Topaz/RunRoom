import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, Pressable, TextInput, StatusBar, Alert } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';
import css from '../../css';
import DistancePicker from '../../components/distancePicker';
import DatePicker from '../../components/datePicker';
import InviteModal from '../../components/inviteModal';
import ConnectionModal from '../../components/connModal';

import { useSelector } from 'react-redux';
import { createRoom } from '../../utils/api';
import { showDateInfo } from '../../utils/func';


const RoomCreate = (props) => {

    const userId = useSelector(state => state.user.userId);
    const accessToken = useSelector(state => state.user.accessToken);
    const unit = useSelector(state => state.setting.unit);

    const [typeValue, setTypeValue] = useState('1');
    const [distanceValue, setDistanceValue] = useState(0);
    const [dateValue, setDateValue] = useState(null);
    const [inviteList, setInviteList] = useState([]);

    const [distanceVisible, setDistanceVisible] = useState(false);
    const [dateVisible, setDateVisible] = useState(false);
    const [inviteVisible, setInviteVisible] = useState(false);
    const [invitedVisible, setInvitedVisible] = useState(false);

    useEffect(() => {
        StatusBar.setHidden(true);
    }, []);

    const pressSubmitAction = () => {
        if(distanceValue == 0) {
            Alert.alert('Please enter the distance.');
            return;
        }

        if(dateValue == null) {
            Alert.alert('Please enter the date and time.');
            return;
        }

        let invitedGroup = [];
        inviteList.forEach(item => {
            invitedGroup.push(item.connectedUserId);
        });

        const roomInfo = {
            organizerId: userId,
            roomType: parseInt(typeValue),
            runDateTime: dateValue,
            runDistance: distanceValue,
            unit: unit,
            inviteList: invitedGroup,
        };

        createRoom(roomInfo, accessToken).then(result => {
            if(result) {
                props.navigation.navigate('RoomComplete');
            } else {
                Alert.alert('ERROR', 'There is an error in creating a runroom.');
            }
        });
    }

    return (
        <View style={css.bgContainer}>
            <Pressable style={css.backButton} onPress={() => props.navigation.navigate('Room')}>
                <SvgIcon icon='Back'/>
            </Pressable>
            <Text style={[css.titleText, { color: global.COLOR.PRIMARY100 }]}>CREATE A RUNROOM</Text>
            <SwitchSelector
                initial={ 0 }
                options={[
                    { label: 'PUBLIC', value: '1' },
                    { label: 'PRIVATE', value: '2' },
                ]}
                onPress={ value => setTypeValue(value) }
                selectedColor={ global.COLOR.BACKGROUND }
                buttonColor={ global.COLOR.SECONDARY }
                borderColor={ global.COLOR.BACKGROUND }
                hasPadding
                height={ 50 }
                fontFamily='SFProMedium'
                fontSize={ 14 }
                backgroundColor={ global.COLOR.BACKGROUND }
                buttonMargin={ 4 }
                style={{ marginTop: 36, marginBottom: 25 }}
            />
            <Text style={css.labelText}>Run Distance</Text>
            <Pressable style={[css.textInputRowContainer, { marginBottom: 15 }]} onPress={() => setDistanceVisible(true)}>
                <TextInput
                    style={css.inputText}
                    placeholder='Pick a distance'
                    editable={false}
                    value={distanceValue > 0 ? distanceValue + (unit == 1 ? ' miles' : ' kilometers') : ''}
                    pointerEvents='none'
                />
                <View style={css.plusButton}>
                    { distanceValue == 0 ? <SvgIcon icon='Plus'/> : <SvgIcon icon='Edit'/> }
                </View>
            </Pressable>
            <Text style={css.labelText}>Set Time and Date</Text>
            <Pressable style={[css.textInputRowContainer, { marginBottom: 15 }]} onPress={() => setDateVisible(true)}>
                <TextInput
                    style={css.inputText}
                    placeholder='Select time and date'
                    editable={false}
                    value={dateValue == null ? '' : showDateInfo(dateValue)}
                    pointerEvents='none'
                />
                <View style={css.plusButton}>
                    { dateValue == null ? <SvgIcon icon='Plus'/> : <SvgIcon icon='Edit'/> }
                </View>
            </Pressable>
            <Text style={css.labelText}>Invite Connection</Text>
            <View style={styles.connectionContainer}>
                <Pressable style={styles.addButton} onPress={() => setInviteVisible(true)}>
                    <SvgIcon icon='Plus'/>
                </Pressable>
                <Pressable style={{ flexDirection: 'row', width: 100, justifyContent: 'flex-end' }} onPress={() => setInvitedVisible(true)}>
                    {
                        inviteList.length > 3 ?
                            <View>
                                <View style={[css.badge, {right: 0}]}>
                                    <Text style={css.badgeText}>{'+' + (inviteList.length - 3)}</Text>
                                </View>
                                <Image source={inviteList[2].picture == null ? unknown : {uri: inviteList[2].picture}} style={[css.followAvatar, {right: 25}]}/>
                                <Image source={inviteList[1].picture == null ? unknown : {uri: inviteList[1].picture}} style={[css.followAvatar, {right: 48}]}/>
                                <Image source={inviteList[0].picture == null ? unknown : {uri: inviteList[0].picture}} style={[css.followAvatar, {right: 70}]}/>
                            </View>
                        : inviteList.map((runner, idx = 0) => {
                            return (
                                <Image key={idx} source={runner.picture == null ? unknown : {uri: runner.picture}} style={[css.followAvatar, {right: 25*idx++}]}/>
                            );
                        })
                    }
                </Pressable>
            </View>
            <KeyboardAvoidingView style={styles.submitContainer} behavior='position'>
                <TouchableOpacity style={css.submitButton} onPress={pressSubmitAction}>
                    <Text style={css.submitText}>CREATE RUNROOM</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

            <DistancePicker
                visible={ distanceVisible }
                unit={ unit }
                onChangeVisible={ setDistanceVisible }
                onChangeValue={ setDistanceValue }
            />
            <DatePicker
                visible={ dateVisible }
                onChangeVisible={ setDateVisible }
                onChangeValue={ setDateValue }
            />
            <ConnectionModal
                data={ inviteList }
                visible={ invitedVisible }
                onChangeVisible={ setInvitedVisible }
                onChangeValue={ setInviteList }
            />
            <InviteModal
                data={ inviteList }
                visible={ inviteVisible }
                onChangeVisible={ setInviteVisible }
                onChangeValue={ setInviteList }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    addButton: {
        height: global.CONSTANTS.CIRCLE_36,
        width: global.CONSTANTS.CIRCLE_36,
        borderRadius: global.CONSTANTS.CIRCLE_36 / 2,
        backgroundColor: global.COLOR.BACKGROUND,
        marginLeft: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: global.CONSTANTS.SPACE_40,
    },
    connectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 18,
        justifyContent: 'space-between'
    },
});

export default RoomCreate;

const unknown = global.IMAGE.UNKNOWN;