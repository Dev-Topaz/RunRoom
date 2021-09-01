import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SectionList, TouchableHighlight, Pressable, TouchableOpacity, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import { composeAsync } from 'expo-mail-composer';
import { isAvailableAsync, sendSMSAsync } from 'expo-sms';
import { Icon } from 'react-native-elements';
import { groupBy } from 'lodash';
import css from '../../css';
import global from '../../global';
import SvgIcon from '../../components/svgIcon';

const Contact = (props) => {

    const [contacts, setContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { status } = await Contacts.requestPermissionsAsync();
                if(status === 'granted') {
                    const { data } = await Contacts.getContactsAsync({
                        fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
                    });
                    if(data.length > 0) {
                        const contact = groupBy(data.reduce(
                            (res, cur) => {
                                if(cur.phoneNumbers != null) {
                                    for(const p of cur.phoneNumbers) {
                                        res.push({
                                            id: cur.id + p.number,
                                            name: cur.name || '',
                                            phoneNumber: p.number,
                                        });
                                    }
                                }
                                if(cur.emails != null) {
                                    for(const e of cur.emails) {
                                        res.push({
                                            id: cur.id + e.email,
                                            name: cur.name || '',
                                            email: e.email,
                                        });
                                    }
                                }
                                return res;
                            },
                            []
                        ),
                        rowItem => {
                            const firstChar = (rowItem.name.charAt(0) || '#').toLowerCase();
                            return firstChar.match(/[a-z]/) ? firstChar : '#';
                        }
                        );
                        setContacts(contact);
                    }
                }
            } catch(e) {
                console.log(e);
            }
        })();
    }, []);

    const addSelectedContacts = (data) => {
        let target = [...selectedContacts];
        const idx = target.findIndex(item => item.id === data.id);
        if(idx > -1)
            target.splice(idx, 1);
        else
            target.push(data);
        setSelectedContacts(target);
    }

    const pressSubmitAction = async() => {
        let didShare = false;
        const message = "Let's run together! Check this app https://apps.apple.com/us/app/runroom/id1560016139";
        const emails = selectedContacts.filter(item => item.email != null).map(item => item.email);
        const phoneNumbers = selectedContacts.filter(item => item.phoneNumber != null).map(item => item.phoneNumber);
        if(emails.length > 0) {
            try {
                const result = await composeAsync({
                    recipients: emails,
                    subject: 'RunRoom',
                    body: message,
                    isHtml: false,
                });
                didShare = didShare || result.status === 'sent';
            } catch(e) {
                Alert.alert(e.message);
            }
        }
        if(phoneNumbers.length > 0 && (await isAvailableAsync())) {
            try {
                const result = await sendSMSAsync(phoneNumbers, message);
                didShare = didShare || result.result === 'sent';
            } catch(e) {
                Alert.alert(e.message);
            }
        }
        if(didShare)
            Alert.alert('Thanks for sharing!!!');
    }

    const sections = React.useMemo(() => {
        return Object.entries(
            contacts
        ).map(([key, value]) => ({
            key,
            data: value.sort((a, b) => (a.name || a.name || '') < (b.name || b.name || '') ? -1 : 1),
        })).sort((a, b) => a.key < b.key ? -1 : 1
        );
    }, [contacts]);

    const ContactRow = React.memo(
        ({ onPress, name, type, emailOrNumber, selected }) => {
            return (
                <TouchableHighlight underlayColor={global.COLOR.BACKGROUND} onPress={onPress}>
                    <View style={styles.rowItem}>
                        <Icon name={type ? 'email' : 'message-text'} type='material-community' size={24} color={'cadetblue'}/>
                        <View style={styles.infoContainer}>
                            <Text style={styles.nameText}>{name}</Text>
                            <Text style={styles.emailText}>{emailOrNumber}</Text>
                        </View>
                        <View style={styles.checkMark}>
                            <Icon name={selected ? 'check-circle' : 'checkbox-blank-circle-outline'} type='material-community' size={24} color={selected ? 'orange' : 'gray'}/>
                        </View>
                    </View>
                </TouchableHighlight>
            );
        }
    );

    return (
        <View style={[css.bgContainer, { paddingHorizontal: 0 }]}>
            <View style={styles.header}>
                <Pressable style={css.backButton} onPress={() => props.navigation.navigate('InviteFriend')}>
                    <SvgIcon icon='Back'/>
                </Pressable>
                <Text style={[css.titleText, { color: global.COLOR.PRIMARY100 }]}>YOUR CONTACTS</Text>
            </View>
            <SectionList
                sections={sections}
                keyExtractor={item => item.id}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.sectionText}>{section.key.toUpperCase()}</Text>
                )}
                renderItem={({ item }) => {
                    return (
                        <ContactRow
                            name={item.name}
                            emailOrNumber={item.email || item.phoneNumber}
                            type={item.email ? true : false}
                            selected={selectedContacts.findIndex(target => target.id === item.id) > -1 ? true : false}
                            onPress={() => addSelectedContacts(item)}
                        />
                    );
                }}
            />
            <View style={styles.footer}>
                <TouchableOpacity style={css.submitButton} onPress={pressSubmitAction}>
                    <Text style={css.submitText}>{'Invite contacts (' + selectedContacts.length + ')'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginHorizontal: global.CONSTANTS.SIZE_20,
        marginBottom: global.CONSTANTS.SIZE_20,
    },
    sectionText: {
        fontSize: 20,
        paddingLeft: 16,
        paddingVertical: 10,
        fontWeight: 'bold',
        backgroundColor: 'rgba(245, 247, 247, 1)',
        color: 'rgba(121, 205, 193, 1)',
    },
    rowItem: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: 'rgba(245, 247, 247, 1)',
    },
    infoContainer: {
        flex: 1,
        marginLeft: 16,
    },
    checkMark: {
        position: 'absolute',
        right: 16,
    },
    nameText: {
        fontSize: 15,
    },
    emailText: {
        marginTop: 5,
        color: '#666',
    },
    footer: {
        position: 'absolute',
        bottom: global.CONSTANTS.SPACE_40,
        width: '100%',
        paddingHorizontal: global.CONSTANTS.SIZE_20,
    },
});

export default Contact;