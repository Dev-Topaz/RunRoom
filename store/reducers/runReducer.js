import { ROOM_ENTER, RANK_CUSTOMIZE } from '../constants';

const initialState = {
    roomId: null,
    runDateTime: new Date(),
    distance: 0,
    page: null,
    canRank: false,
    isRank: false,
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

        case RANK_CUSTOMIZE:
            return {
                ...state,
                canRank: action.payload.canRank,
                isRank: action.payload.isRank
            };

        default:
            return state;
    }
}

export default runReducer;