import React, { useState } from 'react';
import { View, Image, Text, Pressable, Modal, ScrollView } from 'react-native';
import SvgIcon from './svgIcon';
import global from '../global';
import css from '../css';

const ConnectionModal = (props) => {

    const [inviteList, setInviteList] = useState([]);

    return (
        <Modal
            animationType='slide'
            transparent
            visible={props.visible}
            onRequestClose={() => {}}
        >
            <View style={css.overlay}>
                <View style={css.modalContainer801}>
                    <View style={css.modalHeader}>
                        <Text>Connections Invited</Text>
                        <Pressable style={css.modalCloseButton}>
                            <SvgIcon icon='Close'/>
                        </Pressable>
                    </View>
                    <ScrollView style={{ marginTop: 36 }}>
                        {
                            inviteList.map((item, idx = 0) => {
                                return (
                                    <View key={idx++} style={css.listItemContainer}>
                                        <Image source={item.picture} style={css.hostAvatar}/>
                                        <View style={css.infoContainer}>
                                            <Text style={css.labelText}>{item.firstName + ' ' + item.lastName}</Text>
                                            <Text style={css.infoText}>{item.runningLocation}</Text>
                                            <Text style={css.infoText}>{item.runsCompleted + (item.runsCompleted < 2 ? ' Run completed' : ' Runs completed')}</Text>
                                        </View>
                                        <View style={css.buttonGroupContainer}>
                                            <Pressable style={css.inviteButton}>
                                                <Text style={css.inviteButtonText}>Uninvite</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                );
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

export default React.memo(ConnectionModal);