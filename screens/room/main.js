import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground, FlatList, ActivityIndicator, Pressable, Alert, StatusBar } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { Badge } from 'react-native-elements';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';
import css from '../../css';
import { convertFloat, getRemainTimeStyle, displayRemainTime, displayRunDateTime } from '../../utils/func';
import FollowModal from '../../components/followModal';
import FilterModal from '../../components/filterModal';
import Loading from '../../components/loading';

import { useSelector, useDispatch } from 'react-redux';
import { getAllRunRooms, joinRun, disjoinRun, enterLobby } from '../../utils/api';
import { changeRoom } from '../../store/actions/actions';

const RoomMain = (props) => {

    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.user.accessToken);
    const userId = useSelector(state => state.user.userId);
    const unit = useSelector(state => state.setting.unit);

    const [followVisible, setFollowVisible] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);
    const [follower, setFollower] = useState([]);

    const [isEmpty, setEmpty] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState(new Date());
    const [filterOption, setFilterOption] = useState({
        invited: false,
        participating: false,
        organized: false,
        startValue: 0,
        endValue: 100,
        unit: 1,
        dateValue: new Date(),
    });
    const [isFilterChanged, setFilterChanged] = useState(false);

    useEffect(() => {
        StatusBar.setHidden(true);
        const listener = props.navigation.addListener('didFocus', () => {
            setLoaded(false);
            setPage(1);
            setLoading(true);
            getAllRunRooms(1, 3, accessToken, filterOption).then(result => {
                if(result != null) {
                
                    let res = [...result];
                    res.forEach(item => {
                        const idx = item.runners.findIndex(element => userId == element.runnerId);
                        if(idx > -1)
                            item.runners.splice(idx, 1);
                    });

                    while(true) {
                        if(res.length < 1) {
                            setData([]);
                            break;
                        }
                        if(getRemainTimeStyle(new Date(), res[0].runDateTime) > 3) {
                            res.shift();
                        } else {
                            setData(res);
                            break;
                        }
                    }

                }
                setLoading(false);
                setLoaded(true);
            });
            setLoading(false);
        });

        return () => listener.remove();
    }, []);

    useEffect(() => {
        setLoaded(false);
        setPage(1);
        setLoading(true);
        getAllRunRooms(1, 3, accessToken, filterOption).then(result => {
            if(result != null) {

                let res = [...result];
                res.forEach(item => {
                    const idx = item.runners.findIndex(element => userId == element.runnerId);
                    if(idx > -1)
                        item.runners.splice(idx, 1);
                });
                setData(res);
            }
            setLoading(false);
            setLoaded(true);
        });
        setLoading(false);

        if(filterOption.organized == true || filterOption.participating == true || filterOption.invited == true || filterOption.startValue != 0 || filterOption.endValue != 100)
            setFilterChanged(true);
        else
            setFilterChanged(false);
    }, [filterOption]);

    useEffect(() => {
        setLoading(true);
        getAllRunRooms(page, 3, accessToken, filterOption).then(result => {
            if(result != null) {
                
                let res = [...result];
                res.forEach(item => {
                    const idx = item.runners.findIndex(element => userId == element.runnerId);
                    if(idx > -1)
                        item.runners.splice(idx, 1);
                });

                if(page != 1)
                    setData([...data, ...res]);
                else
                    setData(res);
            }
            setLoading(false);
        });
        setLoading(false);
    }, [page]);

    useEffect(() => {
        const timer = setInterval(() => {setCurrent(new Date())}, 30000);
        let target = [...data];

        while(true) {
            if(target.length < 1) {
                setData([]);
                break;
            }
            if(getRemainTimeStyle(current, target[0].runDateTime) > 3) {
                target.shift();
            } else {
                setData(target);
                break;
            }
        }

        return () => clearInterval(timer);
    }, [current]);

    useEffect(() => {
        if(data.length < 1)
            setEmpty(true);
        else
            setEmpty(false);
    }, [data]);

    const pressParticipateAction = (roomId, index) => {
        const joinInfo = {
            runnerId: userId,
            runRoomId: roomId,
        };
        joinRun(joinInfo, accessToken).then(result => {
            if(result) {
                let target = [...data];
                target[index].isParticipating = true;
                setData(target);
            } else {
                Alert.alert('ERROR', 'There is an error in joining a room.');
            }
        });
    }

    const pressParticipatingAction = (roomId, index) => {
        const disjoinInfo = {
            runnerId: userId,
            runRoomId: roomId,
        };
        disjoinRun(disjoinInfo, accessToken).then(result => {
            if(result) {
                let target = [...data];
                target[index].isParticipating = false;
                setData(target);
            } else {
                Alert.alert('ERROR', 'There is an error in disjoining a room.');
            }
        });
    }

    const pressLobbyAction = (roomId, runDateTime, distMile, distKilo) => {
        const distance = unit == 1 ? distMile : distKilo;
        dispatch(changeRoom(roomId, runDateTime, distance, 'Room'));
        enterLobby(userId, roomId, accessToken).then(result => {
            if(result) {
                props.navigation.navigate('Race');
            } else {
                Alert.alert('ERROR', 'There is an error in entering a lobby.');
            }
        });
    }

    const pressFollowingAction = (data) => {
        setFollower(data);
        setFollowVisible(true);
    }

    const renderItem = ({ item, index }) => (
        <View key={item.id} style={css.card}>
            <ImageBackground source={stockImages[item.stockImageID]} style={css.cardThumbnail}>
                <View style={css.thumbOverlay}>
                    <View style={css.leftTop}>
                        <Text style={css.thumbRunnerText}>{item.totalRunnersCount + (item.totalRunnersCount  == 1 ? ' Runner' : ' Runners')}</Text>
                        <Text style={css.thumbDistanceText}>{convertFloat(unit == 1 ? item.runDistanceMiles : item.runDistanceKilometers, 1, true) + (unit == 1 ? ' MI' : ' KM')}</Text>
                    </View>
                    <View style={css.rightBottom}>
                        <Text style={css.typeSymbol}>●</Text>
                        <Text style={css.typeText}>{item.roomType == 1 ? 'PUBLIC' : 'PRIVATE'}</Text>
                    </View>
                    <View style={css.leftBottom}>
                        <Text style={css.thumbDateText}>{getRemainTimeStyle(current, item.runDateTime) > 3 ? null : displayRunDateTime(current, item.runDateTime)}</Text>
                        {
                            getRemainTimeStyle(current, item.runDateTime) == 1 ?
                                <Text style={css.thumbRemainText2}>{displayRemainTime(current, item.runDateTime)}</Text>
                            : getRemainTimeStyle(current, item.runDateTime) == 2 ?
                                <Text style={css.thumbRemainText1}>{displayRemainTime(current, item.runDateTime)}</Text>
                            :   <Text style={css.thumbRemainText3}>{displayRemainTime(current, item.runDateTime)}</Text>
                        }
                    </View>
                    <View style={css.rightTop}>
                        <Pressable style={{ flexDirection: 'row' }} onPress={() => pressFollowingAction(item.runners)}>
                            {
                                item.runners.length > 3 ?
                                    <View>
                                        <View style={[css.badge, {right: 0}]}>
                                            <Text style={css.badgeText}>{'+' + (item.runners.length - 3)}</Text>
                                        </View>
                                        <Image source={item.runners[2].runnerPicture == null ? unknown : {uri: item.runners[2].runnerPicture}} style={[css.followAvatar, {right: 25}]}/>
                                        <Image source={item.runners[1].runnerPicture == null ? unknown : {uri: item.runners[1].runnerPicture}} style={[css.followAvatar, {right: 48}]}/>
                                        <Image source={item.runners[0].runnerPicture == null ? unknown : {uri: item.runners[0].runnerPicture}} style={[css.followAvatar, {right: 70}]}/>
                                    </View>
                                : item.runners.map((runner, idx = 0) => {
                                    return (
                                        <Image key={idx} source={runner.runnerPicture == null ? unknown : {uri: runner.runnerPicture}} style={[css.followAvatar, {right: 25*idx++}]}/>
                                    );
                                })
                            }
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>
            <View style={css.cardInfoContainer}>
                <Image source={item.organizerDetails.runnerPicture == null ? unknown : {uri: item.organizerDetails.runnerPicture}} style={css.hostAvatar}/>
                <View style={css.hostInfo}>
                    <Text style={css.hostName}>{item.organizerDetails.runnerFirstName + ' ' + item.organizerDetails.runnerLastName}</Text>
                    <View style={css.hostInvited}>
                        <Text style={css.hostLabel}>Host</Text>
                        <Text style={css.hostLabel}>{item.invitationType == 1 ? '  •  ' : ''}</Text>
                        <Text style={css.inviteLabel}>{item.invitationType == 1 ? 'Invited' : ''}</Text>
                    </View>
                </View>
                <View style={css.participateStatus}>
                    {
                        item.isParticipating ? getRemainTimeStyle(current, item.runDateTime) < 3 ?
                            <TouchableOpacity style={css.participatingContainer} onPress={() => pressParticipatingAction(item.id, index)}>
                                <SvgIcon icon='CheckCircle'/>
                                <Text style={css.participatingText}>PARTICIPATING</Text>
                            </TouchableOpacity>
                        :   <View style={css.enterLobbyContainer}>
                                <TouchableOpacity style={css.enterLobbyButton} onPress={() => pressLobbyAction(item.id, item.runDateTime, item.runDistanceMiles, item.runDistanceKilometers)}>
                                    <Text style={css.enterLobbyText}>Enter Lobby  ➜</Text>
                                </TouchableOpacity>
                            </View>
                        :   <TouchableOpacity style={css.participateButton} onPress={() => pressParticipateAction(item.id, index)}>
                                <Text style={css.participateText}>PARTICIPATE</Text>
                            </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    );

    if(!isLoaded)
        return (<Loading/>);

    return (
        <View style={{ flex: 1, backgroundColor: global.COLOR.BACKGROUND }}>
            <View style={css.mainHeader}>
                <View style={css.mainTitleContainer}>
                    <Text style={[css.titleText, { color: global.COLOR.HEADER_TITLE }]}>RUNROOMS</Text>
                    <Pressable onPress={() => setFilterVisible(true)}>
                        <SvgIcon icon='Filter'/>
                        {
                            isFilterChanged ? <Badge status='success' containerStyle={{ position: 'absolute', top: -1, right: -1 }}/> : null
                        }
                    </Pressable>
                </View>
            </View>
            {
                isEmpty ?
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No RunRooms Found</Text>
                    </View>
                :   <FlatList
                        data={ data }
                        renderItem={ renderItem }
                        onEndReachedThreshold={ 0.2 }
                        keyExtractor={ item => item.id }
                        refreshing={ loading }
                        onRefresh={ () => setPage(1) }
                        onEndReached={ () => setPage(page => page + 1) }
                        ItemSeparatorComponent={ null }
                        ListFooterComponent={ () => loading && page != 1 ? <View style={styles.listFooter}><ActivityIndicator animating size='large'/></View> : null }
                    />
            }
            <FloatingAction
                color={ global.COLOR.PRIMARY100 }
                distanceToEdge={ global.CONSTANTS.SIZE_20 }
                showBackground={ false }
                animated={ false }
                onPressMain={ () => props.navigation.navigate('Create') }
            />
            <FollowModal
                data={ follower }
                visible={ followVisible }
                onChangeVisible={ setFollowVisible }
            />
            <FilterModal
                visible={ filterVisible }
                onChangeVisible={ setFilterVisible }
                onChangeValue={ setFilterOption }
                value = { filterOption }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontFamily: 'SFProBold',
        fontSize: 24, 
        color: global.COLOR.PRIMARY100,
    },
    listFooter: {
        paddingVertical: 20,
    },
});

export default RoomMain;

const stockImages = [
    global.IMAGE.STOCK.STOCK_1,
    global.IMAGE.STOCK.STOCK_2,
    global.IMAGE.STOCK.STOCK_3,
    global.IMAGE.STOCK.STOCK_4,
    global.IMAGE.STOCK.STOCK_5,
    global.IMAGE.STOCK.STOCK_6,
    global.IMAGE.STOCK.STOCK_7,
    global.IMAGE.STOCK.STOCK_8,
    global.IMAGE.STOCK.STOCK_9,
    global.IMAGE.STOCK.STOCK_10,
    global.IMAGE.STOCK.STOCK_11,
    global.IMAGE.STOCK.STOCK_12,
    global.IMAGE.STOCK.STOCK_13,
    global.IMAGE.STOCK.STOCK_14,
    global.IMAGE.STOCK.STOCK_15,
    global.IMAGE.STOCK.STOCK_16,
    global.IMAGE.STOCK.STOCK_17,
    global.IMAGE.STOCK.STOCK_18,
    global.IMAGE.STOCK.STOCK_19,
];

const unknown = global.IMAGE.UNKNOWN;
