import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';


const RoomComplete = (props) => {

    const [remainSec, setRemainSec] = useState(3);

    useEffect(() => {
        const timer = setInterval(() => setRemainSec(remainSec => remainSec - 1), 1000);
        if(remainSec < 1) {
            clearInterval(timer);
            props.navigation.navigate('Main');
        }
        return () => clearInterval(timer);
    }, [remainSec]);

    return (
        <View style={styles.bgContainer}>
            <SvgIcon icon='CheckLogo'/>
            <Text style={styles.text}>RUNROOM CREATED</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    bgContainer: {
        flex: 1,
        backgroundColor: global.COLOR.PRIMARY100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'FuturaT',
        fontSize: 24,
        letterSpacing: 0.3,
        color: 'white',
        marginTop: 25,
    },
});

export default RoomComplete;