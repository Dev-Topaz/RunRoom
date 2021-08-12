import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SectionList, TouchableHighlight } from 'react-native';
import * as Contacts from 'expo-contacts';
import { groupBy } from 'lodash';

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
        ({ onPress, name, emailOrNumber, selected }) => {
            return (
                <TouchableHighlight onPress={onPress}>
                    <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center' }}>
                        <Text style={{ marginRight: 16 }}>{selected ? '✅' : '⭕️'}</Text>
                        <View style={{ flex: 1 }}>
                            <Text>{name}</Text>
                            <Text style={{ marginTop: 4, color: '#666' }}>{emailOrNumber}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            );
        }
    );

    return (
        <View style={{ flex: 1 }}>
            <SectionList
                sections={sections}
                keyExtractor={item => item.id}
                renderSectionHeader={({ section }) => (
                    <Text>{section.key.toUpperCase()}</Text>
                )}
                renderItem={({ item }) => {
                    return (
                        <ContactRow
                            name={item.name}
                            emailOrNumber={item.email || item.phoneNumber}
                        />
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    
});

export default Contact;