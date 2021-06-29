import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeUnit } from '../store/actions/actions';

export async function initUnitFromStorageToRedux(dispatch) {

    try {
        const value = await AsyncStorage.getItem('unit');
        if(value != null) {
            dispatch(changeUnit(parseInt(value)));
        } else {
            AsyncStorage.setItem('unit', '1', (err) => {
                if(err) {
                    console.log('There is an error.');
                    throw err;
                } else {
                    dispatch(changeUnit(1));
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    } catch(e) {
        console.log('Error: ' + e);
    }
}