import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Pressable, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SwitchToggle from 'react-native-switch-toggle';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from '../../components/countryPicker';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';
import css from '../../css';

import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../../utils/api';

const EditProfile = (props) => {

    const userId = useSelector(state => state.user.userId);
    const accessToken = useSelector(state => state.user.accessToken);
    const phoneNumber = useSelector(state => state.user.phoneNumber);
    const dispatch = useDispatch();
    const phoneInput = useRef(null);

    const [name, setName] = useState({ firstName: '', lastName: '' });
    const [location, setLocation] = useState('');
    const [ageGroup, setAgeGroup] = useState(0);
    const [gender, setGender] = useState(0);
    const [avatar, setAvatar] = useState(null);
    const [isToggle, setToggle] = useState(false);
    const [countryData, setCountryData] = useState([]);

    const [countryVisible, setCountryVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [ageVisible, setAgeVisible] = useState(false);
    const [genderVisible, setGenderVisible] = useState(false);

    useEffect(() => {
        setCountryData(phoneInput.current.getPickerData());
        getUserDetails(userId, accessToken).then(result => {
            if(result == null) {
                Alert.alert('You are not authorized.');
            } else if(userId != result.userId || phoneNumber != result.phoneNumber) {
                Alert.alert('You are a fake member.');
            } else {
                setName({ firstName: result.firstName, lastName: result.lastName });
                setLocation(result.location);
                setAgeGroup(result.ageGroup);
                setAvatar(result.avatar);
                setGender(result.gender);
            }
        });
    }, []);

    const selectCountry = (item) => {
        phoneInput.current.selectCountry(item.iso2);
    }

    const pressSubmitAction = () => {

    }

    return (
        <View></View>
    );
}

const styles = StyleSheet.create({

});

export default EditProfile;