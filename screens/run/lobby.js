import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Pressable, ActivityIndicator, ScrollView, Alert, StatusBar } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';

import { useSelector } from 'react-redux';
import { getLobbyRunners } from '../../utils/api';
import { convertFloat } from '../../utils/func';

const Lobby = (props) => {

    const userId = useSelector(state => state.user.userId);
    const accessToken = useSelector(state => state.user.accessToken);
    const unit = useSelector(state => state.setting.unit);
    const roomId = useSelector(state => state.run.roomId);
    const runDateTime = useSelector(state => state.run.runDateTime);
    const distance = useSelector(state => state.run.distance);
    const previousPage = useSelector(state => state.run.page);

    const [isToggle, setToggle] = useState(false);
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(new Date());
    const [remainMin, setRemainMin] = useState(0);
    const [remainSec, setRemainSec] = useState(0);

    useEffect(() => {
        StatusBar.setHidden(true);
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Pressable style={{ paddingLeft: 6 }}>
                        <SvgIcon icon='Back'/>
                    </Pressable>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <Text style={styles.titleText}>YOUR RUN</Text>
                        <Text style={styles.titleDistance}>{convertFloat(distance) + (unit == 1 ? ' MILES' : ' KILOMETERS')}</Text>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <Text style={[styles.titleDistance, { marginBottom: 1 }]}>{'00' + ':' + (remainMin < 10 ? '0' + remainMin : remainMin) + ':' + (remainSec < 10 ? '0' + remainSec : remainSec)}</Text>
                    <Text style={styles.indexText}>Time to Start</Text>
                </View>
            </View>
            <View style={{ height: global.CONSTANTS.SIZE_192 }}>
                <View style={styles.rowContainer}>
                    <View style={styles.cell}>
                        <Text style={styles.indexText}>Time</Text>
                        <Text style={styles.valueText}>00:00:00</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.indexText}>Distance</Text>
                        <View style={styles.valueContainer}>
                            <Text style={styles.valueText}>0.0</Text>
                            <Text style={[styles.indexText, { marginHorizontal: 5, paddingBottom: 2 }]}>miles</Text>
                            <Text style={styles.valueText}>0.0</Text>
                            <Text style={[styles.indexText, { marginHorizontal: 5, paddingBottom: 2 }]}>%</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.cell}>
                        <Text style={styles.indexText}>Current Pace</Text>
                        <View style={styles.valueContainer}>
                            <Text style={[styles.valueText, { letterSpacing: 1.5 }]}>--:--</Text>
                            <Text style={[styles.indexText, { marginLeft: 23 }]}>min / mile</Text>
                        </View>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.indexText}>Average Pace</Text>
                        <View style={styles.valueContainer}>
                            <Text style={[styles.valueText, { letterSpacing: 1.5 }]}>--:--</Text>
                            <Text style={[styles.indexText, { marginLeft: 23 }]}>min / mile</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.rankSwitchContainer}>
                <Text style={styles.rankSwitchText}>Customized Rankings</Text>
                <SwitchToggle
                    switchOn={isToggle}
                    onPress={() => setToggle(!isToggle)}
                    circleColorOn='white'
                    circleColorOff='white'
                    backgroundColorOn={global.COLOR.SECONDARY}
                    backgroundColorOff={global.COLOR.PRIMARY50}
                    containerStyle={styles.switchTrack}
                    circleStyle={styles.switchThumb}
                />
            </View>
            <View style={styles.listContainer}>
                <ScrollView>
                    {
                        data.map((item, index) => {
                            return (
                                <View key={item.runnerId} style={[styles.listItemContainer, { backgroundColor: item.runnerId == userId ? global.COLOR.STATUS_INACTIVE : 'white' }]}>
                                    <Image source={item.runnerPicture == null ? global.IMAGE.UNKNOWN : {uri: item.runnerPicture}} style={styles.avatar}/>
                                    <View style={styles.infoContainer}>
                                        <Text style={styles.nameText}>{item.runnerFirstName + ' ' + item.runnerLastName}</Text>
                                        <Text style={styles.locationText}>{item.runningLocation}</Text>
                                    </View>
                                    <View style={styles.stateContainer}>
                                        {
                                            item.runnerId == userId ? null :
                                            <Pressable style={item.followingStatus == 1 ? styles.followBadge : item.followingStatus == 2 ? styles.followingBadge : styles.followbackBadge}>
                                                <Text style={[styles.followText, { color: item.followingStatus == 2 ? 'white' : global.COLOR.PRIMARY100 }]}></Text>
                                            </Pressable>
                                        }
                                        <View style={[styles.rankBadge, { backgroundColor: item.runnerId == userId ? global.COLOR.PRIMARY100 : global.COLOR.STATUS_INACTIVE }]}>
                                            <Text style={[styles.rankText, { color: item.runnerId == userId ? 'white' : global.COLOR.PRIMARY100 }]}>{'' + (index + 1)}</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        })
                    }
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: global.CONSTANTS.SIZE_157,
        borderWidth: 0.5,
        borderColor: global.COLOR.HEADER_BORDER,
        paddingHorizontal: global.CONSTANTS.SIZE_20,
        paddingTop: global.CONSTANTS.SPACE_55,
    },
    headerLeft: {
        height: '100%',
        justifyContent: 'space-between',
        paddingBottom: 12,
    },
    headerRight: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingBottom: 15,
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    cell: {
        flex: 1,
        borderColor: global.COLOR.HEADER_BORDER,
        borderWidth: 0.5,
        paddingHorizontal: global.CONSTANTS.SIZE_20,
        paddingTop: 14,
    },
    indexText: {
        fontFamily: 'SFProRegular',
        fontSize: 12,
        color: global.COLOR.PRIMARY70,
    },
    valueText: {
        fontFamily: 'FuturaT',
        fontSize: 34,
        color: global.COLOR.PRIMARY100,
        marginTop: 6,
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    rankSwitchContainer: {
        flexDirection: 'row',
        height: 50,
        borderColor: global.COLOR.HEADER_BORDER,
        borderWidth: 0.5,
        paddingHorizontal: global.CONSTANTS.SIZE_20,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    rankSwitchText: {
        fontFamily: 'SFProRegular',
        fontSize: 14,
        color: global.COLOR.PRIMARY100,
        marginRight: 15,
    },
    switchTrack: {
        width: 22,
        height: 12,
        borderRadius: 6,
        padding: 2,
        marginRight: 2,
    },
    switchThumb: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    listContainer: {
        flex: 1,
        borderColor: global.COLOR.HEADER_BORDER,
        borderWidth: 0.5,
    },
    listItemContainer: {
        flexDirection: 'row',
        width: global.CONSTANTS.WIDTH,
        height: 70,
        alignItems: 'center',
        paddingHorizontal: global.CONSTANTS.SIZE_20,
        borderBottomColor: global.COLOR.HEADER_BORDER,
        borderBottomWidth: 0.5,
    },
    avatar: {
        height: global.CONSTANTS.SQUARE_50,
        width: global.CONSTANTS.SQUARE_50,
        resizeMode: 'contain',
        borderRadius: 12,
    },
    infoContainer: {
        justifyContent: 'center',
        marginLeft: 15,
    },
    nameText: {
        fontFamily: 'SFProMedium',
        fontSize: 14,
        color: global.COLOR.PRIMARY100,
    },
    locationText: {
        fontFamily: 'SFProRegular',
        fontSize: 12,
        color: global.COLOR.PRIMARY70,
    },
    stateContainer: {
        position: 'absolute',
        right: global.CONSTANTS.SIZE_20,
        flexDirection: 'row',
    },
    followBadge: {
        width: 85,
        height: 30,
        borderRadius: 15,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: global.COLOR.STATUS_INACTIVE,
    },
    followingBadge: {
        width: 85,
        height: 30,
        borderRadius: 15,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: global.COLOR.SECONDARY,
    },
    followbackBadge: {
        width: 85,
        height: 30,
        borderRadius: 15,
        marginRight: 12,
        borderRadius: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: global.COLOR.SECONDARY,
        backgroundColor: 'white',
    },
    followText: {
        fontFamily: 'SFProRegular',
        fontSize: 12,
        letterSpacing: -0.3,
    },
    rankBadge: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rankText: {
        fontFamily: 'SFProMedium',
        fontSize: 12,
    },
});

export default Lobby;