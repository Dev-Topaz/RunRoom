import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from '../../components/countryPicker';
import global from '../../global';
import css from '../../css';

import { useDispatch } from 'react-redux';
import { changeMobileNumber } from '../../store/actions/actions';
import { sendVerifyCode } from '../../utils/api';

const MobileInput = (props) => {

    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState([]);

    const phoneInput = useRef(null);

    useEffect(() => {
        setModalData(phoneInput.current.getPickerData());
    }, []);

    const selectCountry = (item) => {
        phoneInput.current.selectCountry(item.iso2);
    }

    const pressSubmitAction = () => {
        const isValid = phoneInput.current.isValidNumber();
        const value = phoneInput.current.getValue();
        if(!isValid) {
            Alert.alert('Your phone number is invalid.');
        } else {
            sendVerifyCode(value).then(result => {
                if(result) {
                    dispatch(changeMobileNumber(value));
                    props.navigation.navigate('Verify');
                } else {
                    Alert.alert('ERROR', 'There is an error in sending mobile number.');
                }
            });
        }
    }
    
    return (
        <View style={css.bgAuthContainer}>
            <Text style={[css.titleText, { color: global.COLOR.PRIMARY100 }]}>MOBILE NUMBER</Text>
            <Text style={css.authIndicatorText}>{ 'Enter your mobile phone number to receive a' + '\n' + 'verification code.' }</Text>
            <Text style={[css.labelText, { marginTop: 20 }]}>Mobile number</Text>
            <View style={css.textInputContainer}>
                <PhoneInput
                    ref={ phoneInput }
                    onPressFlag={() => setModalVisible(true)}
                    initialCountry='us'
                    textProps={{ placeholder: 'Enter your mobile phone number' }}
                    textStyle={css.inputText}
                />
            </View>
            <KeyboardAvoidingView style={styles.submitContainer} behavior='position'>
                <TouchableOpacity style={css.submitButton} onPress={pressSubmitAction}>
                    <Text style={css.submitText}>CONTINUE</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <CountryPicker
                visible={ modalVisible }
                data={ modalData }
                onChangeCountry={ selectCountry }
                onChangeVisible={ setModalVisible }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    submitContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: global.CONSTANTS.SPACE_40,
    },
});

export default MobileInput;
