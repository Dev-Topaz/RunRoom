import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import global from '../../global';

const RunPrepare = (props) => {

    const [remainSec, setRemainSec] = useState(11);

    useEffect(() => {
        const timer = setInterval(() => {setRemainSec(remainSec => remainSec - 1)}, 1000);

        if(remainSec < 1) {
            clearInterval(timer);
            props.navigation.navigate('Running');
        }

        return () => clearInterval(timer);
    }, [remainSec]);

    return (
        <View style={styles.bgContainer}>
            <Text style={styles.text}>{ remainSec > 1 ? remainSec - 1 : 'START' }</Text>
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
        fontSize: 100,
        color: 'white',
        width: global.CONSTANTS.CARD_373,
        lineHeight: 120,
        textAlign: 'center',
    },
});

export default RunPrepare;