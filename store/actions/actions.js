import { MOBILE_NUMBER_CHANGE, UNIT_CHANGE, MOBILE_NUMBER_VERIFIED, ROOM_ENTER } from '../constants';

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
            runDateTime: runDateTime,
        }
    }
}