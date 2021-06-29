import { MOBILE_NUMBER_CHANGE } from '../constants';

const initialState = {
    phoneNumber: '',
    userType: 0,
    userId: null,
    accessToken: null,
    refreshToken: null,
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case MOBILE_NUMBER_CHANGE:
            return {
                ...state,
                phoneNumber: action.payload
            };

        default:
            return state;
    }
}

export default userReducer;