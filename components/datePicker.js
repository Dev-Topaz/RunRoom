import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Pressable } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import HorizontalPicker from '@vseslav/react-native-horizontal-picker';
import SvgIcon from './svgIcon';
import global from '../global';
import css from '../css';

const DatePicker = (props) => {

    const [selectedDate, selectDate] = useState(new Date());
    const [selectedTime, selectTime] = useState(12);
    const [isPM, setPM] = useState(false);
    const [selIndex, setSelIndex] = useState(27);

    useEffect(() => {
        getNearestTime();
    }, []);

    useEffect(() => {
        if(selectedTime > 47)
            setPM(true);
        else
            setPM(false);
    }, [selectedTime]);

    const initStateValues = () => {
        selectDate(new Date());
        selectTime(12);
        setPM(false);
    }

    const pressSaveAction = () => {
        let yourDate = new Date(selectedDate);
        let yourTime = timeItems[selectedTime];
        let yourHour = parseInt(yourTime.split(':')[0]);
        let yourMin = parseInt(yourTime.split(':')[1]);

        yourDate.setHours(yourHour);
        yourDate.setMinutes(yourMin);
        yourDate.setSeconds(0);

        props.onChangeValue(yourDate);
        props.onChangeVisible(false);
        initStateValues();
    }

    const pressCloseAction = () => {
        props.onChangeVisible(false);
        initStateValues();
    }

    const getNearestTime = () => {
        let dateString = (new Date()).toString();
        let timeString = dateString.split(' ')[4];
        timeString = timeString.slice(0, -3);
        let hour = parseInt(timeString.split(':')[0]);
        let min = parseInt(timeString.split(':')[1]);
        
        const idx = 4 * hour + Math.ceil(min / 15);
        if(idx > 47)
            setPM(true);
        else
            setPM(false);

        if(idx > 95) {
            setSelIndex(0);
            selectTime(0);
        } else {
            setSelIndex(idx);
            selectTime(idx);
        }
    }

    const renderItem = (item, index) => (
        <View style={styles.itemContainer}>
            <Text style={css.modalTitleText}>{ item }</Text>
        </View>
    );

    return (
        <Modal
            animationType='slide'
            transparent
            visible={props.visible}
            onRequestClose={() => {}}
            onShow={() => getNearestTime()}
        >
            <View style={css.overlay}>
                <View style={[css.modalContainer801, { paddingHorizontal: 20 }]}>
                    <View style={css.modalHeader}>
                        <Text style={css.modalTitleText}>Set Date and Time</Text>
                        <Pressable style={css.modalCloseButton} onPress={pressCloseAction}>
                            <SvgIcon icon='Close'/>
                        </Pressable>
                    </View>
                    <View style={{ paddingTop: 45, alignItems: 'center' }}>
                        <View style={{ height: 380 }}>
                            <CalendarPicker
                                onDateChange={ selectDate }
                                weekdays={[ 'M', 'T', 'W', 'T', 'F', 'S', 'S' ]}
                                months={[ 'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER' ]}
                                startFromMonday={ true }
                                showDayStragglers={ false }
                                previousComponent={ <SvgIcon icon='CalendarPrev'/> }
                                nextComponent={ <SvgIcon icon='CalendarNext'/> }
                                // headerWrapperStyle={{ paddingHorizontal: 50 }}
                                dayLabelsWrapper={{ borderColor: 'transparent' }}
                                textStyle={ css.modalTitleText }
                                selectedDayColor='#ECB296'
                                selectedDayTextColor='#FFFFFF'
                            />
                        </View>
                        <View style={{ height: 100 }}>
                            <View style={{ alignItems: 'center', marginBottom: 15 }}>
                                <SvgIcon icon='PickerMark'/>
                            </View>
                            <HorizontalPicker
                                data={ timeItems }
                                renderItem={ renderItem }
                                itemWidth={ 60 }
                                onChange={ selectTime }
                                defaultIndex={ selIndex }
                            />
                            <View style={styles.indicatorContainer}>
                                <Pressable>
                                    <Text style={[styles.indicatorText, { color: isPM ? global.COLOR.PRIMARY50 : global.COLOR.PRIMARY100 }]}>AM</Text>
                                </Pressable>
                                <Text style={css.modalTitleText}>  |  </Text>
                                <Pressable>
                                    <Text style={[styles.indicatorText, { color: isPM ? global.COLOR.PRIMARY100 : global.COLOR.PRIMARY50 }]}>PM</Text>
                                </Pressable>
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
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicatorText: {
        fontFamily: 'SFProMedium',
        fontSize: 18,
    },
    modalFooter: {
        position: 'absolute',
        left: global.CONSTANTS.SIZE_20,
        right: global.CONSTANTS.SIZE_20,
        bottom: global.CONSTANTS.SPACE_40,
    },
});

export default React.memo(DatePicker);

const timeItems = [ '0:00', '0:15', '0:30', '0:45',
                    '1:00', '1:15', '1:30', '1:45',
                    '2:00', '2:15', '2:30', '2:45',
                    '3:00', '3:15', '3:30', '3:45',
                    '4:00', '4:15', '4:30', '4:45',
                    '5:00', '5:15', '5:30', '5:45',
                    '6:00', '6:15', '6:30', '6:45',
                    '7:00', '7:15', '7:30', '7:45',
                    '8:00', '8:15', '8:30', '8:45',
                    '9:00', '9:15', '9:30', '9:45',
                    '10:00', '10:15', '10:30', '10:45',
                    '11:00', '11:15', '11:30', '11:45',
                    '12:00', '12:15', '12:30', '12:45',
                    '13:00', '13:15', '13:30', '13:45',
                    '14:00', '14:15', '14:30', '14:45',
                    '15:00', '15:15', '15:30', '15:45',
                    '16:00', '16:15', '16:30', '16:45',
                    '17:00', '17:15', '17:30', '17:45',
                    '18:00', '18:15', '18:30', '18:45',
                    '19:00', '19:15', '19:30', '19:45',
                    '20:00', '20:15', '20:30', '20:45',
                    '21:00', '21:15', '21:30', '21:45',
                    '22:00', '22:15', '22:30', '22:45',
                    '23:00', '23:15', '23:30', '23:45',
                ];
