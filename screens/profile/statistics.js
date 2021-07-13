import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import global from '../../global';

import { useSelector } from 'react-redux';
import { getUserStatistics } from '../../utils/api';

const ProfileStatistics = (props) => {

    const userId = useSelector(state => state.user.userId);
    const accessToken = useSelector(state => state.user.accessToken);
    const unit = useSelector(state => state.setting.unit);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        
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
                    <View style={styles.cell}><Text style={styles.cellText}>76</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>4</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>1</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>4.3%</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.rowHeader}>
                        <Text style={styles.rowText}>{'Distance' + '\n' + 'Covered'}</Text>
                        <Text style={styles.unitText}>{unit == 1 ? 'miles' : 'kilometers'}</Text>
                    </View>
                    <View style={styles.cell}><Text style={styles.cellText}>324.5</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>42.3</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>12.6</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>8.3%</Text></View>
                </View>
                <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: 'rgba(173, 174, 181, 0.5)' }]}>
                    <View style={styles.rowHeader}>
                        <Text style={styles.rowText}>Running Time</Text>
                        <Text style={styles.unitText}>hours</Text>
                    </View>
                    <View style={styles.cell}><Text style={styles.cellText}>12.5</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>2.5</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>1.5</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>12.3%</Text></View>
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
                    <View style={styles.cell}><Text style={styles.cellText}>7:23</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>6:24</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>5:15</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>5.3%</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.rowHeader}>
                        <Text style={styles.rowText}>{'5 to 10 ' + (unit == 1 ? 'mile' : 'km')}</Text>
                        <Text style={styles.unitText}>Runs</Text>
                    </View>
                    <View style={styles.cell}><Text style={styles.cellText}>7:23</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>16:24</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>5:15</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>12.3%</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.rowHeader}>
                        <Text style={styles.rowText}>{'10 to 15 ' + (unit == 1 ? 'mile' : 'km')}</Text>
                        <Text style={styles.unitText}>Runs</Text>
                    </View>
                    <View style={styles.cell}><Text style={styles.cellText}>7:23</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>—</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>—</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>24.3%</Text></View>
                </View>
                <View style={styles.row}>
                <View style={styles.rowHeader}>
                        <Text style={styles.rowText}>{'> 15 ' + (unit == 1 ? 'mile' : 'km')}</Text>
                        <Text style={styles.unitText}>Runs</Text>
                    </View>
                    <View style={styles.cell}><Text style={styles.cellText}>—</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>—</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>—</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>—</Text></View>
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