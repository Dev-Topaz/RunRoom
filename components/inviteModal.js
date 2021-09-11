import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Modal, TouchableOpacity, Pressable, FlatList, ActivityIndicator } from 'react-native';
import SvgIcon from './svgIcon';
import global from '../global';
import css from '../css';

import { findIndex } from '../utils/func';
import { getAllConnections, getFollowings, getFollowers, follow, stopFollowing } from '../utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { clickInvite } from '../store/actions/actions';

const InviteModal = (props) => {

    const accessToken = useSelector(state => state.user.accessToken);
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');
    const [isFollower, setFollower] = useState(true);
    const [isFollowing, setFollowing] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [inviteList, setInviteList] = useState([]);
    const [isSelected, setSelected] = useState(false);

    useEffect(() => {
        setLoading(true);
        if(isFollower && isFollowing) {
            getAllConnections(page, 9, searchText, accessToken).then(result => {
                if(result != null) {
                    if(page != 1)
                        setData([...data, ...result]);
                    else
                        setData(result);
                }
                setLoading(false);
            });
        } else if(isFollower && !isFollowing) {
            getFollowers(page, 9, searchText, accessToken).then(result => {
                if(result != null) {
                    if(page != 1)
                        setData([...data, ...result]);
                    else
                        setData(result);
                }
                setLoading(false);
            });
        } else if(!isFollower && isFollowing) {
            getFollowings(page, 9, searchText, accessToken).then(result => {
                if(result != null) {
                    if(page != 1)
                        setData([...data, ...result]);
                    else
                        setData(result);
                }
                setLoading(false);
            });
        } else {
            //getAllUsers(page, 9, searchText, accessToken).then(result => {
            //    if(result != null) {
            //        if(page != 1)
            //            setData([...data, ...result]);
            //        else
            //            setData(result);
            //    }
            //    setLoading(false);
            //});
            //setData([]);
            setLoading(false);
        }
        setLoading(false);
    }, [page]);

    useEffect(() => {
        setPage(1);
        setLoading(true);
        if(isFollower && isFollowing) {
            getAllConnections(1, 8, searchText, accessToken).then(result => {
                if(result != null) {
                    setData(result);
                }
                setLoading(false);
            });
        } else if(isFollower && !isFollowing) {
            getFollowers(1, 8, searchText, accessToken).then(result => {
                if(result != null) {
                    setData(result);
                }
                setLoading(false);
            });
        } else if(!isFollower && isFollowing) {
            getFollowings(1, 8, searchText, accessToken).then(result => {
                if(result != null) {
                    setData(result);
                }
                setLoading(false);
            });
        } else {
            //getAllUsers(page, 8, searchText, accessToken).then(result => {
            //    if(result != null) {
            //        setData(result);
            //    }
            //    setLoading(false);
            //});
            //setData([]);
            setLoading(false);
        }
        setLoading(false);
    }, [searchText, isFollower, isFollowing]);

    useEffect(() => {
        if(inviteList.length > 0)
            setSelected(true);
        else
            setSelected(false);
    }, [inviteList]);

    const pressInviteAction = (index) => {
        const target = data[index];
        const inviteGroup = [...inviteList];
        let idx = findIndex(target, inviteGroup);
        if(idx > -1) {
            inviteGroup.splice(idx, 1);
            setInviteList(inviteGroup);
        } else {
            inviteGroup.push(target);
            setInviteList(inviteGroup);
        }
    }

    const pressFollowAction = (index) => {
        let target = [...data];
        
        switch(target[index].followingStatus) {
            case 1:
                follow(target[index].connectedUserId, accessToken).then(result => {
                    if(result) {
                        target[index].followingStatus = 2;
                        setData(target);
                    }
                });
                return;
            case 2:
                stopFollowing(target[index].connectedUserId, accessToken).then(result => {
                    if(result != null) {
                        target[index].followingStatus = result;
                        setData(target);
                    }
                });
                return;
            case 3:
                follow(target[index].connectedUserId, accessToken).then(result => {
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
        props.onChangeVisible(false);
    }

    const pressGroupButton = (index) => {
        if(index == 1) {
            if(isFollowing)
                setFollower(!isFollower);
        } else {
            if(isFollower)
                setFollowing(!isFollowing);
        }
    }

    const pressInviteAllAction = () => {
        if(isSelected) {
            props.onChangeValue(inviteList);
            props.onChangeVisible(false);
        } else {
            props.onChangeValue(data);
            props.onChangeVisible(false);
        }
    }

    const pressInviteHereAction = () => {
        dispatch(clickInvite('Create'));
        props.navigation.navigate('InviteFriend');
    }

    const renderItem = ({item, index}) => (
        <View key={item.connectedUserId} style={css.listItemContainer}>
            <Image source={item.picture == null ? global.IMAGE.UNKNOWN : { uri: item.picture }} style={css.hostAvatar}/>
            <View style={css.infoContainer}>
                <Text style={css.labelText}>{item.firstName + ' ' + item.lastName}</Text>
                <Text style={css.infoText}>{item.runningLocation == null ? '' : item.runningLocation}</Text>
                <Text style={css.infoText}>{item.runsCompleted + (item.runsCompleted == 1 ? ' Run completed' : ' Runs completed')}</Text>
            </View>
            <View style={css.buttonGroupContainer}>
                <Pressable style={[css.inviteButton, { marginRight: 5, backgroundColor: findIndex(item, inviteList) > -1 ? global.COLOR.SECONDARY : global.COLOR.BACKGROUND }]} onPress={() => pressInviteAction(index)}>
                    <Text style={[css.inviteButtonText, { color: findIndex(item, inviteList) > -1 ? 'white' : global.COLOR.PRIMARY100 }]}>{findIndex(item, inviteList) > -1 ? 'Inviting' : 'Invite'}</Text>
                </Pressable>
                <Pressable style={[css.inviteButton, { backgroundColor: item.followingStatus == 1 ? global.COLOR.STATUS_INACTIVE : item.followingStatus == 2 ? global.COLOR.SECONDARY : 'transparent', borderWidth: 1, borderColor: item.followingStatus  == 1 ? global.COLOR.STATUS_INACTIVE : global.COLOR.SECONDARY }]} onPress={() => pressFollowAction(index)}>
                    <Text style={[css.inviteButtonText, { color: item.followingStatus == 2 ? 'white' : global.COLOR.PRIMARY100 }]}>{followType[item.followingStatus]}</Text>
                </Pressable>
            </View>
        </View>
    );

    return (
        <Modal
            animationType='slide'
            transparent
            visible={props.visible}
            onRequestClose={() => {}}
            onShow={() => setInviteList(props.data)}
        >
            <View style={css.overlay}>
                <View style={css.modalContainer854}>
                    <View style={css.modalHeader}>
                        <Text style={css.modalTitleText}>Invite Connections</Text>
                        <Pressable style={css.modalBackButton} onPress={pressBackAction}>
                            <SvgIcon icon='Back'/>
                        </Pressable>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <View style={css.searchInputContainer}>
                            <SvgIcon icon='Search'/>
                            <TextInput
                                style={{ fontFamily: 'SFProRegular', fontSize: 17, marginLeft: 10 }}
                                placeholder='Search'
                                value={ searchText }
                                onChangeText={text => setSearchText(text)}
                            />
                        </View>
                        <View style={css.toggleContainer}>
                            <Pressable style={[css.toggleButton, { backgroundColor: isFollower ? global.COLOR.PRIMARY100 : global.COLOR.BACKGROUND, marginRight: 1 }]} onPress={() => pressGroupButton(1)}>
                                <Text style={[css.typeText, { color: isFollower ? 'white' : global.COLOR.PRIMARY100 }]}>Followers</Text>
                            </Pressable>
                            <Pressable style={[css.toggleButton, { backgroundColor: isFollowing ? global.COLOR.PRIMARY100 : global.COLOR.BACKGROUND, marginLeft: 1 }]} onPress={() => pressGroupButton(2)}>
                                <Text style={[css.typeText, { color: isFollowing ? 'white' : global.COLOR.PRIMARY100 }]}>Following</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            onEndReachedThreshold={0.2}
                            keyExtractor={item => item.connectedUserId}
                            refreshing={loading}
                            onRefresh={() => setPage(1)}
                            onEndReached={() => setPage(page => page + 1)}
                            ItemSeparatorComponent={null}
                            ListFooterComponent={() => loading && page != 1 ? <View style={styles.listFooter}><ActivityIndicator animating size='large'/></View> : null}
                        />
                    </View>
                    <View style={styles.modalFooter}>
                        <TouchableOpacity style={[css.submitButton, { width: '100%' }]} onPress={pressInviteAllAction}>
                            <Text style={css.submitText}>{isSelected ? 'INVITE SELECTION' : 'INVITE ALL'}</Text>
                        </TouchableOpacity>
                        <View style={styles.indicatorContainer}>
                            <Text style={[css.hostLabel, { letterSpacing: -0.3 }]}>Cannot find connection? Invite a friend by clicking</Text>
                            <TouchableOpacity style={{ marginLeft: 5 }} onPress={pressInviteHereAction}>
                                <Text style={styles.hereText}>HERE ⮕</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalFooter: {
        width: global.CONSTANTS.WIDTH,
        alignItems: 'center',
        bottom: 0,
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 35,
        backgroundColor: global.COLOR.WHITE85,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    hereText: {
        fontFamily: 'SFProBold',
        fontSize: 12,
        color: global.COLOR.PRIMARY100,
    },
    listFooter: {
        paddingVertical: 20,
    },
});

export default React.memo(InviteModal);

const followType = [ '', 'Follow', 'Following', 'Follow back'];