import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import settingReducer from './reducers/settingReducer';

const rootReducer = combineReducers(
    {
        user: userReducer,
        setting: settingReducer,
    }
);

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;