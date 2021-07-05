import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Modal, TouchableOpacity, Pressable, FlatList, ActivityIndicator } from 'react-native';
import SvgIcon from './svgIcon';
import global from '../global';
import css from '../css';

import { findIndex } from '../utils/func';
import { getAllConnections, getAllUsers, getFollowings, getFollowers } from '../utils/api';
import { useSelector } from 'react-redux';

const InviteModal = (props) => {

    const accessToken = useSelector(state => state.user.accessToken);

    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isFollower, setFollower] = useState(false);
    const [isFollowing, setFollowing] = useState(false);
    const [inviteList, setInviteList] = useState([]);

    useEffect(() => {
        setLoading(true);
        if(isFollower && isFollowing) {
            getAllConnections(page, 9, accessToken).then(result => {
                if(result != null && result.length > 0) {
                    if(page != 1)
                        setData([...data, ...result]);
                    else
                        setData(result);
                }
                setLoading(false);
            });
        } else if(isFollower && !isFollowing) {
            getFollowers(page, 9, accessToken).then(result => {
                if(result != null && result.length > 0) {
                    if(page != 1)
                        setData([...data, ...result]);
                    else
                        setData(result);
                }
                setLoading(false);
            });
        } else if(!isFollower && isFollowing) {
            getFollowings(page, 9, accessToken).then(result => {
                if(result != null && result.length > 0) {
                    if(page != 1)
                        setData([...data, ...result]);
                    else
                        setData(result);
                }
                setLoading(false);
            });
        } else {
            getAllUsers(page, 9, accessToken).then(result => {
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
    }, [searchText]);

    const pressInviteAction = (index) => {

    }

    const pressFollowAction = (index) => {

    }

    const renderItem = ({item, index}) => (
        <View key={item.connectedUserId} style={css.listItemContainer}>
            <Image source={item.picture} style={css.hostAvatar}/>
            <View style={css.infoContainer}>
                <Text style={css.labelText}>{item.firstName + ' ' + item.lastName}</Text>
                <Text style={css.infoText}>{item.runningLocation}</Text>
                <Text style={css.infoText}>{item.runsCompleted + (item.runsCompleted < 2 ? ' Run completed' : ' Runs completed')}</Text>
            </View>
            <View style={css.buttonGroupContainer}>
                <Pressable style={[css.inviteButton, { marginRight: 5 }]} onPress={() => pressInviteAction(index)}>
                    <Text style={css.inviteButtonText}>Invite</Text>
                </Pressable>
                <Pressable style={css.inviteButton} onPress={() => pressFollowAction(index)}>
                    <Text style={css.inviteButtonText}>Follow</Text>
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
                        <Pressable style={css.modalBackButton}>
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
                    <View style={styles.modalFooter}>
                        <TouchableOpacity style={[css.submitButton, { width: '100%' }]}>
                            <Text style={css.submitText}>INVITE ALL</Text>
                        </TouchableOpacity>
                        <View style={styles.indicatorContainer}>
                            <Text style={[css.hostLabel, { letterSpacing: -0.3 }]}>Cannot find connection? Invite a friend by clicking</Text>
                            <TouchableOpacity style={{ marginLeft: 5 }}>
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
        position: 'absolute',
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