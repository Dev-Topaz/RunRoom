import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground, FlatList, ActivityIndicator, Pressable, Alert, StatusBar } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';
import css from '../../css';

import { useSelector, useDispatch } from 'react-redux';

const RoomMain = (props) => {

    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.user.accessToken);
    const userId = useSelector(state => state.user.userId);
    const unit = useSelector(state => state.setting.unit);

    const [isEmpty, setEmpty] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: global.COLOR.BACKGROUND }}>
            <View style={css.mainHeader}>
                <View style={css.mainTitleContainer}>
                    <Text style={[css.titleText, { color: global.COLOR.HEADER_TITLE }]}>RUNROOMS</Text>
                    <Pressable>
                        <SvgIcon icon='Filter'/>
                    </Pressable>
                </View>
            </View>
            {
                isEmpty ?
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No RunRooms Found</Text>
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
            <FloatingAction
                color={ global.COLOR.PRIMARY100 }
                distanceToEdge={ global.CONSTANTS.SIZE_20 }
                showBackground={ false }
                animated={ false }
                onPressMain={ () => props.navigation.navigate('Create') } 
            />
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
});

export default RoomMain;