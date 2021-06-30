import React from 'react';
import { Stylesheet, View, ImageBackground, Image, Text } from 'react-native';
import global from '../global';
import css from '../css';
import { convertFloat } from '../utils/func';

import { useSelector } from 'react-redux';

const renderItem = ({ item, index }) => {

    const unit = useSelector(state => state.setting.unit);

    return (
        <View key={item.id} style={css.card}>
            <ImageBackground source={stockImages[item.stockImageID]} style={css.thumbnail}>
                <View style={css.thumbOverlay}>
                    <View style={css.leftTop}>
                        <Text style={css.thumbRunnerText}>{item.totalRunnersCount + (item.totalRunnersCount  == 1 ? ' Runner' : ' Runners')}</Text>
                        <Text style={css.thumbDistanceText}>{convertFloat(unit == 1 ? item.runDistanceMiles : item.runDistanceKilometers) + (unit == 1 ? ' MI' : ' KM')}</Text>
                    </View>
                    <View style={css.rightBottom}>
                        <Text style={css.typeSymbol}>●</Text>
                        <Text style={css.typeText}>{item.roomType == 1 ? 'PUBLIC' : 'PRIVATE'}</Text>
                    </View>
                    <View style={css.leftBottom}>
                        
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = Stylesheet.create({

});

export default renderItem;

const stockImages = [
    global.IMAGE.STOCK.STOCK_1,
    global.IMAGE.STOCK.STOCK_2,
    global.IMAGE.STOCK.STOCK_3,
    global.IMAGE.STOCK.STOCK_4,
    global.IMAGE.STOCK.STOCK_5,
    global.IMAGE.STOCK.STOCK_6,
    global.IMAGE.STOCK.STOCK_7,
    global.IMAGE.STOCK.STOCK_8,
    global.IMAGE.STOCK.STOCK_9,
    global.IMAGE.STOCK.STOCK_10,
    global.IMAGE.STOCK.STOCK_11,
    global.IMAGE.STOCK.STOCK_12,
    global.IMAGE.STOCK.STOCK_13,
    global.IMAGE.STOCK.STOCK_14,
    global.IMAGE.STOCK.STOCK_15,
    global.IMAGE.STOCK.STOCK_16,
    global.IMAGE.STOCK.STOCK_17,
    global.IMAGE.STOCK.STOCK_18,
    global.IMAGE.STOCK.STOCK_19,
];

const unknown = require('../assets/unknown.png');