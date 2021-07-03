import React, { useState } from 'react';
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
        
        if(isPM) {
            yourHour += 12;
            if(yourHour == 24)
                yourHour = 12;
        } else {
            if(yourHour == 12)
                yourHour = 0;
        }

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
                                defaultIndex={ 12 }
                            />
                            <View style={styles.indicatorContainer}>
                                <Pressable onPress={() => setPM(false)}>
                                    <Text style={[styles.indicatorText, { color: isPM ? global.COLOR.PRIMARY50 : global.COLOR.PRIMARY100 }]}>AM</Text>
                                </Pressable>
                                <Text style={css.modalTitleText}>  |  </Text>
                                <Pressable onPress={() => setPM(true)}>
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

const timeItems = [ '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30' ];
