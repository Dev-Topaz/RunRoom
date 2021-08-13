import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeMobileNumber, changeUnit, codeVerified, customizeRank, setRank } from '../store/actions/actions';
import { isInteger } from 'lodash';
import moment from 'moment';
import { getUserDetails, refreshAccessToken } from './api';

export async function checkIfLoggedIn(dispatch) {
    const phoneNumber = await AsyncStorage.getItem('phoneNumber');
    const userId = await AsyncStorage.getItem('userId');
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    
    if(accessToken != null && refreshToken != null && userId != null && phoneNumber != null) {
        const result = refreshAccessToken(accessToken, refreshToken).then(res => {
            if(res != null) {
                const userInfo = {
                    userId: userId,
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken,
                    userType: 1,
                };
                dispatch(codeVerified(userInfo));
                dispatch(changeMobileNumber(phoneNumber));
                getUserDetails(userId, res.accessToken).then(user => {
                    if(user != null) {
                        if(user.gender != 0 && user.ageGroup != 0)
                            dispatch(customizeRank(true));
                        else
                            dispatch(customizeRank(false));
                    }
                });
                return true;
            } else {
                return false;
            }
        });
        return result;
    } else {
        return false;
    }
}

export async function rememberCurrentUser(phoneNumber, userId, accessToken, refreshToken) {
    try {
        AsyncStorage.multiSet([['phoneNumber', phoneNumber], ['userId', userId], ['accessToken', accessToken], ['refreshToken', refreshToken]], (err) => {
            if(err) {
                console.log('There is an error.');
                throw err;
            }
        }).catch(err => {
            console.log(err);
        });
    } catch(e) {
        console.log('Error: ' + e);
    }
}

export async function initUnitFromStorageToRedux(dispatch) {

    try {
        const unitValue = await AsyncStorage.getItem('unit');
        if(unitValue != null) {
            dispatch(changeUnit(parseInt(unitValue)));
        } else {
            AsyncStorage.setItem('unit', '1', (err) => {
                if(err) {
                    console.log('There is an error.');
                    throw err;
                } else {
                    dispatch(changeUnit(1));
                }
            }).catch((err) => {
                console.log(err);
            });
        }

        const isRank = await AsyncStorage.getItem('rank');
        if(isRank != null) {
            if(isRank == '0')
                dispatch(setRank(false));
            else
                dispatch(setRank(true));
        } else {
            AsyncStorage.setItem('rank', '0', (err) => {
                if(err) {
                    console.log('There is an error.');
                    throw err;
                } else {
                    dispatch(setRank(false));
                }
            }).catch(err => {
                console.log(err);
            });
        }
    } catch(e) {
        console.log('Error: ' + e);
    }
}

export function convertFloat(distance, num = 1, isCeil = false) {
    if(num == 1) {
        let dist = Math.floor(distance * 10) / 10;
        if(isInteger(dist)) {
            if(isCeil && dist < 1)
                return '0.1';
            return dist + '.0';
        } else {
            return dist + '';
        }
    } else if(num == 2) {
        let dist = Math.floor(distance * 100) / 100;
        if(isInteger(dist))
            return dist + '.00';
        else if(isInteger(dist * 10))
            return dist + '0';
        else
            return dist + '';
    } else {
        console.log('error');
    }
}

export function getRemainTimeStyle(current, target) {
    const dateObject = new Date(target);
    let ts = (dateObject.getTime() - current.getTime()) / 1000;
    let td = Math.floor(ts / (3600 * 24));
    let th = Math.floor(ts % (3600 * 24) / 3600);
    let tm = Math.floor(ts % 3600 / 60);

    if(td > 0)
        return 1;
    else if(th > 0)
        return 2;
    else if(tm > 1)
        return 3;
    else
        return 4;
}

export function displayRemainTime(current, target) {
    const dateObject = new Date(target);
    let ts = (dateObject.getTime() - current.getTime()) / 1000;
    let td = Math.floor(ts / (3600 * 24));
    let th = Math.floor(ts % (3600 * 24) / 3600);
    let tm = Math.floor(ts % 3600 / 60);
    let remain = '';

    if(td > 0) {
        remain = remain + td + (td == 1 ? ' day' : ' days');
        if(th > 0)
            remain = remain + ' and ' + th + (th == 1 ? ' hour' : ' hours');
        return remain + ' to start';
    } else if(th > 0) {
        remain = remain + th + (th == 1 ? ' hour' : ' hours');
        if(tm > 0)
            remain = remain + ' and ' + tm + ' min';
        return remain + ' to start';
    } else if(tm > 1) {
        remain = remain + tm + ' minutes';
        return remain + ' to START';
    } else {
        if(tm > 0)
            return '1 minute to START';
        else
            return 'Less than a minute to START';
    }
}

export function displayRunDateTime(current, target) {
    if(moment(target).isSame(current, 'day'))
        return moment(target.toString()).format('HH:mm, [Today]');
    else
        return moment(target.toString()).format('HH:mm, ddd MMM D');
}

export function displayLobbyTime(current, target) {
    const dateObject = new Date(target);
    let ts = (dateObject.getTime() - current.getTime()) / 1000;
    let tm = Math.floor(ts % 3600 / 60) - 1;
    return tm + ' minutes';
}

export function showDateInfo(date) {
    let dateString = date.toString();
    let timeString = dateString.split(' ')[4];
    let weekdayString = dateString.split(' ')[0];
    let monthString = dateString.split(' ')[1];
    let dayString = dateString.split(' ')[2];
    timeString = timeString.slice(0, -3);
    
    return timeString + ', ' + weekdayString + ' ' + monthString + ' ' + dayString;
}

export function findIndex(target, origin) {
    return origin.findIndex(item => target.connectedUserId === item.connectedUserId);
}

export function getDistancePercent(currentDistance, totalDistance) {
    let percent = currentDistance / totalDistance * 100;
    let result = Math.floor(percent * 10) / 10;
    if(result > 100)
        result = 100;

    if(result == 100)
        return '100';

    if(isInteger(result))
        return result + '.0';
    else
        return result + '';
}

export function convertUnit(target, unit) {
    if(target == 0)
        return 0;
    if(unit == 1) {
        return 1609.344 / target;
    } else {
        return 1000 / target;
    }
}

export function displayPace(time) {
    let ts = Math.floor(time % 60);
    let tm = Math.floor(time / 60);
    return tm + ':' + (ts < 10 ? '0' + ts : ts);
}

export function renderMaxValue(value) {
    if(value > 20)
        return '20+';
    else
        return value + '';
}

export function renderMinValue(value) {
    if(value > 20)
        return '20';
    else
        return value + '';
}

export function displayStatisticsValue(value, type) {

    if(value == null || value == undefined)
        return '—';

    if(value == 0 || value < 0)
        return '—';
        
    let result;
    switch(type) {
        case 1:
            return Math.floor(value) + '';
        case 2:
            result =  Math.floor(value * 10) / 10;
            if(isInteger(result))
                return result + '.0%';
            else
                return result + '%';
        case 3:
            const ts = Math.floor(value % 60);
            const tm = Math.floor(value / 60);
            return tm + ':' + (ts < 10 ? '0' + ts : ts);
        case 4:
            result = Math.floor(value * 10) / 10;
            if(isInteger(result))
                return result + '.0';
            else
                return result + '';
        case 5:
            const th = value / 3600;
            result = Math.floor(th * 10) / 10;
            if(isInteger(result))
                return result + '.0';
            else
                return result + '';
        default:
            return '';
    }
}
