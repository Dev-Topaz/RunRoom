import { MOBILE_NUMBER_CHANGE, UNIT_CHANGE } from '../constants';

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