import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import global from '../../global';
import css from '../../css';

import { verifyCode, sendVerifyCode, getUserDetails } from '../../utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { codeVerified, customizeRank } from '../../store/actions/actions';
import { rememberCurrentUser } from '../../utils/func';

const CELL_COUNT = 4;
const CELL_SIZE = 57;
const CELL_BORDER_RADIUS = 4;

const Verification = (props) => {

    const dispatch = useDispatch();
    const phoneNumber = useSelector(state => state.user.phoneNumber);

    const [value, setValue] = useState('');
    const codeField = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [series, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

    const renderCell = ({ index, symbol, isFocused }) => {

        const hasValue = Boolean(symbol);

        return (
            <Text key={index} style={[styles.cell, isFocused && styles.focusCell]} onLayout={getCellOnLayoutHandler(index)}>
                { isFocused ? '' : hasValue ? symbol : '●' }
            </Text>
        );
    }

    const pressSubmitAction = () => {
        if(value.length < 4) {
            Alert.alert('Fill in all the 4 digits.');
            return;
        }

        verifyCode(phoneNumber, value).then(result => {
            if(result.isVerified) {
                dispatch(codeVerified(result));
                rememberCurrentUser(phoneNumber, result.userId, result.accessToken, result.refreshToken);
                if(result.userType == 1) {
                    getUserDetails(result.userId, result.accessToken).then(user => {
                        if(user != null) {
                            if(user.gender != 0 && user.ageGroup != 0)
                                dispatch(customizeRank(true));
                            else
                                dispatch(customizeRank(false));
                        }
                    });
                    props.navigation.navigate('LocationPermission');
                } else {
                    props.navigation.navigate('UserName');
                }
                setValue('');
            } else {
                setValue('');
                codeField.current.focus();
            }
        });
    }

    const pressResendAction = () => {
        sendVerifyCode(phoneNumber).then(result => {
            if(!result) {
                Alert.alert('ERROR', 'There is an error in sending mobile number.');
            }
        });
    }

    return (
        <View style={css.bgAuthContainer}>
            <Text style={[css.titleText, { color: global.COLOR.PRIMARY100 }]}>VERIFICATION</Text>
            <Text style={css.authIndicatorText}>{ "We've sent a verification code to your phone." + "\n" + "Please enter the code below." }</Text>
            <CodeField
                ref={ codeField }
                { ...series }
                value={ value }
                onChangeText={ setValue }
                cellCount={ CELL_COUNT }
                autoFocus
                rootStyle={ styles.codeFieldRoot }
                keyboardType='number-pad'
                textContentType='oneTimeCode'
                renderCell={ renderCell }
            />
            <KeyboardAvoidingView style={styles.submitContainer} behavior='position'>
                <TouchableOpacity style={css.submitButton} onPress={pressSubmitAction}>
                    <Text style={css.submitText}>VERIFY</Text>
                </TouchableOpacity>
                <View style={styles.resendContainer}>
                    <Text style={styles.resendIndicatorText}>Didn't receive any code?</Text>
                    <TouchableOpacity onPress={pressResendAction}>
                        <Text style={styles.resendText}>Resend</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    codeFieldRoot: {
        height: CELL_SIZE,
        marginTop: 90,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    submitContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 25,
    },
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    resendIndicatorText: {
        fontFamily: 'SFProRegular',
        fontSize: 14,
        color: global.COLOR.PRIMARY50,
    },
    resendText: {
        fontFamily: 'SFProBold',
        fontSize: 14,
        color: global.COLOR.PRIMARY100,
        marginLeft: 15,
    },
    cell: {
        height: CELL_SIZE,
        width: CELL_SIZE,
        lineHeight: CELL_SIZE - 5,
        fontFamily: 'FuturaT',
        fontSize: 24,
        textAlign: 'center',
        borderRadius: CELL_BORDER_RADIUS,
        borderColor: global.COLOR.BACKGROUND,
        borderWidth: 1,
        color: global.COLOR.PRIMARY100,
        backgroundColor: global.COLOR.BACKGROUND,
        marginHorizontal: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    focusCell: {
        borderColor: global.COLOR.SECONDARY,
    },
});

export default Verification;