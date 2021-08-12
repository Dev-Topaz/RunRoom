import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SectionList, ContactRow } from 'react-native';
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

    return (
        <View style={{ flex: 1 }}>
            
        </View>
    );
}

const styles = StyleSheet.create({

});

export default Contact;