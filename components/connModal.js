import React, { useState } from 'react';
import { View, Image, Text, Pressable, Modal, ScrollView } from 'react-native';
import SvgIcon from './svgIcon';
import global from '../global';
import css from '../css';
import { findIndex } from '../utils/func';

const ConnectionModal = (props) => {

    const [inviteList, setInviteList] = useState([]);
    const [data, setData] = useState([]);

    const pressUninviteAction = (index) => {
        let inviteGroup = [...inviteList];
        const target = data[index];
        let idx = findIndex(target, inviteGroup);
        if(idx > -1) {
            inviteGroup.splice(idx, 1);
            setInviteList(inviteGroup);
        } else {
            inviteGroup.push(target);
            setInviteList(inviteGroup);
        }
    }

    const pressCloseAction = () => {
        props.onChangeValue(inviteList);
        props.onChangeVisible(false);
    }

    return (
        <Modal
            animationType='slide'
            transparent
            visible={props.visible}
            onRequestClose={() => {}}
            onShow={() => {setInviteList(props.data); setData(props.data);}}
        >
            <View style={css.overlay}>
                <View style={css.modalContainer801}>
                    <View style={css.modalHeader}>
                        <Text style={css.modalTitleText}>Connections Invited</Text>
                        <Pressable style={[css.modalCloseButton, { right: global.CONSTANTS.SIZE_20 }]} onPress={pressCloseAction}>
                            <SvgIcon icon='Close'/>
                        </Pressable>
                    </View>
                    <ScrollView style={{ marginTop: 36 }}>
                        {
                            data.map((item, idx = 0) => {
                                return (
                                    <View key={idx++} style={css.listItemContainer}>
                                        <Image source={item.picture == null ? global.IMAGE.UNKNOWN : { uri: item.picture }} style={css.hostAvatar}/>
                                        <View style={css.infoContainer}>
                                            <Text style={css.labelText}>{item.firstName + ' ' + item.lastName}</Text>
                                            <Text style={css.infoText}>{item.runningLocation == null ? '' : item.runningLocation}</Text>
                                            <Text style={css.infoText}>{item.runsCompleted + (item.runsCompleted == 1 ? ' Run completed' : ' Runs completed')}</Text>
                                        </View>
                                        <View style={css.buttonGroupContainer}>
                                            <Pressable style={[css.inviteButton, { backgroundColor: findIndex(item, inviteList) > -1 ? global.COLOR.BACKGROUND : global.COLOR.SECONDARY}]} onPress={() => pressUninviteAction(idx - 1)}>
                                                <Text style={[css.inviteButtonText, { color: findIndex(item, inviteList) > -1 ? global.COLOR.PRIMARY100 : 'white'}]}>Uninvite</Text>
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