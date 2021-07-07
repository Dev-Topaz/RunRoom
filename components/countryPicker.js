import React from 'react';
import { StyleSheet, View, Text, Image, Modal, ScrollView, TouchableOpacity } from 'react-native';
import global from '../global';
import css from '../css';


const CountryPicker = (props) => {

    return (
        <Modal
            animationType='slide'
            transparent
            visible={props.visible}
            onRequestClose={() => {}}
        >
            <View style={css.overlay}>
                <View style={styles.optionContainer}>
                    <ScrollView keyboardShouldPersistTaps='always'>
                        <View style={{ paddingHorizontal: 10 }}>
                            {
                                props.data.map((item) => {
                                    return (
                                        <View key={item.key}>
                                            <TouchableOpacity onPress={() => { props.onChangeCountry(item); props.onChangeVisible(false); }}>
                                                <View style={styles.optionItem}>
                                                    <View style={{ flex: 0.15 }}>
                                                        <Image source={item.image} style={{ width: 30, height: 16, resizeMode: 'stretch' }}/>
                                                    </View>
                                                    <View style={{ flex: 0.7, alignItems: 'center' }}>
                                                        <Text style={[styles.optionText, { color: '#434343', fontSize: 14 }]}>{ item.label }</Text>
                                                    </View>
                                                    <View style={{ flex: 0.15 }}>
                                                        <Text style={[styles.optionText, { color: 'grey', fontSize: 12 }]}>{ item.dialCode }</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.cancelContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => props.onChangeVisible(false)}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    optionContainer: {
        width: global.CONSTANTS.WIDTH * 0.8,
        height: 450,
        borderRadius: 5,
        backgroundColor: global.COLOR.WHITE85,
        left: global.CONSTANTS.WIDTH * 0.1,
        top: (global.CONSTANTS.HEIGHT - 450) / 2,
    },
    optionItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
    },
    optionText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'rgba(0, 118, 255, 0.9)',
    },
    cancelContainer: {
        left: global.CONSTANTS.WIDTH * 0.1,
        top: (global.CONSTANTS.HEIGHT - 450) / 2 + 10,
    },
    cancelButton: {
        borderRadius: 5,
        width: global.CONSTANTS.WIDTH * 0.8,
        backgroundColor: global.COLOR.WHITE85,
        padding: 8,
    },
    cancelText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 18,
    },
});

export default React.memo(CountryPicker);