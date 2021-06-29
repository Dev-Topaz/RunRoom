import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';
import css from '../../css';

import { saveUser, getUserDetails } from '../../utils/api';
import { useSelector } from 'react-redux';

const Username = (props) => {

    const userType = useSelector(state => state.user.userType);
    const userId = useSelector(state => state.user.userId);
    const accessToken = useSelector(state => state.user.accessToken);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isError, setError] = useState(false);

    const pressSubmitAction = () => {
        if(firstName.length == 0 || lastName.length == 0) {
            setError(true);
            return;
        }

        if(userType == 1) {
            getUserDetails(userId, accessToken).then(result => {
                if(result == null) {
                    Alert.alert('You are not authorized.');
                } else {
                    if(firstName == result.firstName && lastName == result.lastName && userId == result.userId) {
                        props.navigation.navigate('LocationPermission');
                    } else {
                        Alert.alert('Please enter your name correctly.');
                    }
                }
            });
        } else if(userType == 2) {
            const userInfo = {
                userId: userId,
                firstName: firstName,
                lastName: lastName,
            };
            saveUser(userInfo, accessToken).then(result => {
                if(result) {
                    props.navigation.navigate('LocationPermission');
                } else {
                    Alert.alert('ERROR', 'There is an error in registering a new member.');
                }
            });
        }
    }

    return (
        <View style={css.bgAuthContainer}>
            <Text style={[css.titleText, { color: global.COLOR.PRIMARY100 }]}>GETTING STARTED</Text>
            <Text style={css.authIndicatorText}>How would you like us to address you?</Text>
            <Text style={[css.labelText, { marginTop: 23 }]}>First Name</Text>
            <View style={[css.textInputContainer, { borderWidth: 1, borderColor: isError && firstName.length == 0 ? global.COLOR.WARNING_BORDER : global.COLOR.BACKGROUND }]}>
                <TextInput
                    style={css.inputText}
                    placeholder='Enter your first name'
                    value={ firstName }
                    onChangeText={text => setFirstName(text)}
                />
            </View>
            <Text style={[css.labelText, { marginTop: 14 }]}>Last Name</Text>
            <View style={[css.textInputContainer, { borderWidth: 1, borderColor: isError && lastName.length == 0 ? global.COLOR.WARNING_BORDER : global.COLOR.BACKGROUND }]}>
                <TextInput
                    style={css.inputText}
                    placeholder='Enter your last name'
                    value={ lastName }
                    onChangeText={text => setLastName(text)}
                />
            </View>
            {
                isError && (firstName.length == 0 || lastName.length == 0) ? 
                        <View style={styles.warningContainer}>
                            <SvgIcon icon='WarningMark'/>
                            <Text style={styles.warningText}>Please provide the following information</Text>
                        </View>
                        : null
            }
            <KeyboardAvoidingView style={styles.submitContainer} behavior='position'>
                <TouchableOpacity style={css.submitButton} onPress={pressSubmitAction}>
                    <Text style={css.submitText}>CONTINUE</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    submitContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: global.CONSTANTS.SPACE_40,
    },
    warningContainer: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
    },
    warningText: {
        fontFamily: 'Georgia-Italic',
        fontStyle: 'italic',
        fontSize: 12,
        color: 'rgba(249, 41, 40, 1)',
        marginLeft: 12,
    },
});

export default Username;