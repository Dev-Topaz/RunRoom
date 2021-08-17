import React from 'react';
import { View, Image, Text } from 'react-native';
import global from '../global';

const Loading = () => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={global.IMAGE.LOADING} style={{ width: 100, height: 100, resizeMode: 'contain' }}/>
            <Text style={{ fontSize: 18, marginTop: 20 }}>LOADING ...</Text>
        </View>
    );
}

export default Loading;