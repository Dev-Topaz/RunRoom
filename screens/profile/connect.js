import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Pressable, TouchableOpacity, FlatList, Modal } from 'react-native';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';
import css from '../../css';

import { useSelector, useDispatch } from 'react-redux';
import { getAllConnections, getFollowings, getFollowers, follow, stopFollowing } from '../../utils/api';
import { clickInvite } from '../../store/actions/actions';


const ProfileConnection = (props) => {

    const accessToken = useSelector(state => state.user.accessToken);
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');
    const [isFollower, setFollower] = useState(true);
    const [isFollowing, setFollowing] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [isKB, setKB] = useState(false);

    useEffect(() => {
        setLoading(true);
        if(isFollower && isFollowing) {
            getAllConnections(page, 8, searchText, accessToken).then(result => {
                if(result != null) {
                    if(page != 1)
                        setData([...data, ...result]);
                    else
                        setData(result);
                }
                setLoading(false);
            });
        } else if(isFollower && !isFollowing) {
            getFollowers(page, 8, searchText, accessToken).then(result => {
                if(result != null) {
                    if(page != 1)
                        setData([...data, ...result]);
                    else
                        setData(result);
                }
                setLoading(false);
            });
        } else if(!isFollower && isFollowing) {
            getFollowings(page, 8, searchText, accessToken).then(result => {
                if(result != null) {
                    if(page != 1)
                        setData([...data, ...result]);
                    else
                        setData(result);
                }
                setLoading(false);
            });
        } else {
            //getAllUsers(page, 8, searchText, accessToken).then(result => {
            //    if(result != null) {
            //        if(page != 1)
            //            setData([...data, ...result]);
            //        else
            //            setData(result);
            //    }
            //    setLoading(false);
            //});
            setData([]);
            setLoading(false);
        }
        setLoading(false);
    }, [page]);

    useEffect(() => {
        setPage(1);
        setLoading(true);
        if(isFollower && isFollowing) {
            getAllConnections(page, 8, searchText, accessToken).then(result => {
                if(result != null) {
                    setData(result);
                }
                setLoading(false);
            });
        } else if(isFollower && !isFollowing) {
            getFollowers(page, 8, searchText, accessToken).then(result => {
                if(result != null) {
                    setData(result);
                }
                setLoading(false);
            });
        } else if(!isFollower && isFollowing) {
            getFollowings(page, 8, searchText, accessToken).then(result => {
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

    const pressGroupButton = (index) => {
        if(index == 1) {
            if(isFollowing)
                setFollower(isFollower => !isFollower);
        } else {
            if(isFollower)
                setFollowing(isFollowing => !isFollowing);
        }
    }

    const pressInviteAction = () => {
        dispatch(clickInvite('Account'));
        props.navigation.navigate('InviteFriend');
    }

    const renderItem = ({item, index}) => (
        <View key={item.connectedUserId} style={css.listItemContainer}>
            <Image source={item.picture == null ? global.IMAGE.UNKNOWN : { uri: item.picture }} style={css.hostAvatar}/>
            <View style={css.infoContainer}>
                <Text style={css.labelText}>{item.firstName + ' ' + item.lastName}</Text>
                <Text style={css.infoText}>{item.runningLocation == null ? '' : item.runningLocation}</Text>
                <Text style={css.infoText}>{item.runsCompleted + (item.runsCompleted < 2 ? ' Run completed' : ' Runs completed')}</Text>
            </View>
            <View style={css.buttonGroupContainer}>
                <Pressable style={[css.inviteButton, { backgroundColor: item.followingStatus == 1 ? global.COLOR.STATUS_INACTIVE : item.followingStatus == 2 ? global.COLOR.SECONDARY : 'transparent', borderWidth: 1, borderColor: item.followingStatus  == 1 ? global.COLOR.STATUS_INACTIVE : global.COLOR.SECONDARY }]} onPress={() => pressFollowAction(index)}>
                    <Text style={[css.inviteButtonText, { color: item.followingStatus == 2 ? 'white' : global.COLOR.PRIMARY100 }]}>{followType[item.followingStatus]}</Text>
                </Pressable>
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1, paddingTop: global.CONSTANTS.SIZE_20, backgroundColor: 'white' }}>
            <View style={css.searchInputContainer}>
                <SvgIcon icon='Search'/>
                <Pressable style={{ width: '100%' }} onPress={() => setKB(true)}>
                    <TextInput
                        style={{ fontFamily: 'SFProRegular', fontSize: 17, marginLeft: 10 }}
                        placeholder='Search'
                        value={ searchText }
                        editable={false}
                        pointerEvents='none'
                    />
                </Pressable>
            </View>
            <View style={css.toggleContainer}>
                <Pressable style={[css.toggleButton, { backgroundColor: isFollower ? global.COLOR.PRIMARY100 : global.COLOR.BACKGROUND }]} onPress={() => pressGroupButton(1)}>
                    <Text style={[css.typeText, { color: isFollower ? 'white' : global.COLOR.PRIMARY100 }]}>Followers</Text>
                </Pressable>
                <Pressable style={[css.toggleButton, { backgroundColor: isFollowing ? global.COLOR.PRIMARY100 : global.COLOR.BACKGROUND }]} onPress={() => pressGroupButton(2)}>
                    <Text style={[css.typeText, { color: isFollowing ? 'white' : global.COLOR.PRIMARY100 }]}>Following</Text>
                </Pressable>
            </View>
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
            <View style={styles.bottomContainer}>
                <Text style={[css.hostLabel, { letterSpacing: -0.3 }]}>Cannot find connection? Invite a friend by clicking</Text>
                <TouchableOpacity style={{ marginLeft: 5 }} onPress={pressInviteAction}>
                    <Text style={styles.hereText}>HERE ⮕</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType='slide'
                visible={isKB}
                transparent
                onRequestClose={() => {}}
            >
                <View style={styles.overlay}>
                    <TextInput
                        autoFocus
                        value={searchText}
                        style={{ position: 'absolute', bottom: 1 }}
                        onChangeText={text => setSearchText(text)}
                        onSubmitEditing={() => setKB(false)}
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    listFooter: {
        paddingVertical: 20,
    },
    overlay: {
        width: global.CONSTANTS.WIDTH,
        height: global.CONSTANTS.HEIGHT,
        backgroundColor: 'transparent',
    },
    bottomContainer: {
        flexDirection: 'row',
        width: global.CONSTANTS.WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: global.COLOR.WHITE85,
    },
    hereText: {
        fontFamily: 'SFProBold',
        fontSize: 12,
        color: global.COLOR.PRIMARY100,
    },
});

export default ProfileConnection;

const followType = [ '', 'Follow', 'Following', 'Follow back' ];