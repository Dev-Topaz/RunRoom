import { StyleSheet } from 'react-native';
import global from './global';

export default StyleSheet.create({
    overlay: {
        width: global.CONSTANTS.WIDTH,
        height: global.CONSTANTS.HEIGHT,
        backgroundColor: global.COLOR.BLACK40,
    },
    bgAuthContainer: {
        flex: 1,
        paddingHorizontal: global.CONSTANTS.SIZE_20,
        paddingTop: global.CONSTANTS.SPACE_95,
    },
    titleText: {
        fontFamily: 'FuturaT',
        fontSize: 24,
    },
    authIndicatorText: {
        fontFamily: 'SFProRegular',
        fontSize: 14,
        lineHeight: 20,
        color: global.COLOR.PRIMARY70,
        marginTop: 10,
    },
    labelText: {
        fontFamily: 'SFProMedium',
        fontSize: 14,
        color: global.COLOR.PRIMARY100,
    },
    textInputContainer: {
        height: global.CONSTANTS.SIZE_60,
        backgroundColor: global.COLOR.BACKGROUND,
        justifyContent: 'center',
        paddingHorizontal: global.CONSTANTS.SIZE_20,
        marginTop: 5,
    },
    inputText: {
        fontFamily: 'SFProMedium',
        fontSize: 16,
        color: global.COLOR.PRIMARY100,
    },
    submitButton: {
        height: global.CONSTANTS.SIZE_60,
        backgroundColor: global.COLOR.PRIMARY100,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitText: {
        fontFamily: 'SFProMedium',
        fontSize: 16,
        color: 'white',
    },
});