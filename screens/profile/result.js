import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Modal, Pressable, ScrollView, StatusBar } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import { ProgressBar } from 'react-native-paper';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';

import { useSelector } from 'react-redux';
import { getRaceLeaderBoard } from '../../utils/api';
import { convertFloat, displayPace } from '../../utils/func';

const Result = (props) => {

    const userId = useSelector(state => state.user.userId);
    const accessToken = useSelector(state => state.user.accessToken);
    const canRank = useSelector(state => state.run.canRank);
    const unit = useSelector(state => state.setting.unit);
    const roomId = useSelector(state => state.run.boardId);
    const distance = useSelector(unit == 1 ? state => state.run.boardDistanceMiles : state => state.run.boardDistanceKilometers);

    const [data, setData] = useState([]);
    const [rank, setRank] = useState(1);
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const [avgPace, setAvgPace] = useState(0);
    const [isToggle, setToggle] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [current, setCurrent] = useState(new Date());

    useEffect(() => {
        StatusBar.setHidden(true);
    }, []);

    const setTimeInfo = (ts) => {
        let tm = Math.floor(ts % 3600 / 60);
        let th = Math.floor(ts / 3600);
        setHour(th);
        setMin(tm);
        setSec(Math.floor(ts % 60));
    }

    useEffect(() => {
        if(isToggle) {
            if(canRank) {
                let target = [];
                const idx = data.findIndex(item => item.runnerId === userId);
                const targetAgeGroup = data[idx].runnerAgeGroup;
                const targetGender = data[idx].runnerGender;

                data.forEach(item => {
                    if(item.runnerAgeGroup == targetAgeGroup && item.runnerGender == targetGender)
                        target.push(item);
                });
                setData(target);
                const index = target.findIndex(item => item.runnerId === userId);
                if(index > -1) {
                    setRank(index + 1);
                    //setAvgPace(unit == 1 ? target[index].averagePaceMiles : target[index].averagePaceKilometers);
                    //setTimeInfo(target[index].runTimeInSeconds);
                }
            } else {
                setAlertVisible(true);
                setToggle(false);
            }
        } else {
            getRaceLeaderBoard(roomId, 1, 500, accessToken).then(result => {
                if(result != null) {
                    const idx = result.findIndex(item => item.runnerId === userId);
                    if(idx > -1) {
                        setRank(idx + 1);
                        setAvgPace(unit == 1 ? result[idx].averagePaceMiles : result[idx].averagePaceKilometers);
                        setTimeInfo(result[idx].runTimeInSeconds);
                    }

                    setData(result);
                }
            });
        }
    }, [isToggle]);

    useEffect(() => {
        const timer = setInterval(() => setCurrent(new Date()), 5000);

        getRaceLeaderBoard(roomId, 1, 500, accessToken).then(result => {
            if(result != null) {
                const idx = result.findIndex(item => item.runnerId === userId);
                if(isToggle) {
                    let target = [];
                    const targetAgeGroup = result[idx].runnerAgeGroup;
                    const targetGender = result[idx].runnerGender;

                    result.forEach(item => {
                        if(item.runnerAgeGroup == targetAgeGroup && item.runnerGender == targetGender)
                            target.push(item);
                    });
                    setData(target);
                    const index = target.findIndex(item => item.runnerId === userId);
                    if(index > -1)
                        setRank(index + 1);
                } else {
                    if(idx > -1) {
                        setRank(idx + 1);
                        setAvgPace(unit == 1 ? result[idx].averagePaceMiles : result[idx].averagePaceKilometers);
                        setTimeInfo(result[idx].runTimeInSeconds);
                    }
                    setData(result);
                }
            }
        });

        return () => clearInterval(timer);
    }, [current]);

    const pressBackAction = () => {
        props.navigation.navigate('Account');
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
                        <Text style={styles.titleDistance}>FINISHED</Text>
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
                            <Text style={styles.valueText}>{convertFloat(distance)}</Text>
                            <Text style={[styles.indexText, { marginHorizontal: 5, paddingBottom: 2 }]}>{unit == 1 ? 'miles' : 'km'}</Text>
                            <Text style={styles.valueText}>100.0</Text>
                            <Text style={[styles.indexText, { marginHorizontal: 5, paddingBottom: 2 }]}>%</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.cell}>
                        <Text style={styles.indexText}>Current Pace</Text>
                        <View style={styles.valueContainer}>
                            <Text style={[styles.valueText, { letterSpacing: 1.5 }]}>--:--</Text>
                            <Text style={[styles.indexText, { marginLeft: 10 }]}>{'min / ' + (unit == 1 ? 'mile' : 'km')}</Text>
                        </View>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.indexText}>Average Pace</Text>
                        <View style={styles.valueContainer}>
                            <Text style={[styles.valueText, { letterSpacing: 1.5 }]}>{displayPace(avgPace)}</Text>
                            <Text style={[styles.indexText, { marginLeft: 5 }]}>{'min / ' + (unit == 1 ? 'mile' : 'km')}</Text>
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
                                <View key={item.runnerId}>
                                    <ProgressBar
                                        progress={ unit == 1 ? item.runDistanceMiles / distance : item.runDistanceKilometers / distance }
                                        color={ global.COLOR.SECONDARY }
                                        style={{ backgroundColor: item.runnerId == userId ? global.COLOR.STATUS_INACTIVE : 'white' }}
                                    />
                                    <View style={[styles.listItemContainer, { backgroundColor: item.runnerId == userId ? global.COLOR.STATUS_INACTIVE : 'white' }]}>
                                        <Image source={item.runnerPicture == null ? global.IMAGE.UNKNOWN : {uri: item.runnerPicture}} style={styles.avatar}/>
                                        <View style={styles.infoContainer}>
                                            <Text style={styles.nameText}>{item.runnerFirstName + ' ' + item.runnerLastName}</Text>
                                            <Pressable style={item.runnerId == userId ? [styles.followBadge, { backgroundColor: 'transparent' }] : item.followingStatus == 1 ? styles.followBadge : item.followingStatus == 2 ? styles.followingBadge : styles.followbackBadge }>
                                                <Text style={[styles.followText, { color: item.followingStatus == 2 ? 'white' : global.COLOR.PRIMARY100 }]}>{item.runnerId == userId ? '' : followType[item.followingStatus]}</Text>
                                            </Pressable>
                                        </View>
                                        <View style={styles.stateContainer}>
                                            <View style={styles.runInfo}>
                                                <View style={[styles.infoItem, { marginBottom: 6 }]}>
                                                    <Text style={styles.indexText}>Dist:</Text>
                                                    <Text style={styles.infoText}>{unit == 1 ? convertFloat(item.runDistanceMiles) + ' miles' : convertFloat(item.runDistanceKilometers) + ' km'}</Text>
                                                </View>
                                                <View style={styles.infoItem}>
                                                    <Text style={styles.indexText}>Avg pace:</Text>
                                                    <Text style={styles.infoText}>{unit == 1 ? displayPace(item.averagePaceMiles) : displayPace(item.averagePaceKilometers)}</Text>
                                                </View>
                                            </View>
                                            <View style={[styles.rankBadge, { backgroundColor: item.runnerId == userId ? global.COLOR.PRIMARY100 : global.COLOR.STATUS_INACTIVE }]}>
                                                <Text style={[styles.rankText, { color: item.runnerId == userId ? 'white' : global.COLOR.PRIMARY100 }]}>{'' + (index + 1)}</Text>
                                            </View>
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
    headerRank: {
        fontFamily: 'FuturaT',
        fontSize: 34,
        letterSpacing: -1,
        color: global.COLOR.PRIMARY100,
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
        letterSpacing: -1,
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
        marginBottom: 3,
    },
    stateContainer: {
        position: 'absolute',
        right: global.CONSTANTS.SIZE_20,
        flexDirection: 'row',
    },
    runInfo: {
        justifyContent: 'center',
        marginRight: global.CONSTANTS.SIZE_20,
    },
    infoItem: {
        flexDirection: 'row',
        width: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoText: {
        fontFamily: 'SFProMedium',
        fontSize: 12,
        fontStyle: 'italic',
        color: global.COLOR.PRIMARY100,
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
    modalContainer: {
        position: 'absolute',
        width: global.CONSTANTS.WIDTH * 0.9,
        height: global.CONSTANTS.WIDTH * 0.9,
        backgroundColor: 'white',
        borderRadius: 35,
        paddingHorizontal: 32,
        paddingTop: 60,
        paddingBottom: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalTitle: {
        fontFamily: 'SFProBold',
        fontSize: 24,
        letterSpacing: -0.7,
        lineHeight: 28,
        color: global.COLOR.PRIMARY100,
        textAlign: 'center',
    },
    modalIndicator: {
        fontFamily: 'SFProRegular',
        fontSize: 16,
        color: global.COLOR.PRIMARY70,
        letterSpacing: -0.6,
        lineHeight: 24,
        textAlign: 'center',
        marginTop: 17,
    },
    submitButton: {
        width: '100%',
        height: global.CONSTANTS.SIZE_60,
        backgroundColor: global.COLOR.PRIMARY100,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    submitText: {
        fontFamily: 'SFProMedium',
        fontSize: 16,
        color: 'white',
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

export default Result;

const followType = [ '', 'Follow', 'Following', 'Follow back' ];
