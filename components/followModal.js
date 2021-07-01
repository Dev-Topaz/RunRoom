import React from 'react';
import { StyleSheet, View, Text, Image, Pressable, Modal, ScrollView } from 'react-native';
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
                        <Pressable style={css.modalCloseButton} onPress={() => props.onChangeVisible(false)}>
                            <SvgIcon icon='Close'/>
                        </Pressable>
                    </View>
                    <ScrollView style={{ marginTop: 36 }}>
                        {
                            props.data.map((item, idx = 0) => {
                                return (
                                    <View key={idx++} style={styles.listItemContainer}>
                                        <Image source={item.runnerPicture == null ? global.IMAGE.UNKNOWN : {uri: item.runnerPicture}} style={css.hostAvatar}/>
                                        <View style={styles.infoContainer}>
                                            <Text style={styles.nameText}>{item.runnerFirstName + ' ' + item.runnerLastName}</Text>
                                            <Text style={styles.locationText}>Paris, France</Text>
                                            <Text style={styles.runningText}>2 Runs Completed</Text>
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

const styles = StyleSheet.create({
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: global.CONSTANTS.SIZE_20,
        paddingHorizontal: global.CONSTANTS.SIZE_20,
    },
    infoContainer: {
        height: global.CONSTANTS.SQUARE_50,
        justifyContent: 'space-between',
        marginLeft: 10,
    },
    nameText: {
        fontFamily: 'SFProMedium',
        fontSize: 14,
        color: global.COLOR.PRIMARY100,
    },
    locationText: {
        fontFamily: 'SFProRegular',
        fontSize: 10,
        color: global.COLOR.PRIMARY70,
    },
    runText: {
        fontFamily: 'SFProRegular',
        fontSize: 10,
        color: global.COLOR.PRIMARY70,
    },
});

export default React.memo(FollowModal);