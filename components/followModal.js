import React from 'react';
import { View, Text, Image, Pressable, Modal, ScrollView } from 'react-native';
import global from '../global';
import css from '../css';
import SvgIcon from './svgIcon';

const FollowModal = (props) => {

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
                        <Text style={css.modalTitleText}>Following</Text>
                        <Pressable style={[css.modalCloseButton, { right: global.CONSTANTS.SIZE_20 }]} onPress={() => props.onChangeVisible(false)}>
                            <SvgIcon icon='Close'/>
                        </Pressable>
                    </View>
                    <ScrollView style={{ marginTop: 36 }}>
                        {
                            props.data.map((item, idx = 0) => {
                                return (
                                    <View key={idx++} style={css.listItemContainer}>
                                        <Image source={item.runnerPicture == null ? global.IMAGE.UNKNOWN : {uri: item.runnerPicture}} style={css.hostAvatar}/>
                                        <View style={css.infoContainer}>
                                            <Text style={css.labelText}>{item.runnerFirstName + ' ' + item.runnerLastName}</Text>
                                            <Text style={css.infoText}>{item.runningLocation}</Text>
                                            <Text style={css.infoText}>{item.runsCompleted + (item.runsCompleted < 2 ? ' Run completed' : ' Runs completed')}</Text>
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

export default React.memo(FollowModal);