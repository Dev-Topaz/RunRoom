import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, FlatList, ImageBackground, TouchableOpacity, Pressable, ActivityIndicator, Alert, StatusBar } from 'react-native';
import SvgIcon from '../../components/svgIcon';
import global from '../../global';
import css from '../../css';

import { useSelector, useDispatch } from 'react-redux';
import { getAllRunRooms, disjoinRun } from '../../utils/api';


const RunMain = (props) => {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.userId);
    const accessToken = useSelector(state => state.user.accessToken);
    const unit = useSelector(state => state.setting.unit);

    const filterOption = {
        invited: false,
        participating: true,
        organized: false,
        startValue: 0,
        endValue: 20,
        unit: 1,
        dateValue: new Date(),
    };

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState(new Date());
    const [isEmpty, setEmpty] = useState(false);

    useEffect(() => {
        StatusBar.setHidden(true);
    }, []);

    useEffect(() => {
        setLoading(true);
        getAllRunRooms(page, 3, filterOption).then(result => {
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
        const timer = setInterval(() => setCurrent(new Date()), 60000);
        let target = [...data];

        while(true) {
            if(target.length < 1)
                break;
            if(getRemainTimeStyle(current, target[0].runDateTime) == 4) {
                target.shift();
            } else {
                setData(target);
                break;
            }
        }

        return () => clearInterval(timer);
    }, [current]);

    useEffect(() => {
        if(data.length < 1)
            setEmpty(true);
        else
            setEmpty(false);
    }, [data]);

    return (
        <View style={{ flex: 1, backgroundColor: global.COLOR.BACKGROUND }}>
            <View style={css.mainHeader}>
                <View style={css.mainTitleContainer}>

                </View>
            </View>
        </View>
    );
}