import React, { useState, useEffect } from 'react';
import Loading from '../components/loading';
import AppNavigator from '../navigations/appNavigator';
import { checkIfLoggedIn, initUnitFromStorageToRedux } from '../utils/func';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAccessToken } from '../utils/api';
import { chanageLoggedIn, updateToken } from '../store/actions/actions';

const AppWrapper = () => {

    const accessToken = useSelector(state => state.user.accessToken);
    const refreshToken = useSelector(state => state.user.refreshToken);
    const dispatch = useDispatch();
    const [isLoaded, setLoaded] = useState(false);
    const [current, setCurrent] = useState(new Date());

    useEffect(() => {
        initUnitFromStorageToRedux(dispatch);
        checkIfLoggedIn(dispatch).then(result => {
            if(result)
                dispatch(chanageLoggedIn(true));
            else
                dispatch(chanageLoggedIn(false));

            setLoaded(true);
        })
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setCurrent(new Date()), 3000000);
        refreshAccessToken(accessToken, refreshToken).then(result => {
            if(result != null)
                dispatch(updateToken(result.accessToken));
        }).catch(err => {
            console.log(err);
        });

        return () => clearInterval(timer);
    }, [current]);

    if(!isLoaded)
        return (<Loading/>);
    
    return (<AppNavigator/>);
}

export default AppWrapper;
