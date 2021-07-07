import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Modal, TouchableOpacity } from 'react-native';
import SvgIcon from './svgIcon';
import global from '../global';
import css from '../css';

const AgePicker = (props) => {

    const [ageGroup, setAgeGroup] = useState(0);

    const pressGroupButton = (index) => {
        if(index == ageGroup) {
            setAgeGroup(0);
        } else {
            setAgeGroup(index);
        }
    }

    const pressSubmitAction = () => {
        props.onChangeValue(ageGroup);
        props.onChangeVisible(false);
    }

    return (
        <Modal
            animationType='slide'
            transparent
            visible={props.visible}
            onRequestClose={() => {}}
            onShow={() => setAgeGroup(props.data)}
        >
            <View style={css.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={css.modalTitleText}>Select your age group</Text>
                    <Pressable style={styles.closeButton} onPress={() => props.onChangeVisible(false)}>
                        <SvgIcon icon='Close'/>
                    </Pressable>
                    <View style={styles.buttonGroup}>
                        <View style={styles.column}>
                            <Pressable style={ageGroup == 1 ? styles.groupActiveButton : styles.groupInactiveButton} onPress={() => pressGroupButton(1)}>
                                <Text style={ageGroup == 1 ? styles.activeText : styles.inactiveText}>Below 20</Text>
                                { ageGroup == 1 ? <View style={{position: 'absolute', left: 20}}><SvgIcon icon='SmallCheck'/></View> : null }
                            </Pressable>
                            <Pressable style={ageGroup == 3 ? styles.groupActiveButton : styles.groupInactiveButton} onPress={() => pressGroupButton(3)}>
                                <Text style={ageGroup == 3 ? styles.activeText : styles.inactiveText}>30s</Text>
                                { ageGroup == 3 ? <View style={{position: 'absolute', left: 20}}><SvgIcon icon='SmallCheck'/></View> : null }
                            </Pressable>
                            <Pressable style={ageGroup == 5 ? styles.groupActiveButton : styles.groupInactiveButton} onPress={() => pressGroupButton(5)}>
                                <Text style={ageGroup == 5 ? styles.activeText : styles.inactiveText}>50s</Text>
                                { ageGroup == 5 ? <View style={{position: 'absolute', left: 20}}><SvgIcon icon='SmallCheck'/></View> : null }
                            </Pressable>
                            <Pressable style={ageGroup == 7 ? styles.groupActiveButton : styles.groupInactiveButton} onPress={() => pressGroupButton(7)}>
                                <Text style={ageGroup == 7 ? styles.activeText : styles.inactiveText}>70s</Text>
                                { ageGroup == 7 ? <View style={{position: 'absolute', left: 20}}><SvgIcon icon='SmallCheck'/></View> : null }
                            </Pressable>
                        </View>
                        <View style={styles.column}>
                            <Pressable style={ageGroup == 2 ? styles.groupActiveButton : styles.groupInactiveButton} onPress={() => pressGroupButton(2)}>
                                <Text style={ageGroup == 2 ? styles.activeText : styles.inactiveText}>20s</Text>
                                { ageGroup == 2 ? <View style={{position: 'absolute', left: 20}}><SvgIcon icon='SmallCheck'/></View> : null }
                            </Pressable>
                            <Pressable style={ageGroup == 4 ? styles.groupActiveButton : styles.groupInactiveButton} onPress={() => pressGroupButton(4)}>
                                <Text style={ageGroup == 4 ? styles.activeText : styles.inactiveText}>40s</Text>
                                { ageGroup == 4 ? <View style={{position: 'absolute', left: 20}}><SvgIcon icon='SmallCheck'/></View> : null }
                            </Pressable>
                            <Pressable style={ageGroup == 6 ? styles.groupActiveButton : styles.groupInactiveButton} onPress={() => pressGroupButton(6)}>
                                <Text style={ageGroup == 6 ? styles.activeText : styles.inactiveText}>60s</Text>
                                { ageGroup == 6 ? <View style={{position: 'absolute', left: 20}}><SvgIcon icon='SmallCheck'/></View> : null }
                            </Pressable>
                            <Pressable style={ageGroup == 8 ? styles.groupActiveButton : styles.groupInactiveButton} onPress={() => pressGroupButton(8)}>
                                <Text style={ageGroup == 8 ? styles.activeText : styles.inactiveText}>80 or above</Text>
                                { ageGroup == 8 ? <View style={{position: 'absolute', left: 20}}><SvgIcon icon='SmallCheck'/></View> : null }
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity style={css.submitButton} onPress={pressSubmitAction}>
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
        height: global.CONSTANTS.SIZE_538,
        top: global.CONSTANTS.HEIGHT - global.CONSTANTS.SIZE_538,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 36,
        paddingHorizontal: global.CONSTANTS.SIZE_20,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: global.CONSTANTS.SPACE_40,
        right: global.CONSTANTS.SIZE_20,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: global.CONSTANTS.SPACE_40,
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

export default React.memo(AgePicker);