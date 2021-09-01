import React, { useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import Clipboard from 'expo-clipboard';
import Toast from 'react-native-easy-toast';
import { Icon } from 'react-native-elements';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';
import css from '../../css';

import { useSelector, useDispatch } from 'react-redux';
import { changePrevFlag } from '../../store/actions/actions';

const InviteFriends = (props) => {

    const prevPage = useSelector(state => state.setting.prevPage);
    const dispatch = useDispatch();
    const toast = useRef(null);

    const copyToClipboard = () => {
        Clipboard.setString('https://apps.apple.com/us/app/runroom/id1560016139');
        toast.current.show('Copied to Clipboard!');
    }

    const shareLink = () => {
        props.navigation.navigate('Contact');
    }

    const pressBackAction = () => {
        if(prevPage == null) {
            props.navigation.navigate('Setting');
        } else {
            if(prevPage == 'Account')
                dispatch(changePrevFlag(true));
            props.navigation.navigate(prevPage);
        }
    }

    return (
        <View style={css.bgContainer}>
            <Pressable style={css.backButton} onPress={pressBackAction}>
                <SvgIcon icon='Back'/>
            </Pressable>
            <Text style={[css.titleText, { color: global.COLOR.PRIMARY100 }]}>INVITE FRIENDS</Text>
            <Text style={css.authIndicatorText}>{'Share the below link with friends and enjoy running' + ' ' + 'together'}</Text>
            <Text style={[css.labelText, { marginTop: 45 }]}>Share link</Text>
            <View style={css.textInputRowContainer}>
                <TextInput
                    style={[css.inputText, { paddingRight: 40 }]}
                    editable={false}
                    placeholder='Enter your url'
                    value='https://apps.apple.com/us/app/runroom/id1560016139'
                />
                <Pressable style={styles.duplicateButton} onPress={copyToClipboard}>
                    <Icon name='content-copy' type='material-community' size={25} color={global.COLOR.SETTING_ICON}/>
                </Pressable>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={css.submitButton} onPress={shareLink}>
                    <Text style={css.submitText}>SHARE LINK</Text>
                </TouchableOpacity>
            </View>
            <Toast
                ref={ toast }
                position='bottom'
                positionValue={180}
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
