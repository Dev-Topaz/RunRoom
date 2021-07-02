import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity, Pressable } from 'react-native';
import SvgIcon from './svgIcon';
import global from '../global';
import css from '../css';

const DistancePicker = (props) => {

    const [queue, setQueue] = useState([]);
    const [firstValue, setFirstValue] = useState(0);
    const [secondValue, setSecondValue] = useState(0);

    const initStateValues = () => {
        setFirstValue(0);
        setSecondValue(0);
        setQueue([]);
    }

    const pressNumber = (number) => {
        let value = [...queue];
        if(number == 10) {
            value.pop();
        } else {
            if(value.length > 2) {
                value = [];
            }
            value.push(number);
        }
        setFirstValue(0);
        setSecondValue(0);

        switch(value.length) {
            case 1:
                setSecondValue(value[0]);
                break;
            case 2:
                setFirstValue(value[0]);
                setSecondValue(value[1]);
                break;
            case 3:
                setFirstValue(value[0]*10 + value[1]);
                setSecondValue(value[2]);
                break;
            default:
                break;
        }
        setQueue(value);
    }

    const pressCloseAction = () => {
        props.onChangeVisible(false);
        initStateValues();
    }

    const pressSaveAction = () => {
        props.onChangeValue(firstValue + secondValue / 10);
        props.onChangeVisible(false);
        initStateValues();
    }

    return (
        <Modal
            animationType='slide'
            transparent
            visible={props.visible}
            onRequestClose={() => {}}
        >
            <View style={css.overlay}>
                <View style={[css.modalContainer801, { paddingHorizontal: global.CONSTANTS.SIZE_20, justifyContent: 'space-between' }]}>
                    <View style={css.modalHeader}>
                        <Text style={css.modalTitleText}>Pick a Distance</Text>
                        <Pressable style={css.modalCloseButton} onPress={pressCloseAction}>
                            <SvgIcon icon='Close'/>
                        </Pressable>
                    </View>
                    <View style={styles.modalBody}>
                        <Text style={styles.distanceText}>{firstValue + '.' + secondValue}</Text>
                        <Text style={styles.unitText}>{props.unit == 1 ? 'Miles' : 'Kilometers'}</Text>
                        <View style={styles.numPad}>
                            <View style={styles.padRow}>
                                <TouchableOpacity style={styles.cell} onPress={()=>pressNumber(1)}><Text style={styles.cellText}>1</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.cell} onPress={()=>pressNumber(2)}><Text style={styles.cellText}>2</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.cell} onPress={()=>pressNumber(3)}><Text style={styles.cellText}>3</Text></TouchableOpacity>
                            </View>
                            <View style={styles.padRow}>
                                <TouchableOpacity style={styles.cell} onPress={()=>pressNumber(4)}><Text style={styles.cellText}>4</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.cell} onPress={()=>pressNumber(5)}><Text style={styles.cellText}>5</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.cell} onPress={()=>pressNumber(6)}><Text style={styles.cellText}>6</Text></TouchableOpacity>
                            </View>
                            <View style={styles.padRow}>
                                <TouchableOpacity style={styles.cell} onPress={()=>pressNumber(7)}><Text style={styles.cellText}>7</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.cell} onPress={()=>pressNumber(8)}><Text style={styles.cellText}>8</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.cell} onPress={()=>pressNumber(9)}><Text style={styles.cellText}>9</Text></TouchableOpacity>
                            </View>
                            <View style={styles.padRow}>
                                <TouchableOpacity style={styles.cell}><Text style={styles.cellText}></Text></TouchableOpacity>
                                <TouchableOpacity style={styles.cell} onPress={()=>pressNumber(0)}><Text style={styles.cellText}>0</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.cell} onPress={()=>pressNumber(10)}><SvgIcon icon='NumpadBack'/></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.modalFooter}>
                        <TouchableOpacity style={css.submitButton} onPress={pressSaveAction}>
                            <Text style={css.submitText}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBody: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    distanceText: {
        fontFamily: 'FuturaT',
        fontSize: 100,
        color: global.COLOR.PRIMARY100,
        letterSpacing: 2,
        textAlign: 'center',
    },
    unitText: {
        fontFamily: 'SFProMedium',
        fontSize: 18,
        color: global.COLOR.PRIMARY100,
    },
    numPad: {
        width: '100%',
        marginTop: 70,
        paddingHorizontal: 65,
        justifyContent: 'center',
        alignItems: 'center',
    },
    padRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 17,
        marginBottom: 17,
    },
    cell: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cellText: {
        fontFamily: 'SFProBold',
        fontSize: 25,
        color: global.COLOR.PRIMARY100,
    },
    modalFooter: {
        bottom: global.CONSTANTS.SPACE_40,
    },
});

export default React.memo(DistancePicker);