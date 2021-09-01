import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Text, Pressable, ScrollView, StatusBar, Modal, AppState } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';

import { useSelector, useDispatch } from 'react-redux';
import { getLobbyRunners, follow, stopFollowing, joinRun } from '../../utils/api';
import { convertFloat } from '../../utils/func';
import { setRank } from '../../store/actions/actions';

const Lobby = (props) => {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.userId);
    const accessToken = useSelector(state => state.user.accessToken);
    const unit = useSelector(state => state.setting.unit);
    const roomId = useSelector(state => state.run.roomId);
    const runDateTime = useSelector(state => state.run.runDateTime);
    const distance = useSelector(state => state.run.distance);
    const previousPage = useSelector(state => state.run.page);
    const canRank = useSelector(state => state.run.canRank);
    const isRank = useSelector(state => state.setting.isRank);

    const [isToggle, setToggle] = useState(isRank);
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(new Date());
    const [now, setNow] = useState(new Date());
    const [remainMin, setRemainMin] = useState(0);
    const [remainSec, setRemainSec] = useState(0);
    const [alertVisible, setAlertVisible] = useState(false);

    const appState = useRef(AppState.currentState);
    let timer = null;

    useEffect(() => {
        StatusBar.setHidden(true);
        //setToggle(isRank);
        AppState.addEventListener('change', handleAppStateChange);

        return () => AppState.removeEventListener('change', handleAppStateChange);
    }, []);

    const handleAppStateChange = (nextAppState) => {
        if(appState.current.match(/inactive|background/) && nextAppState === 'active') {
            clearInterval(timer);
            console.log('Lobby has come to the foreground');
        } else {
            if(appState.current == 'inactive') {
                if(timer == null) {
                    timer = setInterval(() => console.log('Lobby is in the background.'), 10000);
                    console.log('Lobby has come to the background');
                }
            } else {
                if(timer == null) {
                    timer = setInterval(() => console.log('Lobby is in the background.'), 10000);
                    console.log('Lobby has come to the background');
                }
            }
        }

        appState.current = nextAppState;
    }

    useEffect(() => {
        const timer = setInterval(() => {setCurrent(new Date())}, 500);

        const dateObject = new Date(runDateTime);
        let ts = (dateObject.getTime() - current.getTime()) / 1000;
        let tm = Math.floor(ts % 3600 / 60);
        if(tm < 1 && ts < 12) {
            if(ts < 1) {
                props.navigation.navigate('Running');
            } else {
                clearInterval(timer);
                props.navigation.navigate('RunPrepare');
            }
        } else {
            setRemainMin(tm);
            setRemainSec(Math.floor(ts % 60));
        }

        return () => clearInterval(timer);
    }, [current]);

    useEffect(() => {
        const timer = setInterval(() => {setNow(new Date())}, 10000);

        getLobbyRunners(roomId, 1, 500, accessToken).then(result => {
            if(result != null) {
                if(isToggle) {
                    if(canRank) {
                        const idx = result.findIndex(item => userId === item.runnerId);
                        if(idx > -1) {
                            const targetGender = result[idx].runnerGender;
                            const targetAgeGroup = result[idx].runnerAgeGroup;
                            let target = [];
                            result.forEach(item => {
                                if(item.runnerGender == targetGender && item.runnerAgeGroup == targetAgeGroup)
                                    target.push(item);
                            });
                            setData(target);
                        }
                    } else {
                        setData(result);
                    }
                } else {
                    setData(result);
                }
            }
        });

        return () => clearInterval(timer);
    }, [now]);

    useEffect(() => {
        if(isToggle) {
            if(canRank) {
                const idx = data.findIndex(item => userId === item.runnerId);
                if(idx > -1) {
                    const targetGender = data[idx].runnerGender;
                    const targetAgeGroup = data[idx].runnerAgeGroup;
                    let target = [];
                    data.forEach(item => {
                        if(item.runnerGender == targetGender && item.runnerAgeGroup == targetAgeGroup)
                            target.push(item);
                    });
                    setData(target);
                }
                dispatch(setRank(true));
            } else {
                setAlertVisible(true);
                setToggle(false);
            }
        } else {
            getLobbyRunners(roomId, 1, 500, accessToken).then(result => {
                if(result != null) {
                    setData(result);
                }
            });
            dispatch(setRank(false));
        }
    }, [isToggle]);

    const pressFollowAction = (index) => {
        let target = [...data];

        switch(target[index].followingStatus) {
            case 1:
                follow(target[index].runnerId, accessToken).then(result => {
                    if(result) {
                        target[index].followingStatus = 2;
                        setData(target);
                    }
                });
                return;
            case 2:
                stopFollowing(target[index].runnerId, accessToken).then(result => {
                    if(result != null) {
                        target[index].followingStatus = result;
                        setData(target);
                    }
                });
                return;
            case 3:
                follow(target[index].runnerId, accessToken).then(result => {
                    if(result) {
                        target[index].followingStatus = 2;
                        setData(target);
                    }
                });
                return;
            default:
                return;
        }
    }

    const pressBackAction = () => {
        const joinInfo = {
            runnerId: userId,
            runRoomId: roomId,
        };
        joinRun(joinInfo, accessToken).then(result => {
            if(result) {
                props.navigation.navigate(previousPage);
            } else {
                console.log('There is an error.');
            }
        });
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Pressable style={{ paddingLeft: 6 }} onPress={pressBackAction}>
                        <SvgIcon icon='Back'/>
                    </Pressable>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <Text style={styles.titleText}>YOUR RUN</Text>
                        <Text style={styles.titleDistance}>{convertFloat(distance, 1, true) + (unit == 1 ? ' MILES' : ' KM')}</Text>
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
                            <Text style={styles.valueText}>0.00</Text>
                            <Text style={[styles.indexText, { marginHorizontal: 5, paddingBottom: 2 }]}>{unit == 1 ? 'miles' : 'km'}</Text>
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
                            <Text style={[styles.indexText, { marginLeft: 23 }]}>{'min / ' + (unit == 1 ? 'mile' : 'km')}</Text>
                        </View>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.indexText}>Average Pace</Text>
                        <View style={styles.valueContainer}>
                            <Text style={[styles.valueText, { letterSpacing: 1.5 }]}>--:--</Text>
                            <Text style={[styles.indexText, { marginLeft: 23 }]}>{'min / ' + (unit == 1 ? 'mile' : 'km')}</Text>
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
                                            <Pressable style={item.followingStatus == 1 ? styles.followBadge : item.followingStatus == 2 ? styles.followingBadge : styles.followbackBadge} onPress={() => pressFollowAction(index)}>
                                                <Text style={[styles.followText, { color: item.followingStatus == 2 ? 'white' : global.COLOR.PRIMARY100 }]}>{followType[item.followingStatus]}</Text>
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
            <Modal
                animationType='slide'
                transparent
                visible={alertVisible}
                onRequestClose={() => {}}
            >
                <View style={styles.overlay}>
                    <View style={styles.alertContainer}>
                        <Text style={styles.alertTitleText}>{'Please select both your age' + '\n' + 'group and gender in Profile' + '\n' + 'to customize the rankings'}</Text>
                        <Pressable onPress={() => setAlertVisible(false)}>
                            <Text style={styles.alertButtonText}>Got it</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
    titleText: {
        fontFamily: 'SFProBold',
        fontSize: 10,
        color: global.COLOR.PRIMARY70,
        marginBottom: 2,
    },
    titleDistance: {
        fontFamily: 'FuturaT',
        fontSize: 24,
        color: global.COLOR.PRIMARY100,
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
        marginTop: 2,
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
        borderWidth: 1,
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
    overlay: {
        width: global.CONSTANTS.WIDTH,
        height: global.CONSTANTS.HEIGHT,
        backgroundColor: global.COLOR.BLACK40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    alertContainer: {
        width: global.CONSTANTS.MODAL_316,
        height: global.CONSTANTS.MODAL_194,
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
});

export default Lobby;

const followType = [ '', 'Follow', 'Following', 'Follow back' ];
