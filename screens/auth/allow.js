import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Pressable, Alert } from 'react-native';
import * as Location from 'expo-location';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';
import css from '../../css';

const LocationPermission = (props) => {
    
    const requestPermission = async() => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted') {
            Alert.alert('Location Foreground Permission is denied.');
        } else {
            let { status } = await Location.requestBackgroundPermissionsAsync();
            if(status !== 'granted') {
                Alert.alert('Location Background Permission is denied.');
            } else {
                props.navigation.navigate('Main');
            }
        }
    }

    return (
        <View style={styles.bgContainer}>
            <View style={styles.midContainer}>
                <SvgIcon icon='LocationMark'/>
                <Text style={[css.titleText, { textAlign: 'center', marginTop: 45, color: global.COLOR.PRIMARY100 }]}>ALLOW LOCATION</Text>
                <Text style={styles.indicatorText}>{ 'Please allow RunRoom to access your location' + '\n' + 'to maximize the features of the app' }</Text>
            </View>
            <View style={styles.submitContainer}>
                <TouchableOpacity style={css.submitButton} onPress={requestPermission}>
                    <Text style={css.submitText}>ALLOW</Text>
                </TouchableOpacity>
                <Pressable style={styles.laterButton} onPress={() => props.navigation.navigate('Main')}>
                    <Text style={styles.laterText}>MAYBE LATER</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bgContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    midContainer: {
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicatorText: {
        fontFamily: 'SFProRegular',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        lineHeight: 24,
        letterSpacing: -0.5,
    },
    submitContainer: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: global.CONSTANTS.SPACE_40,
        paddingHorizontal: global.CONSTANTS.SIZE_20,
    },
    laterButton: {
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    laterText: {
        fontFamily: 'SFProMedium',
        fontSize: 16,
        color: global.COLOR.PRIMARY100,
    },
});

export default LocationPermission;