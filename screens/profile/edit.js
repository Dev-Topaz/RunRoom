import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Pressable, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SwitchToggle from 'react-native-switch-toggle';
import PhoneInput from 'react-native-phone-input';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import AgePicker from '../../components/agePicker';
import GenderPicker from '../../components/genderPicker';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';
import css from '../../css';

import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails, updateUserProfile, getCities } from '../../utils/api';
import { customizeRank } from '../../store/actions/actions';

const EditProfile = (props) => {

    const userId = useSelector(state => state.user.userId);
    const accessToken = useSelector(state => state.user.accessToken);
    const phoneNumber = useSelector(state => state.user.phoneNumber);
    const unit = useSelector(state => state.setting.unit);
    const isRank = useSelector(state => state.run.isRank);
    const dispatch = useDispatch();

    const [name, setName] = useState({ firstName: '', lastName: '' });
    const [runningLocation, setRunningLocation] = useState('');
    const [ageGroup, setAgeGroup] = useState(0);
    const [gender, setGender] = useState(0);
    const [avatar, setAvatar] = useState(null);
    const [isToggle, setToggle] = useState(false);
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [cityList, setCityList] = useState([]);

    const [alertVisible, setAlertVisible] = useState(false);
    const [ageVisible, setAgeVisible] = useState(false);
    const [genderVisible, setGenderVisible] = useState(false);
    const [pickerVisible, setPickerVisible] = useState(false);

    useEffect(() => {
        getUserDetails(userId, accessToken).then(result => {
            if(result == null) {
                Alert.alert('You are not authorized.');
            } else if(userId != result.userId || phoneNumber != result.phoneNumber) {
                Alert.alert('You are a fake user.');
            } else {
                setName({ firstName: result.firstName, lastName: result.lastName });
                setRunningLocation(result.location == null ? '' : result.location);
                setAgeGroup(result.ageGroup);
                setAvatar(result.avatar);
                setGender(result.gender);
                setToggle(isRank);
            }
        });
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Your Location Permission is denied');
            } else {
                let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
                const position = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                };
                let region = await Location.reverseGeocodeAsync(position);
                if(region[0].country != null) {
                    setCountry(region[0].country);
                    getCities(region[0].country).then(result => {
                        setCityList(result);
                    });
                }
                if(region[0].city != null)
                    setCity(region[0].city);
                else
                    setCity(cityList[0]);
            }
        })();
    }, []);

    useEffect(() => {
        if(isToggle) {
            if(ageGroup == 0 || gender == 0) {
                setAlertVisible(true);
                setToggle(false);
            }
        }
    }, [isToggle]);

    const pressCameraAction = () => {
        setPickerVisible(false);
        (async () => {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if(!result.cancelled)
                compressImage(result.uri).then(res => {
                    setAvatar(res.uri);
                });
        })();
    }

    const pressGalleryAction = () => {
        setPickerVisible(false);
        (async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if(!result.cancelled)
                compressImage(result.uri).then(res => {
                    setAvatar(res.uri);
                });
        })();
    }

    const pressPickerAction = () => {
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Sorry, we need camera roll permissions to make this work!');
              return;
            }
        })();
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Sorry, we need camera roll permissions to make this work!');
              return;
            }
        })();
        setPickerVisible(true);
    }

    const compressImage = async(uri) => {
        const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 100, height: 100 } }],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );
        return manipResult;
    }

    const pressSubmitAction = () => {
        if(name.firstName == '' || name.lastName == '') {
            Alert.alert('WARNING', 'The first name and last name cannot be empty');
            return;
        }
        
        const updateInfo = new FormData();
        updateInfo.append('UserId', userId);
        updateInfo.append('FirstName', name.firstName);
        updateInfo.append('LastName', name.lastName);
        updateInfo.append('AgeGroup', ageGroup);
        updateInfo.append('Gender', gender);
        updateInfo.append('RunningLocation', runningLocation);
        updateInfo.append('UnitOfMeasurement', unit);
        
        if(avatar != null) {
            let localUri = avatar;
            let filename = localUri.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            updateInfo.append('ImageInfo', { uri: localUri, name: filename, type });
        }

        updateUserProfile(updateInfo, accessToken).then(result => {
            if(result) {
                AsyncStorage.multiSet([['canRank', ageGroup != 0 && gender != 0 ? '1' : '0'], ['isRank', isToggle ? '1' : '0']], err => {
                    if(err) {
                        console.log('An error occured');
                        throw err;
                    } else {
                        dispatch(customizeRank(ageGroup != 0 && gender != 0, isToggle));
                    }
                });
                Alert.alert('Your profile is updated successfully');
                props.navigation.navigate('Profile');
            } else {
                Alert.alert('There is an error in updating your profile');
            }
        });
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
                        <Pressable style={styles.uploadButton} onPress={pressPickerAction}>
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
                <Text style={[css.labelText, { marginTop: 15 }]}>Phone Number</Text>
                <View style={css.textInputContainer}>
                    <PhoneInput
                        onPressFlag={() => {}}
                        initialCountry='us'
                        textProps={{ placeholder: 'Enter your mobile number' }}
                        textStyle={css.inputText}
                        initialValue={phoneNumber}
                        disabled={true}
                    />
                </View>
                <Text style={[css.labelText, { marginTop: 15 }]}>Running Location</Text>
                <View style={css.textInputContainer}>
                    <TextInput
                        style={[css.inputText, { paddingVertical: 20 }]}
                        placeholder='Enter your running location'
                        value={runningLocation == '' ? city + ', ' + country : runningLocation}
                        onChangeText={text => setRunningLocation(text)}
                    />
                </View>
                <Text style={[css.labelText, { marginTop: 15 }]}>Age Group</Text>
                <Pressable style={css.textInputRowContainer} onPress={() => setAgeVisible(true)}>
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
                <Pressable style={css.textInputRowContainer} onPress={() => setGenderVisible(true)}>
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
            <AgePicker
                visible={ageVisible}
                data={ageGroup}
                onChangeVisible={setAgeVisible}
                onChangeValue={setAgeGroup}
            />
            <GenderPicker
                visible={genderVisible}
                data={gender}
                onChangeVisible={setGenderVisible}
                onChangeValue={setGender}
            />
            <Modal
                animationType='slide'
                transparent
                visible={alertVisible}
                onRequestClose={() => {}}
            >
                <View style={css.overlay}>
                    <View style={styles.alertContainer}>
                        <Text style={styles.alertTitleText}>{'Please select both your age' + '\n' + 'group and gender to customize' + '\n' + 'rankings across runs and' + '\n' + 'statistics'}</Text>
                        <Pressable onPress={() => setAlertVisible(false)}>
                            <Text style={styles.alertButtonText}>Got it</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType='slide'
                transparent
                visible={pickerVisible}
                onRequestClose={() => {}}
            >
                <View style={css.overlay}>
                    <View style={styles.pickerContainer}>
                        <Text style={styles.pickerTitle}>Select an image from</Text>
                        <View style={styles.selectorContainer}>
                            <Pressable style={styles.selector} onPress={pressCameraAction}>
                                <Icon name='camera' type='material-community' size={50} color={global.COLOR.SETTING_ICON}/>
                                <Text style={styles.selectorText}>CAMERA</Text>
                            </Pressable>
                            <Pressable style={styles.selector} onPress={pressGalleryAction}>
                                <Icon name='image' type='material-community' size={50} color={global.COLOR.SETTING_ICON}/>
                                <Text style={styles.selectorText}>GALLERY</Text>
                            </Pressable>
                        </View>
                        <Pressable onPress={() => setPickerVisible(false)}>
                            <Text style={styles.alertButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
    alertContainer: {
        width: global.CONSTANTS.MODAL_316,
        height: global.CONSTANTS.MODAL_194,
        left: (global.CONSTANTS.WIDTH - global.CONSTANTS.MODAL_316) / 2,
        top: (global.CONSTANTS.HEIGHT - global.CONSTANTS.MODAL_194) / 2,
        backgroundColor: 'white',
        borderRadius: 37,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertTitleText: {
        fontFamily: 'SFProMedium',
        fontSize: 18,
        color: global.COLOR.PRIMARY100,
        letterSpacing: -0.5,
        lineHeight: 24,
        marginBottom: global.CONSTANTS.SIZE_20,
        textAlign: 'center',
    },
    alertButtonText: {
        fontFamily: 'SFProBold',
        fontSize: 16,
        color: global.COLOR.GOT,
    },
    pickerContainer: {
        width: global.CONSTANTS.MODAL_316,
        height: global.CONSTANTS.MODAL_194,
        left: (global.CONSTANTS.WIDTH - global.CONSTANTS.MODAL_316) / 2,
        top: (global.CONSTANTS.HEIGHT - global.CONSTANTS.MODAL_194) / 2,
        backgroundColor: 'white',
        borderRadius: 37,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerTitle: {
        fontFamily: 'SFProBold',
        fontSize: 18,
        color: global.COLOR.PRIMARY100,
        marginBottom: 15,
        textAlign: 'center',
    },
    selectorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    selector: {
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    selectorText: {
        fontFamily: 'SFProMedium',
        fontSize: 12,
        color: global.COLOR.PRIMARY100,
        marginTop: 1,
        textAlign: 'center',
    }
});

export default EditProfile;

const ageGroupList = ['', 'Below 20', '20s', '30s', '40s', '50s', '60s', '70s', '80 or above'];
const genderList = ['', 'Male', 'Female', 'Other'];