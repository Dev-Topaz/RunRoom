import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails } from '../../utils/api';

const EditProfile = (props) => {

    const userId = useSelector(state => state.user.userId);
    const accessToken = useSelector(state => state.user.accessToken);
    const phoneNumber = useSelector(state => state.user.phoneNumber);
    const dispatch = useDispatch();
    const phoneInput = useRef(null);

    return (
        <View></View>
    );
}

const styles = StyleSheet.create({

});

export default EditProfile;