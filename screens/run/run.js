import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, Pressable, StatusBar } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';
import * as Location from 'expo-location';

import { convertFloat } from '../../utils/func';
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
    const [rank, setRank] = useState(1);

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
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Pressable style={{ paddingLeft: 6 }} onPress={() => {}}>
                        <SvgIcon icon='Back'/>
                    </Pressable>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <Text style={styles.titleText}>YOUR RUN</Text>
                        <Text style={styles.titleDistance}>{convertFloat(distance) + (unit == 1 ? ' MILES' : ' KILOMETERS')}</Text>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <Text style={styles.headerRank}>{'' + rank}</Text>
                    <Text style={styles.indexText}>Rank</Text>
                </View>
            </View>
            <View style={{ height: global.CONSTANTS.SIZE_192 }}>
                <View style={styles.rowContainer}>
                    <View style={styles.cell}>
                        <Text style={styles.indexText}>Time</Text>
                        <Text style={styles.valueText}>{(hour < 10 ? '0' + hour : hour) + ':' + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)}</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.indexText}>Distance</Text>
                        <View style={styles.valueContainer}>
                            <Text style={styles.valueText}>0.0</Text>
                            <Text style={[styles.indexText, { marginHorizontal: 5, paddingBottom: 2 }]}>{unit == 1 ? 'miles' : 'kilos'}</Text>
                            <Text style={styles.valueText}>0.0</Text>
                            <Text style={[styles.indexText, { marginHorizontal: 5, paddingBottom: 2 }]}>%</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.cell}>
                        <Text style={styles.indexText}>Current Pace</Text>
                        <View style={styles.valueContainer}>
                            <Text style={[styles.valueText, { letterSpacing: 1.5 }]}></Text>
                            <Text style={[styles.indexText, { marginLeft: 23 }]}></Text>
                        </View>
                    </View>
                    <View></View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default Running;