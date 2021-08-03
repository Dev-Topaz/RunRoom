import { UNIT_CHANGE, RANK_SET } from '../constants';

const initialState = {
    unit: 1,
    isRank: false,
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

        default:
            return state;
    }
}

export default settingReducer;