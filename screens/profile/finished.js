import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Text, Pressable, FlatList, ActivityIndicator } from 'react-native';
import global from '../../global';
import css from '../../css';

import { useSelector } from 'react-redux';
import { getFinishedRuns } from '../../utils/api';
import { convertFloat, displayRunDateTime } from '../../utils/func';

const ProfileFinished = (props) => {

    const accessToken = useSelector(state => state.user.accessToken);
    const unit = useSelector(state => state.setting.unit);

    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEmpty, setEmpty] = useState(false);

    useEffect(() => {
        setLoading(true);
        getFinishedRuns(page, 3, accessToken).then(result => {
            if(result != null && result.length > 0) {
                if(page != 1)
                    setData([...data, ...result]);
                else
                    setData(result);
            }
            setLoading(false);
        });
        setLoading(false);
    }, [page]);

    useEffect(() => {
        if(data.length < 1)
            setEmpty(true);
        else
            setEmpty(false);
    }, [data]);

    const pressItem = (index) => {
        console.log(props);
        const roomInfo = {
            roomId: data[index].id,
            runDistanceKilometers: data[index].runDistanceKilometers,
            runDistanceMiles: data[index].runDistanceMiles,
        };
        props.navigation.navigate('Result');
    }

    const renderItem = ({ item, index }) => (
        <Pressable key={item.id} style={styles.card} onPress={() => pressItem(index)}>
            <ImageBackground source={stockImages[item.stockImageID]} style={css.cardThumbnail}>
                <View style={css.thumbOverlay}>
                    <View style={css.leftTop}>
                        <Text style={css.thumbRunnerText}>{item.totalRunnersCount + (item.totalRunnersCount == 1 ? ' Runner' : ' Runners')}</Text>
                        <Text style={css.thumbDistanceText}>{convertFloat(unit == 1 ? item.runDistanceMiles : item.runDistanceKilometers) + (unit == 1 ? ' MI' : ' KM')}</Text>
                        <Text style={styles.dateText}>{displayRunDateTime(new Date(), item.runDateTime)}</Text>
                    </View>
                    <View style={css.rightBottom}>
                        <View style={css.participateButton}>
                            <Text style={css.participateText}>FINISHED</Text>
                        </View>
                    </View>
                    <View style={css.leftBottom}>
                        <Text style={[css.thumbRemainText2, { marginBottom: 1 }]}>{item.roomType == 1 ? 'Public' : 'Private'}</Text>
                        <Text style={css.thumbDateText}>{'Ranked ' + item.currenUserDetails.rank}</Text>
                        <Text style={[css.thumbRemainText2, { marginBottom: 4 }]}>{'Avg pace ' + Math.floor(item.currenUserDetails.averagePace * 10) / 10 + (unit == 1 ? ' min/mile' : ' min/km')}</Text>
                    </View>
                    <View style={css.rightTop}>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                item.runners.length > 3 ?
                                    <View>
                                        <View style={[css.badge, {right: 0}]}>
                                            <Text style={css.badgeText}>{'+' + (item.runners.length - 3)}</Text>
                                        </View>
                                        <Image source={item.runners[2].runnerPicture == null ? unknown : item.runners[2].runnerPicture} style={[css.followAvatar, {right: 25}]}/>
                                        <Image source={item.runners[1].runnerPicture == null ? unknown : item.runners[1].runnerPicture} style={[css.followAvatar, {right: 48}]}/>
                                        <Image source={item.runners[0].runnerPicture == null ? unknown : item.runners[0].runnerPicture} style={[css.followAvatar, {right: 70}]}/>
                                    </View>
                                : item.runners.map((runner, idx = 0) => {
                                    return (
                                        <Image key={idx} source={runner.runnerPicture == null ? unknown : {uri: runner.runnerPicture}} style={[css.followAvatar, {right: 25*idx++}]}/>
                                    );
                                })
                            }
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </Pressable>
    );

    return (
        <View style={{ flex: 1 }}>
            {
                isEmpty ?
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No Runs Finished</Text>
                    </View>
                :   <FlatList
                        data={ data }
                        renderItem={ renderItem }
                        onEndReachedThreshold={ 0.2 }
                        keyExtractor={ item => item.id }
                        refreshing={ loading }
                        onRefresh={ () => setPage(1) }
                        onEndReached={ () => setPage(page => page + 1) }
                        ItemSeparatorComponent={ null }
                        ListFooterComponent={ () => loading && page != 1 ? <View style={styles.listFooter}><ActivityIndicator animating size='large'/></View> : null }
                    />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontFamily: 'SFProBold',
        fontSize: 24,
        color: global.COLOR.PRIMARY100,
    },
    listFooter: {
        paddingVertical: 20,
    },
    card: {
        width: global.CONSTANTS.CARD_373,
        height: global.CONSTANTS.THUMB_381,
        borderRadius: 15,
        overflow: 'hidden',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: global.CONSTANTS.SIZE_20,
    },
    dateText: {
        fontFamily: 'SFProMedium',
        fontSize: 16,
        color: 'white',
        marginTop: 5,
    },
});

export default ProfileFinished;

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

const unknown = global.IMAGE.UNKNOWN;