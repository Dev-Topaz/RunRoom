import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import global from '../../global';

import { useSelector } from 'react-redux';
import { displayStatisticsValue } from '../../utils/func';
import { getUserStatistics } from '../../utils/api';

const ProfileStatistics = () => {

    const userId = useSelector(state => state.user.userId);
    const accessToken = useSelector(state => state.user.accessToken);
    const unit = useSelector(state => state.setting.unit);
    const [userInfo, setUserInfo] = useState({
        runsCompletedAllTime: 0,
        runsCompletedThisMonth: 0,
        runsCompletedThisWeek: 0,
        runsCompletedAllTimeGlobalTop: 0,
        distanceCoveredMilesAllTime: 0,
        distanceCoveredKilometerAllTime: 0,
        distanceCoveredMilesThisMonth: 0,
        distanceCoveredKilometerThisMonth: 0,
        distanceCoveredMilesThisWeek: 0,
        distanceCoveredKilometerThisWeek: 0,
        distanceCoverdAllTimeGlobalTop: 0,
        runningTimeHoursAllTime: 0,
        runningTimeHoursThisMonth: 0,
        runningTimeHoursThisWeek: 0,
        runningTimeAllTimeGlobalTop: 0,
        uptoFiveMilesAveragePaceSecondsPerMileAllTime: 0,
        uptoFiveMilesAveragePaceSecondsPerKilometreAllTime: 0,
        uptoFiveMilesAveragePaceSecondsPerMileThisMonth: 0,
        uptoFiveMilesAveragePaceSecondsPerKilometreThisMonth: 0,
        uptoFiveMilesAveragePaceSecondsPerMileThisWeek: 0,
        uptoFiveMilesAveragePaceSecondsPerKilometreThisWeek: 0,
        uptoFiveMilesAveragePaceAllTimeGlobalTop: 0,
        fiveToTenMilesAveragePaceSecondsPerMileAllTime: 0,
        fiveToTenMilesAveragePaceSecondsPerKilometreAllTime: 0,
        fiveToTenMilesAveragePaceSecondsPerMileThisMonth: 0,
        fiveToTenMilesAveragePaceSecondsPerKilometreThisMonth: 0,
        fiveToTenMilesAveragePaceSecondsPerMileThisWeek: 0,
        fiveToTenMilesAveragePaceSecondsPerKilometreThisWeek: 0,
        fiveToTenMilesAveragePaceAllTimeGlobalTop: 0,
        tenToFifteenMilesAveragePaceSecondsPerMileAllTime: 0,
        tenToFifteenMilesAveragePaceSecondsPerKilometreAllTime: 0,
        tenToFifteenMilesAveragePaceSecondsPerMileThisMonth: 0,
        tenToFifteenMilesAveragePaceSecondsPerKilometreThisMonth: 0,
        tenToFifteenMilesAveragePaceSecondsPerMileThisWeek: 0,
        tenToFifteenMilesAveragePaceSecondsPerKilometreThisWeek: 0,
        tenToFifteenMilesAveragePaceAllTimeGlobalTop: 0,
        moreThanFifteenMilesAveragePaceSecondsPerMileAllTime: 0,
        moreThanFifteenMilesAveragePaceSecondsPerKilometreAllTime: 0,
        moreThanFifteenMilesAveragePaceSecondsPerMileThisMonth: 0,
        moreThanFifteenMilesAveragePaceSecondsPerKilometreThisMonth: 0,
        moreThanFifteenMilesAveragePaceSecondsPerMileThisWeek: 0,
        moreThanFifteenMilesAveragePaceSecondsPerKilometreThisWeek: 0,
        moreThanFifteenMilesAveragePaceAllTimeGlobalTop: 0,
    });

    useEffect(() => {
        getUserStatistics(userId, accessToken).then(result => {
            if(result != null && userId == result.userId) {
                setUserInfo(result);
            }
        });
    }, []);

    return (
        <View style={{ flex: 1, paddingHorizontal: global.CONSTANTS.SIZE_20, backgroundColor: 'white' }}>
            <View style={{ flex: 529 }}>
                <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: 'rgba(173, 174, 181, 0.5)' }]}>
                    <View style={styles.cell}><Text style={styles.headerText}></Text></View>
                    <View style={styles.cell}><Text style={styles.headerText}>All time</Text></View>
                    <View style={styles.cell}><Text style={styles.headerText}>This Month</Text></View>
                    <View style={styles.cell}><Text style={styles.headerText}>This Week</Text></View>
                    <View style={styles.cell}><Text style={styles.headerText}>{'All time' + '\n' + 'Global top'}</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.rowHeader}><Text style={styles.rowText}>{'Runs' + '\n' + 'Completed'}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(userInfo.runsCompletedAllTime, 1)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(userInfo.runsCompletedThisMonth, 1)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(userInfo.runsCompletedThisWeek, 1)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(userInfo.runsCompletedAllTimeGlobalTop, 2)}</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.rowHeader}>
                        <Text style={styles.rowText}>{'Distance' + '\n' + 'Covered'}</Text>
                        <Text style={styles.unitText}>{unit == 1 ? 'miles' : 'kilometers'}</Text>
                    </View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(unit == 1 ? userInfo.distanceCoveredMilesAllTime : userInfo.distanceCoveredKilometerAllTime, 1)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(unit == 1 ? userInfo.distanceCoveredMilesThisMonth : userInfo.distanceCoveredKilometerThisMonth, 1)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(unit == 1 ? userInfo.distanceCoveredMilesThisWeek : userInfo.distanceCoveredKilometerThisWeek, 1)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(userInfo.distanceCoverdAllTimeGlobalTop, 2)}</Text></View>
                </View>
                <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: 'rgba(173, 174, 181, 0.5)' }]}>
                    <View style={styles.rowHeader}>
                        <Text style={styles.rowText}>Running Time</Text>
                        <Text style={styles.unitText}>hours</Text>
                    </View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(userInfo.runningTimeHoursAllTime, 1)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(userInfo.runningTimeHoursThisMonth, 1)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(userInfo.runningTimeHoursThisWeek, 1)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(userInfo.runsCompletedAllTimeGlobalTop, 2)}</Text></View>
                </View>
            </View>
            <View style={{ flex: 697 }}>
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.secondHeaderText}>Average Pace</Text>
                    <Text style={[styles.headerText, { textAlign: 'left', marginTop: 5 }]}>{'Minutes / ' + (unit == 1 ? 'mile' : 'km')}</Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.rowHeader}>
                        <Text style={styles.rowText}>{'< 5 ' + (unit == 1 ? 'mile' : 'km')}</Text>
                        <Text style={styles.unitText}>Runs</Text>
                    </View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(unit == 1 ? userInfo.uptoFiveMilesAveragePaceSecondsPerMileAllTime : userInfo.uptoFiveMilesAveragePaceSecondsPerKilometreAllTime, 3)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(unit == 1 ? userInfo.uptoFiveMilesAveragePaceSecondsPerMileThisMonth : userInfo.uptoFiveMilesAveragePaceSecondsPerKilometreThisMonth, 3)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(unit == 1 ? userInfo.uptoFiveMilesAveragePaceSecondsPerMileThisWeek : userInfo.uptoFiveMilesAveragePaceSecondsPerKilometreThisWeek, 3)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(userInfo.uptoFiveMilesAveragePaceAllTimeGlobalTop, 2)}</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.rowHeader}>
                        <Text style={styles.rowText}>{'5 to 10 ' + (unit == 1 ? 'mile' : 'km')}</Text>
                        <Text style={styles.unitText}>Runs</Text>
                    </View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(unit == 1 ? userInfo.fiveToTenMilesAveragePaceSecondsPerMileAllTime : userInfo.fiveToTenMilesAveragePaceSecondsPerKilometreAllTime, 3)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(unit == 1 ? userInfo.fiveToTenMilesAveragePaceSecondsPerMileThisMonth : userInfo.fiveToTenMilesAveragePaceSecondsPerKilometreThisMonth, 3)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(unit == 1 ? userInfo.fiveToTenMilesAveragePaceSecondsPerMileThisWeek : userInfo.fiveToTenMilesAveragePaceSecondsPerKilometreThisWeek, 3)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(userInfo.fiveToTenMilesAveragePaceAllTimeGlobalTop, 2)}</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.rowHeader}>
                        <Text style={styles.rowText}>{'10 to 15 ' + (unit == 1 ? 'mile' : 'km')}</Text>
                        <Text style={styles.unitText}>Runs</Text>
                    </View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(unit == 1 ? userInfo.tenToFifteenMilesAveragePaceSecondsPerMileAllTime : userInfo.tenToFifteenMilesAveragePaceSecondsPerKilometreAllTime, 3)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(unit == 1 ? userInfo.tenToFifteenMilesAveragePaceSecondsPerMileThisMonth: userInfo.tenToFifteenMilesAveragePaceSecondsPerKilometreThisMonth, 3)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(unit == 1 ? userInfo.tenToFifteenMilesAveragePaceSecondsPerMileThisWeek : userInfo.tenToFifteenMilesAveragePaceSecondsPerKilometreThisWeek, 3)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(userInfo.tenToFifteenMilesAveragePaceAllTimeGlobalTop, 2)}</Text></View>
                </View>
                <View style={styles.row}>
                <View style={styles.rowHeader}>
                        <Text style={styles.rowText}>{'> 15 ' + (unit == 1 ? 'mile' : 'km')}</Text>
                        <Text style={styles.unitText}>Runs</Text>
                    </View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(unit == 1 ? userInfo.moreThanFifteenMilesAveragePaceSecondsPerMileAllTime : userInfo.moreThanFifteenMilesAveragePaceSecondsPerKilometreAllTime, 3)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(unit == 1 ? userInfo.moreThanFifteenMilesAveragePaceSecondsPerMileThisMonth : userInfo.moreThanFifteenMilesAveragePaceSecondsPerKilometreThisMonth, 3)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(unit == 1 ? userInfo.moreThanFifteenMilesAveragePaceSecondsPerMileThisWeek : userInfo.moreThanFifteenMilesAveragePaceSecondsPerKilometreThisWeek, 3)}</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>{displayStatisticsValue(userInfo.moreThanFifteenMilesAveragePaceAllTimeGlobalTop, 2)}</Text></View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    rowHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    rowText: {
        fontFamily: 'SFProMedium',
        fontSize: 10,
        color: global.COLOR.PRIMARY100,
    },
    cell: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontFamily: 'SFProMedium',
        fontSize: 10,
        color: global.COLOR.PRIMARY70,
        textAlign: 'center',
    },
    secondHeaderText: {
        fontFamily: 'SFProMedium',
        fontSize: 14,
        color: global.COLOR.PRIMARY100,
    },
    cellText: {
        fontFamily: 'FuturaT',
        fontSize: 20,
        color: global.COLOR.PRIMARY100,
        textAlign: 'center',
    },
    unitText: {
        fontFamily: 'SFProRegular',
        fontStyle: 'italic',
        fontSize: 10,
        color: global.COLOR.PRIMARY70,
    },
});

export default ProfileStatistics;