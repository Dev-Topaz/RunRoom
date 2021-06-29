import { MOBILE_NUMBER_CHANGE, MOBILE_NUMBER_VERIFIED } from '../constants';

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

        case MOBILE_NUMBER_VERIFIED:
            return {
                ...state,
                userId: action.payload.userId,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                userType: action.payload.userType,
            };

        default:
            return state;
    }
}

export default userReducer;