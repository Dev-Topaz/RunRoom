import { MOBILE_NUMBER_CHANGE, UNIT_CHANGE, MOBILE_NUMBER_VERIFIED, ROOM_ENTER, LOG_OUT } from '../constants';

export function changeMobileNumber(phoneNumber) {
    
    return {
        type: MOBILE_NUMBER_CHANGE,
        payload: phoneNumber
    }
}

export function changeUnit(unit) {

    return {
        type: UNIT_CHANGE,
        payload: unit
    }
}

export function codeVerified(userInfo) {

    return {
        type: MOBILE_NUMBER_VERIFIED,
        payload: userInfo
    }
}

export function changeRoom(roomId, runDateTime) {

    return {
        type: ROOM_ENTER,
        payload: {
            roomId: roomId,
            runDateTime: runDateTime
        }
    }
}

export function userLogout() {

    return {
        type: LOG_OUT,
        payload: true
    }
}