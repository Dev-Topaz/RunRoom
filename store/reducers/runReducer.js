import { ROOM_ENTER, RANK_CUSTOMIZE, BOARD_ENTER } from '../constants';

const initialState = {
    roomId: null,
    runDateTime: new Date(),
    distance: 0,
    page: null,
    canRank: false,
    isRank: false,
    boardId: null,
    boardDistanceKilometers: 0,
    boardDistanceMiles: 0,
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

        case BOARD_ENTER:
            return {
                ...state,
                boardId: action.payload.roomId,
                boardDistanceMiles: action.payload.runDistanceMiles,
                boardDistanceKilometers: action.payload.runDistanceKilometers,
            };

        default:
            return state;
    }
}

export default runReducer;