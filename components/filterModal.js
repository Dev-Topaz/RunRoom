import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Pressable, Modal } from 'react-native';
import { CheckBox } from 'react-native-elements';
import RangeSlider from 'rn-range-slider';
import global from '../global';
import css from '../css';
import SvgIcon from './svgIcon';
import { showDateInfo } from '../utils/func';

import { useSelector } from 'react-redux';

const FilterModal = (props) => {

    const unit = useSelector(state => state.setting.unit);
    const [option, setOption] = useState({
        invited: false,
        participating: false,
        organized: false,
    });
    const [lowValue, setLow] = useState(3.4);
    const [highValue, setHigh] = useState(12.7);
    const [dateValue, setDateValue] = useState(null);
    const [dateVisible, setDateVisible] = useState(false);
    const [warningVisible, setWarningVisible] = useState(false);

    const initStateValue = () => {
        setOption({
            invited: false,
            participating: false,
            organized: false,
        });
        setLow(3.4);
        setHigh(12.7);
        setDateValue(null);
    }

    const pressSubmitAction = () => {
        
    }

    const renderThumb = useCallback(() => 
        <View style={styles.thumb}/>
    ,[]);
    
    const renderRail = useCallback(() =>
        <View style={styles.rail}/>
    ,[]);

    const renderRailSelected = useCallback(() =>
        <View style={styles.railSelected}/>
    ,[]);

    const renderLabel = useCallback((value) =>
        <View style={styles.sliderLabelContainer}>
            <Text style={styles.sliderLabelText}>{Math.round(value*10)/10 + (unit == 1 ? ' miles' : ' kilometers')}</Text>
        </View>
    ,[unit]);

    const renderNotch = useCallback(() =>
        <View style={styles.notch}/>
    ,[]);

    const handleValueChange = useCallback((low, high) => { setLow(Math.floor(low*10)/10); setHigh(Math.floor(high*10)/10); }, []);

    return (
        <Modal
            animationType='slide'
            transparent
            visible={ props.visible }
            onRequestClose={() => {}}
        >
            <View style={css.overlay}>
                <View style={css.modalContainer801}>
                    <View style={css.modalHeader}>
                        <Text style={css.modalTitleText}>Filter</Text>
                        <Pressable style={css.modalCloseButton} onPress={() => props.onChangeVisible(false)}>
                            <SvgIcon icon='Close'/>
                        </Pressable>
                    </View>
                    <View style={{ marginTop: global.CONSTANTS.SPACE_40 }}>
                        <CheckBox
                            title='Invited'
                            containerStyle={styles.checkBoxContainer}
                            checkedIcon={<SvgIcon icon='CheckBox_Checked'/>}
                            uncheckedIcon={<SvgIcon icon='CheckBox_Unchecked'/>}
                            textStyle={styles.checkBoxText}
                            checked={option.invited}
                            onPress={() => setOption({...option, invited: !option.invited})}
                        />
                        <CheckBox
                            title='Participating'
                            containerStyle={styles.checkBoxContainer}
                            checkedIcon={<SvgIcon icon='CheckBox_Checked'/>}
                            uncheckedIcon={<SvgIcon icon='CheckBox_Unchecked'/>}
                            textStyle={styles.checkBoxText}
                            checked={option.participating}
                            onPress={() => setOption({...option, participating: !option.participating})}
                        />
                        <CheckBox
                            title='Organized'
                            containerStyle={styles.checkBoxContainer}
                            checkedIcon={<SvgIcon icon='CheckBox_Checked'/>}
                            uncheckedIcon={<SvgIcon icon='CheckBox_Unchecked'/>}
                            textStyle={styles.checkBoxText}
                            checked={option.organized}
                            onPress={() => setOption({...option, organized: !option.organized})}
                        />
                        <Text style={[css.labelText, { marginTop: 40 }]}>Run Distance Between</Text>
                        <RangeSlider
                            style={{ marginTop: 5 }}
                            min={0.0}
                            max={20.0}
                            step={0.1}
                            low={lowValue}
                            high={highValue}
                            floatingLabel={false}
                            renderThumb={renderThumb}
                            renderRail={renderRail}
                            renderRailSelected={renderRailSelected}
                            renderLabel={renderLabel}
                            renderNotch={renderNotch}
                            onValueChanged={handleValueChange}
                        />
                        <View style={styles.rangeIndicator}>
                            <Text style={css.labelText}>{lowValue + (unit == 1 ? ' miles' : ' kilometers')}</Text>
                            <Text style={css.labelText}>{highValue + (unit == 1 ? ' miles' : ' kilometers')}</Text>
                        </View>
                        <Text style={[css.labelText, { marginTop: 40 }]}>Starting from</Text>
                        <Pressable style={css.textInputContainer}>
                            <TextInput
                                style={css.inputText}
                                editable={false}
                                placeholder='Select time and date'
                                pointerEvents='none'
                                value={ dateValue == null ? '' : showDateInfo(dateValue) }
                            />
                            <View style={css.plusButton}>
                                { dateValue == null ? <SvgIcon icon='Plus'/> : <SvgIcon icon='Edit'/> }
                            </View>
                        </Pressable>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity style={css.submitButton} onPress={pressSubmitAction}>
                            <Text style={css.submitText}>SET</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    checkBoxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    checkBoxText: {
        fontFamily: 'SFProMedium',
        fontSize: 14,
        color: global.COLOR.PRIMARY100,
        paddingLeft: 15,
    },
    thumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: global.COLOR.SECONDARY,
    },
    rail: {
        flex: 1,
        height: 6,
        borderRadius: 3,
        backgroundColor: global.COLOR.STATUS_INACTIVE,
    },
    railSelected: {
        height: 6,
        borderRadius: 3,
        backgroundColor: global.COLOR.SECONDARY,
    },
    sliderLabelContainer: {
        alignItems: 'center',
        padding: 8,
        backgroundColor: global.COLOR.STATUS_INACTIVE,
        borderRadius: 4,
    },
    sliderLabelText: {
        fontFamily: 'SFProRegular',
        fontSize: 12,
        color: global.COLOR.PRIMARY100,
    },
    notch: {
        width: 8,
        height: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: global.COLOR.STATUS_INACTIVE,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderTopWidth: 8,
    },
    rangeIndicator: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
    },
    footer: {
        position: 'absolute',
        bottom: global.CONSTANTS.SPACE_40,
        left: global.CONSTANTS.SIZE_20,
        right: global.CONSTANTS.SIZE_20,
    }, 
});

export default React.memo(FilterModal);