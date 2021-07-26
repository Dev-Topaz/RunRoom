import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Pressable, Keyboard } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';
import css from '../../css';

const Feedback = (props) => {

    const [isKB, setKB] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    }, []);

    const handleKeyboardDidShow = () => {
        setKB(true);
    }

    const handleKeyboardDidHide = () => {
        setKB(false);
    }

    return (
        <View style={css.bgContainer}>
            <Pressable style={css.backButton} onPress={() => props.navigation.navigate('Settings')}>
                <SvgIcon icon='Back'/>
            </Pressable>
            <Text style={[css.titleText, { color: global.COLOR.PRIMARY100 }]}>FEEDBACK</Text>
            <Text style={[css.authIndicatorText, { letterSpacing: -0.35, marginBottom: 40 }]}>{'Please help us improve our app by providing feedback' + '\n' + 'below'}</Text>
            {
                isKB ? null :
                <View style={styles.radioGroupContainer}>
                    <RadioGroup radioButtons={radioButtonList}/>
                </View>
            }
            <Text style={css.labelText}>Email Address</Text>
            <View style={[css.textInputContainer, { marginBottom: 20 }]}>
                <TextInput
                    style={css.inputText}
                    placeholder='Enter your email address'
                />
            </View>
            <Text style={css.labelText}>Write Message</Text>
            <View style={styles.messageContainer}>
                <TextInput
                    style={css.inputText}
                    placeholder='Write message here'
                    textAlignVertical='top'
                    multiline={true}
                    blurOnSubmit={true}
                />
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={css.submitButton}>
                    <Text style={css.submitText}>SEND</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    radioLabelText: {
        fontFamily: 'SFProRegular',
        fontSize: 14,
        color: global.COLOR.PRIMARY70,
    },
    radioGroupContainer: {
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    messageContainer: {
        height: 154,
        backgroundColor: global.COLOR.BACKGROUND,
        paddingHorizontal: global.CONSTANTS.SIZE_20,
        paddingVertical: global.CONSTANTS.SIZE_20,
        marginTop: 5,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: global.CONSTANTS.SPACE_40,
    },
});

export default Feedback;

const radioButtonList = [
    {
        id: '1',
        label: 'Suggest a new feature',
        value: '1',
        labelStyle: styles.radioLabelText,
        containerStyle: { marginBottom: 20 },
        color: global.COLOR.SECONDARY,
        borderColor: '#BBBBBB',
        selected: true,
    },
    {
        id: '2',
        label: 'Report a bug or issue',
        value: '2',
        labelStyle: styles.radioLabelText,
        containerStyle: { marginBottom: 20 },
        color: global.COLOR.SECONDARY,
        borderColor: '#BBBBBB',
    },
    {
        id: '3',
        label: 'Others',
        value: '3',
        labelStyle: styles.radioLabelText,
        containerStyle: { marginBottom: 20 },
        color: global.COLOR.SECONDARY,
        borderColor: '#BBBBBB',
    },
];