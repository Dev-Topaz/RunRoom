import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Modal, TouchableOpacity } from 'react-native';
import SvgIcon from './svgIcon';
import global from '../global';
import css from '../css';

const GenderPicker = (props) => {

    const [gender, setGender] = useState(0);

    return (
        <Modal
            animationType='slide'
            transparent
            visible={props.visible}
            onRequestClose={() => {}}
            onShow={() => setGender(props.data)}
        >
            <View style={css.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={css.modalTitleText}>Select your gender</Text>
                    <Pressable style={styles.closeButton}>
                        <SvgIcon icon='Close'/>
                    </Pressable>
                    <View style={styles.buttonGroup}>
                        <View style={styles.column}>
                            <Pressable style={gender == 1 ? styles.groupActiveButton : styles.groupInactiveButton} onPress={() => pressGroupButton(1)}>
                                <Text style={gender == 1 ? styles.activeText : styles.inactiveText}>Male</Text>
                                { gender == 1 ? <View style={{position: 'absolute', left: 20}}><SvgIcon icon='SmallCheck'/></View> : null }
                            </Pressable>
                            <Pressable style={gender == 3 ? styles.groupActiveButton : styles.groupInactiveButton} onPress={() => pressGroupButton(3)}>
                                <Text style={gender == 3 ? styles.activeText : styles.inactiveText}>Other</Text>
                                { gender == 3 ? <View style={{position: 'absolute', left: 20}}><SvgIcon icon='SmallCheck'/></View> : null }
                            </Pressable>
                        </View>
                        <View style={styles.column}>
                            <Pressable style={gender == 2 ? styles.groupActiveButton : styles.groupInactiveButton} onPress={() => pressGroupButton(1)}>
                                <Text style={gender == 2 ? styles.activeText : styles.inactiveText}>Female</Text>
                                { gender == 2 ? <View style={{position: 'absolute', left: 20}}><SvgIcon icon='SmallCheck'/></View> : null }
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity style={css.submitButton}>
                            <Text style={css.submitText}>UPDATE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        width: '100%',
        height: global.CONSTANTS.SIZE_426,
        top: global.CONSTANTS.HEIGHT - global.CONSTANTS.SIZE_426,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 44,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 47,
        right: global.CONSTANTS.SIZE_20,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: global.CONSTANTS.SPACE_55,
    },
    column: {
        paddingHorizontal: 6,
    },
    activeText: {
        fontFamily: 'SFProMedium',
        fontSize: 14,
        color: 'white',
    },
    inactiveText: {
        fontFamily: 'SFProMedium',
        fontSize: 14,
        color: global.COLOR.PRIMARY100,
    },
    groupActiveButton: {
        width: 170,
        height: 48,
        borderRadius: 24,
        marginBottom: global.CONSTANTS.SIZE_20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: global.COLOR.SECONDARY,
    },
    groupInactiveButton: {
        width: 170,
        height: 48,
        borderRadius: 24,
        marginBottom: global.CONSTANTS.SIZE_20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: global.COLOR.STATUS_INACTIVE,
    },
    footer: {
        position: 'absolute',
        bottom: global.CONSTANTS.SPACE_40,
        width: '100%',
    },
});

export default React.memo(GenderPicker);