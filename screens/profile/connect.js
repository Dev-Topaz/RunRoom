import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Pressable, FlatList } from 'react-native';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';
import css from '../../css';

import { useSelector } from 'react-redux';
import { getAllConnections, getAllUsers, getFollowings, getFollowers, follow, stopFollowing } from '../../utils/api';
import { findIndex } from '../../utils/func';

const ProfileConnection = (props) => {

    const accessToken = useSelector(state => state.user.accessToken);

    const [searchText, setSearchText] = useState('');
    const [isFollower, setFollower] = useState(false);
    const [isFollowing, setFollowing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        if(isFollower && isFollowing) {
            getAllConnections(page, 8, searchText, accessToken).then(result => {
                if(result != null && result.length > 0) {
                    if(page != 1)
                        setData([...data, ...result]);
                    else
                        setData(result);
                }
                setLoading(false);
            });
        } else if(isFollower && !isFollowing) {
            getFollowers(page, 8, searchText, accessToken).then(result => {
                if(result != null && result.length > 0) {
                    if(page != 1)
                        setData([...data, ...result]);
                    else
                        setData(result);
                }
                setLoading(false);
            });
        } else if(!isFollower && isFollowing) {
            getFollowings(page, 8, searchText, accessToken).then(result => {
                if(result != null && result.length > 0) {
                    if(page != 1)
                        setData([...data, ...result]);
                    else
                        setData(result);
                }
                setLoading(false);
            });
        } else {
            getAllUsers(page, 8, searchText, accessToken).then(result => {
                if(result != null && result.length > 0) {
                    if(page != 1)
                        setData([...data, ...result]);
                    else
                        setData(result);
                }
                setLoading(false);
            });
        }
        setLoading(false);
    }, [page]);

    useEffect(() => {
        setPage(1);
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
        <View style={{ flex: 1, paddingTop: global.CONSTANTS.SIZE_20 }}>
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
                <Pressable style={[css.toggleButton, { backgroundColor: isFollower ? global.COLOR.PRIMARY100 : global.COLOR.BACKGROUND }]} onPress={() => setFollower(!isFollower)}>
                    <Text style={[css.typeText, { color: isFollower ? 'white' : global.COLOR.PRIMARY100 }]}>Followers</Text>
                </Pressable>
                <Pressable style={[css.toggleButton, { backgroundColor: isFollowing ? global.COLOR.PRIMARY100 : global.COLOR.BACKGROUND }]} onPress={() => setFollowing(!isFollowing)}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    listFooter: {
        paddingVertical: 20,
    },
});

export default ProfileConnection;

const followType = [ '', 'Follow', 'Following', 'Follow back' ];