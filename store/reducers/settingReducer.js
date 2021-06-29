import { UNIT_CHANGE } from '../constants';

const initialState = {
    unit: 1,

};

const settingReducer = (state = initialState, action) => {
    switch(action.type) {
        case UNIT_CHANGE:
            return {
                ...state,
                unit: action.payload
            };

        default:
            return state;
    }
}

export default settingReducer;