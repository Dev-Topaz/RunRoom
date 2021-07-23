import React, { useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import Clipboard from 'expo-clipboard';
import Toast from 'react-native-easy-toast';
import { Icon } from 'react-native-elements';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';
import css from '../../css';

const InviteFriends = (props) => {

    const toast = useRef(null);

    const copyToClipboard = () => {
        Clipboard.setString('https://runroom.com/cjsKck12');
        toast.current.show('Copied to Clipboard!');
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
                <TouchableOpacity style={css.submitButton} onPress={copyToClipboard}>
                    <Text style={css.submitText}>COPY LINK</Text>
                </TouchableOpacity>
            </View>
            <Toast
                ref={ toast }
                position='bottom'
                positionValue={150}
                fadeInDuration={750}
                fadeOutDuration={1000}
                opacity={0.8}
            />
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