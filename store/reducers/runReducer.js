import { ROOM_ENTER } from '../constants';

const initialState = {
    roomId: null,
    runDateTime: new Date(),
    distance: 0,
    page: null,
};

const runReducer = (state = initialState, action) => {
    switch(action.type) {
        case ROOM_ENTER:
            return {
                ...state,
                roomId: action.payload.roomId,
                runDateTime: action.payload.runDateTime,
                distance: action.payload.distance,
                page: action.payload.page
            };

        default:
            return state;
    }
}

export default runReducer;