import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Pressable, Modal } from 'react-native';
import { CheckBox } from 'react-native-elements';
import RangeSlider from 'rn-range-slider';
import global from '../global';
import css from '../css';
import SvgIcon from './svgIcon';

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

    return (
        <Modal
            animationType='slide'
            transparent
            visible={ props.visible }
            onRequestClose={() => {}}
        >
            <View style={css.overlay}>
                <View style={css.modalContainer801}>

                </View>
            </View>
        </Modal>
    );
}