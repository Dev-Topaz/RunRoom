import { MOBILE_NUMBER_CHANGE, UNIT_CHANGE, MOBILE_NUMBER_VERIFIED, ROOM_ENTER, LOG_OUT, RANK_CUSTOMIZE, RANK_SET, BOARD_ENTER, CLICK_INVITE, PREV_FLAG } from '../constants';

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

export function changeRoom(roomId, runDateTime, distance, page) {

    return {
        type: ROOM_ENTER,
        payload: {
            roomId: roomId,
            runDateTime: runDateTime,
            distance: distance,
            page: page,
        }
    }
}

export function customizeRank(canRank) {

    return {
        type: RANK_CUSTOMIZE,
        payload: canRank
    }
}

export function setRank(isRank) {

    return {
        type: RANK_SET,
        payload: isRank
    }
}

export function userLogout() {

    return {
        type: LOG_OUT,
        payload: true
    }
}

export function changeBoard(roomInfo) {

    return {
        type: BOARD_ENTER,
        payload: roomInfo
    }
}

export function clickInvite(pageInfo) {

    return {
        type: CLICK_INVITE,
        payload: pageInfo
    }
}

export function changePrevFlag(flag) {

    return {
        type: PREV_FLAG,
        payload: flag
    }
}
