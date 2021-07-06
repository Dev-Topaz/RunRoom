import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import settingReducer from './reducers/settingReducer';
import runReducer from './reducers/runReducer';

const rootReducer = combineReducers(
    {
        user: userReducer,
        setting: settingReducer,
        run: runReducer,
    }
);

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;