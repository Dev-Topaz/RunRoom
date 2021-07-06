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
                Alert.alert('You are a fake user.');
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
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <Pressable style={css.backButton} onPress={() => props.navigation.navigate('Profile')}>
                    <SvgIcon icon='Back'/>
                </Pressable>
                <Text style={[css.titleText, { marginTop: 5, color: global.COLOR.PRIMARY100 }]}>EDIT PROFILE</Text>
                <View style={styles.avatarContainer}>
                    <Image source={avatar == null ? global.IMAGE.UNKNOWN : { uri: avatar }} style={styles.avatar}/>
                    <View style={{ justifyContent: 'center', marginLeft: 15 }}>
                        <Text style={css.inputText}>Profile Photo</Text>
                        <Pressable style={styles.uploadButton}>
                            <SvgIcon icon='Camera'/>
                            <Text style={styles.uploadText}>Upload new photo</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <KeyboardAwareScrollView style={{ paddingHorizontal: global.CONSTANTS.SIZE_20, marginTop: 25 }}>
                <Text style={[css.labelText, { marginTop: 15 }]}>First Name</Text>
                <View style={css.textInputContainer}>
                    <TextInput
                        style={css.inputText}
                        placeholder='Enter your first name'
                        value={name.firstName}
                        onChangeText={text => setName({ ...name, firstName: text })}
                    />
                </View>
                <Text style={[css.labelText, { marginTop: 15 }]}>Last Name</Text>
                <View style={css.textInputContainer}>
                    <TextInput
                        style={css.inputText}
                        placeholder='Enter your last name'
                        value={name.lastName}
                        onChangeText={text => setName({ ...name, lastName: text })}
                    />
                </View>
                <Text style={[css.labelText, { marginTop: 15 }]}>Last Name</Text>
                <View style={css.textInputContainer}>
                    <PhoneInput
                        ref={phoneInput}
                        onPressFlag={() => setCountryVisible(true)}
                        initialCountry='us'
                        textProps={{ placeholder: 'Enter your mobile number' }}
                        textStyle={css.inputText}
                        initialValue={phoneNumber}
                    />
                </View>
                <Text style={[css.labelText, { marginTop: 15 }]}>Running Location</Text>
                <View style={css.textInputContainer}>
                    <TextInput
                        style={css.inputText}
                        placeholder='Enter your running location'
                        value={location}
                        onChangeText={text => setLocation(text)}
                    />
                </View>
                <Text style={[css.labelText, { marginTop: 15 }]}>Age Group</Text>
                <Pressable style={css.textInputRowContainer}>
                    <TextInput
                        style={css.inputText}
                        placeholder='Select your age group'
                        editable={false}
                        value={ageGroupList[ageGroup]}
                        pointerEvents='none'
                    />
                    <View style={css.plusButton}>
                        <SvgIcon icon='Plus'/>
                    </View>
                </Pressable>
                <Text style={[css.labelText, { marginTop: 15 }]}>Gender</Text>
                <Pressable style={css.textInputRowContainer}>
                    <TextInput
                        style={css.inputText}
                        placeholder='Select your gender'
                        editable={false}
                        value={genderList[gender]}
                        pointerEvents='none'
                    />
                    <View style={css.plusButton}>
                        <SvgIcon icon='Plus'/>
                    </View>
                </Pressable>
                <View style={{ flexDirection: 'row', marginTop: 25, alignItems: 'center' }}>
                    <Text style={css.switchText}>{'Customize rankings and statistics based on' + '\n' + 'age group and gender'}</Text>
                    <View style={styles.toggleContainer}>
                        <SwitchToggle
                            switchOn={isToggle}
                            onPress={() => setToggle(!isToggle)}
                            circleColorOn='white'
                            circleColorOff='white'
                            backgroundColorOn={global.COLOR.SECONDARY}
                            backgroundColorOff={global.COLOR.PRIMARY50}
                            containerStyle={css.switchTrack}
                            circleStyle={css.switchThumb}
                        />
                    </View>
                </View>
                <TouchableOpacity style={[css.submitButton, { marginTop: 35, marginBottom: 30 }]} onPress={pressSubmitAction}>
                    <Text style={css.submitText}>SET</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
            <CountryPicker
                visible={countryVisible}
                data={countryData}
                onChangeCountry={selectCountry}
                onChangeVisible={setCountryVisible}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: global.CONSTANTS.SPACE_55,
        paddingHorizontal: global.CONSTANTS.SIZE_20,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
    },
    avatar: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 12,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    uploadText: {
        fontFamily: 'SFProMedium',
        fontSize: 14,
        color: global.COLOR.GOT,
        marginLeft: 5,
    },
    toggleContainer: {
        position: 'absolute',
        right: 2,
    },
});

export default EditProfile;