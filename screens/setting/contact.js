import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SectionList, TouchableHighlight, Pressable } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Icon } from 'react-native-elements';
import { groupBy } from 'lodash';
import css from '../../css';
import global from '../../global';
import SvgIcon from '../../components/svgIcon';

const Contact = (props) => {

    const [contacts, setContacts] = useState([]);

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

    const sections = React.useMemo(() => {
        return Object.entries(
            contacts
        ).map(([key, value]) => ({
            key,
            data: value.sort((a, b) => (a.name || a.name || '') < (b.name || b.name || '') ? -1 : 1),
        })).sort((a, b) => {
            a.key < b.key ? -1 : 1
        });
    }, [contacts]);

    const ContactRow = React.memo(
        ({ onPress, name, type, emailOrNumber, selected }) => {
            return (
                <TouchableHighlight onPress={onPress}>
                    <View style={styles.rowItem}>
                        <Icon name={type ? 'email' : 'message-text'} type='material-community' size={24} color={'cadetblue'}/>
                        <View style={styles.infoContainer}>
                            <Text style={styles.nameText}>{name}</Text>
                            <Text style={styles.emailText}>{emailOrNumber}</Text>
                        </View>
                        <View style={styles.checkMark}>
                            <Icon name={'check-circle'} type='material-community' size={24} color={'orange'}/>
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
                        />
                    );
                }}
            />
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
        borderBottomWidth: 0.2,
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
});

export default Contact;