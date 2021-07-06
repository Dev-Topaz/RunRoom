import { ROOM_ENTER } from '../constants';

const initialState = {
    roomId: null,
    runDateTime: new Date(),
};

const runReducer = (state = initialState, action) => {
    switch(action.type) {
        case ROOM_ENTER:
            return {
                ...state,
                roomId: action.payload.roomId,
                runDateTime: action.payload.runDateTime
            };

        default:
            return state;
    }
}

export default runReducer;