import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, Pressable, StatusBar } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';
import * as Location from 'expo-location';

import { useSelector } from 'react-redux';

const Running = (props) => {

    const userId = useSelector(state => state.user.userId);
    const accessToken = useSelector(state => state.user.accessToken);
    const roomId = useSelector(state => state.run.roomId);
    const unit = useSelector(state => state.setting.unit);

    const [isExit, setExit] = useState(false);
    const [isToggle, setToggle] = useState(false);
    const [dist, setDist] = useState(0);
    const [current, setCurrent] = useState(new Date());
    const [now, setNow] = useState(new Date());
    const [data, setData] = useState([]);
    const [lastPoint, setLastPoint] = useState(null);
    const [sec, setSec] = useState(0);
    const [min, seMin] = useState(0);
    const [hour, setHour] = useState(0);

    useEffect(() => {
        StatusBar.setHidden(true);
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              console.log('Access was denied.');
            } else {
                let location = await Location.getCurrentPositionAsync({});
                setLastPoint(location);
            }
        })();
    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

        </View>
    );
}

const styles = StyleSheet.create({

});

export default Running;