import { MOBILE_NUMBER_CHANGE, MOBILE_NUMBER_VERIFIED, LOG_OUT, LOG_IN } from '../constants';

const initialState = {
    phoneNumber: '',
    userType: 0,
    userId: null,
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
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
                userType: action.payload.userType
            };

        case LOG_OUT:
            return {
                ...state,
                phoneNumber: '',
                userType: 2,
                userId: null,
                accessToken: null,
                refreshToken: null
            }

        case LOG_IN:
            return {
                ...state,
                isLoggedIn: action.payload
            }

        default:
            return state;
    }
}

export default userReducer;
