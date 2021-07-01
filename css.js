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
    modalContainer801: {
        width: global.CONSTANTS.WIDTH,
        height: global.CONSTANTS.SIZE_801,
        backgroundColor: 'white',
        top: global.CONSTANTS.HEIGHT - global.CONSTANTS.SIZE_801,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 45,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: global.CONSTANTS.SIZE_20,
    },
    modalTitleText: {
        fontFamily: 'SFProMedium',
        fontSize: 18,
        color: global.COLOR.PRIMARY100,
    },
    modalCloseButton: {
        position: 'absolute',
        right: 1,
    },
    modalBackButton: {
        position: 'absolute',
        left: 6,
    },
    mainHeader: {
        height: global.CONSTANTS.SIZE_110,
        backgroundColor: 'white',
        borderColor: global.COLOR.HEADER_BORDER,
        borderWidth: 0.5,
        justifyContent: 'flex-end',
    },
    mainTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        paddingHorizontal: global.CONSTANTS.SIZE_20,
    },
    card: {
        width: global.CONSTANTS.CARD_373,
        height: global.CONSTANTS.CARD_460,
        backgroundColor: 'white',
        borderRadius: 15,
        overflow: 'hidden',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: global.CONSTANTS.SIZE_20,
    },
    cardThumbnail: {
        height: global.CONSTANTS.THUMB_381,
        width: '100%',
        resizeMode: 'contain',
    },
    thumbOverlay: {
        height: '100%',
        width: '100%',
        backgroundColor: global.COLOR.BLACK20,
    },
    statusContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: global.COLOR.SIZE_20,
    },
    hostAvatar: {
        width: global.CONSTANTS.SQUARE_50,
        height: global.CONSTANTS.SQUARE_50,
        resizeMode: 'contain',
        borderRadius: 12,
    },
    leftTop: {
        position: 'absolute',
        left: global.CONSTANTS.SIZE_20,
        top: global.CONSTANTS.SIZE_20,
    },
    leftBottom: {
        position: 'absolute',
        left: global.CONSTANTS.SIZE_20,
        bottom: global.CONSTANTS.SIZE_20,
    },
    rightBottom: {
        position: 'absolute',
        right: global.CONSTANTS.SIZE_20,
        bottom: global.CONSTANTS.SIZE_20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightTop: {
        position: 'absolute',
        right: global.CONSTANTS.SIZE_20,
        top: global.CONSTANTS.SIZE_20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    thumbRunnerText: {
        fontFamily: 'SFProMedium',
        fontSize: 14,
        color: 'white',
    },
    thumbDistanceText: {
        fontFamily: 'FuturaT',
        fontSize: 36,
        color: 'white',
        width: 150,
    },
    typeSymbol: {
        fontFamily: 'SFProBold',
        fontSize: 10,
        color: global.COLOR.SECONDARY,
        marginRight: 8,
    },
    typeText: {
        fontFamily: 'SFProMedium',
        fontSize: 14,
        color: 'white',
    },
    thumbDateText: {
        fontFamily: 'SFProBold',
        fontSize: 20,
        color: 'white',
        marginBottom: 5,
    },
    thumbRemainText1: {
        fontFamily: 'SFProMedium',
        fontSize: 12,
        color: global.COLOR.PRIMARY100,
        height: 30,
        paddingVertical: 8,
        paddingHorizontal: 15,
        overflow: 'hidden',
        borderRadius: 15,
        backgroundColor: global.COLOR.WHITE75,
        textAlign: 'center',
    },
    thumbRemainText2: {
        fontFamily: 'SFProMedium',
        fontSize: 12,
        color: 'white',
    },
    thumbRemainText3: {
        fontFamily: 'SFProMedium',
        fontSize: 16,
        color: global.COLOR.HEADER_TITLE,
        height: 60,
        width: global.CONSTANTS.WIDTH - global.CONSTANTS.SIZE_20 * 4,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: global.COLOR.WHITE95,
        textAlign: 'center',
        paddingTop: 21,
    },
    badge: {
        width: global.CONSTANTS.CIRCLE_36,
        height: global.CONSTANTS.CIRCLE_36,
        borderRadius: global.CONSTANTS.CIRCLE_36 / 2,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: global.COLOR.STATUS_INACTIVE,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        fontFamily: 'SFProMedium',
        fontSize: 12,
        color: global.COLOR.PRIMARY100,
    },
    followAvatar: {
        height: global.CONSTANTS.CIRCLE_36,
        width: global.CONSTANTS.CIRCLE_36,
        resizeMode: 'contain',
        borderRadius: global.CONSTANTS.CIRCLE_36 / 2,
        borderWidth: 1,
        borderColor: 'white',
        position: 'absolute',
    },
    cardInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: global.CONSTANTS.SIZE_20,
    },
    hostAvatar: {
        width: global.CONSTANTS.SQUARE_50,
        height: global.CONSTANTS.SQUARE_50,
        resizeMode: 'contain',
        borderRadius: 12,
    },
    hostInfo: {
        height: global.CONSTANTS.SQUARE_50,
        marginLeft: 15,
    },
    hostName: {
        fontFamily: 'SFProMedium',
        fontSize: 14,
        color: 'black',
    },
    hostInvited: {
        flexDirection: 'row',
        marginTop: 5,
    },
    hostLabel: {
        fontFamily: 'SFProRegular',
        fontSize: 12,
        color: global.COLOR.PRIMARY70,
    },
    inviteLabel: {
        fontFamily: 'SFProMedium',
        fontSize: 12,
        color: global.COLOR.SECONDARY,
    },
    participateStatus: {
        position: 'absolute',
        right: global.CONSTANTS.SIZE_20,
    },
    participatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    participatingText: {
        fontFamily: 'SFProMedium',
        fontSize: 12,
        color: global.COLOR.PRIMARY100,
        marginLeft: 6,
    },
    participateButton: {
        width: 105,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: global.COLOR.PRIMARY100,
    },
    participateText: {
        fontFamily: 'SFProMedium',
        fontSize: 12,
        color: 'white',
    },
    enterLobbyContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    enterLobbyButton: {
        width: 120,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: global.COLOR.SECONDARY,
        marginBottom: 5,
    },
    enterLobbyText: {
        fontFamily: 'SFProMedium',
        fontSize: 12,
        color: 'white',
    },
    lobbyIndicatorText: {
        fontFamily: 'SFProRegular',
        fontSize: 10,
        color: '#8C8D8E',
    },
});