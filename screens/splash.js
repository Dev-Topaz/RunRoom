import React from 'react';
import { View, Image } from 'react-native';
import global from '../global';

const Splash = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={ global.IMAGE.SPLASH }
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            />
        </View>
    );
}

export default Splash;