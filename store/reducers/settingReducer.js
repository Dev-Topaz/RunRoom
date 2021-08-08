import { UNIT_CHANGE, RANK_SET, CLICK_INVITE, PREV_FLAG } from '../constants';

const initialState = {
    unit: 1,
    isRank: false,
    prevPage: null,
    prevFlag: false,
};

const settingReducer = (state = initialState, action) => {
    switch(action.type) {
        case UNIT_CHANGE:
            return {
                ...state,
                unit: action.payload
            };

        case RANK_SET:
            return {
                ...state,
                isRank: action.payload
            }

        case CLICK_INVITE:
            return {
                ...state,
                prevPage: action.payload
            }

        case PREV_FLAG:
            return {
                ...state,
                prevFlag: action.payload
            }

        default:
            return state;
    }
}

export default settingReducer;