import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeUnit } from '../store/actions/actions';
import { isInteger } from 'lodash';
import moment from 'moment';

export async function initUnitFromStorageToRedux(dispatch) {

    try {
        const value = await AsyncStorage.getItem('unit');
        if(value != null) {
            dispatch(changeUnit(parseInt(value)));
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
    } catch(e) {
        console.log('Error: ' + e);
    }
}

export function convertFloat(distance) {
    let dist = Math.floor(distance * 10) / 10;
        if(isInteger(dist))
            return dist + '.0';
        else 
            return dist + '';
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
    else if(tm > 2)
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
    } else {
        remain = remain + tm + ' minutes';
        return remain + ' to START';
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
