import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { Icon } from 'react-native-elements';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';
import css from '../../css';

const InviteFriends = (props) => {

    const pressSubmitAction = () => {
        Clipboard.setString('https://runroom.com/cjsKck12');
    }

    return (
        <View style={css.bgContainer}>
            <Pressable style={css.backButton} onPress={() => props.navigation.navigate('Settings')}>
                <SvgIcon icon='Back'/>
            </Pressable>
            <Text style={[css.titleText, { color: global.COLOR.PRIMARY100 }]}>INVITE FRIENDS</Text>
            <Text style={css.authIndicatorText}>{'Share the below link with friends and enjoy running' + '\n' + 'together'}</Text>
            <Text style={[css.labelText, { marginTop: 45 }]}>Share link</Text>
            <View style={css.textInputRowContainer}>
                <TextInput
                    style={css.inputText}
                    editable={false}
                    placeholder='Enter your url'
                    value='https://runroom.com/cjsKck12'
                />
                <Pressable style={styles.duplicateButton}>
                    <Icon name='content-copy' type='material-community' size={25} color={global.COLOR.SETTING_ICON}/>
                </Pressable>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={css.submitButton} onPress={pressSubmitAction}>
                    <Text style={css.submitText}>COPY LINK</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    duplicateButton: {
        position: 'absolute',
        right: global.CONSTANTS.SIZE_20,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: global.CONSTANTS.SPACE_40,
    },
});

export default InviteFriends;