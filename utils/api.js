import Axios from 'axios';

Axios.defaults.baseURL = 'http://ec2-54-221-154-186.compute-1.amazonaws.com/api/';


export async function sendVerifyCode(phoneNumber) {

    const result = await Axios.get('/Users/SendVerificationCodeToMobile', {
        params: {
            mobileNumber: phoneNumber,
        },
    }).then(
        async function(response) {
            if(response.status == 200)
                return true;
            else
                return false;
        }
    ).catch(err => {
        console.log(err);
        return false;
    });

    return result;
}

export async function verifyCode(phoneNumber, codeNumber) {

    const result = await Axios.post('/Users/VerifyCode', {
        mobileNumber: phoneNumber,
        verificationCode: codeNumber,
    }).then(
        async function(response) {
            return response.data;
        }
    ).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}

export async function saveUser(userInfo, accessToken) {

    const result = await Axios.put('/Users/SaveUser', {
        userId: userInfo.userId,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
    }, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(
        async function(response) {
            return response.data.success;
        }
    ).catch(err => {
        console.log(err);
        return false;
    });

    return result;
}

export async function getUserDetails(userId, accessToken) {

    const result = await Axios.get('/Users/GetUserDetails' + userId, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(
        async function(response) {
            if(response.status == 200) {
                const userInfo = {
                    userId: response.data.id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    phoneNumber: response.data.phoneNumber,
                    avatar: response.data.profileImageUrl,
                    location: response.data.runningLocation,
                    gender: response.data.gender,
                    ageGroup: response.data.ageGroup,
                };
                return userInfo;
            } else {
                return null;
            }
        }
    ).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}

export async function getAllRunRooms(pageId, pageSize, accessToken, filterOption) {

    const result = Axios.get('/RunRooms/GetAllRunRooms', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        params: {
            PageNumber: pageId,
            PageSize: pageSize,
            Invited: filterOption.invited,
            Participating: filterOption.participating,
            Organized: filterOption.organized,
            StartingFrom: filterOption.dateValue,
            RunDistanceFrom: filterOption.startValue,
            RunDistanceTo: filterOption.endValue,
            Unit: filterOption.unit,
        }
    }).then(
        async function(response) {
            return response.data.data;
        }
    ).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}

export async function joinRun(joinInfo, accessToken) {

    const result = Axios.post('/RunRooms/JoinARace', {
        runnerId: joinInfo.runnerId,
        runRoomId: joinInfo.runRoomId,
    }, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(
        async function(response) {
            if(response.data.success) {
                return true;
            } else {
                return false;
            }
        }
    ).catch(err => {
        console.log(err);
        return false;
    });

    return result;
}

export async function disjoinRun(disjoinInfo, accessToken) {

    const result = Axios.put('/RunRooms/OptOutFromARace', {
        runnerId: disjoinInfo.runnerId,
        runRoomId: disjoinInfo.runRoomId,
    }, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(
        async function(response) {
            if(response.data.success) {
                return true;
            } else {
                return false;
            }
        }
    ).catch(err => {
        console.log(err);
        return false;
    });

    return result;
}

export async function createRoom(roomInfo, accessToken) {

    const result = Axios.post('/RunRooms/CreateARoom', {
        roomType: roomInfo.roomType,
        runDateTime: roomInfo.runDateTime,
        runDistance: roomInfo.runDistance,
        unit: roomInfo.unit,
        organizerId: roomInfo.organizerId,
        stockImageID: Math.floor(Math.random() * 19),
        invitedConnections: roomInfo.inviteList,
    }, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(
        async function(response) {
            if(response.status == 200 && response.data.id != null) {
                return true;
            } else {
                return false;
            }
        }
    ).catch(err => {
        console.log(err);
        return false;
    });

    return result;
}

export async function getFollowings(pageId, pageSize, accessToken) {

    const result = Axios.get('/Connections/GetFollowings', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        params: {
            PageNumber: pageId,
            PageSize: pageSize,
        }
    }).then(
        async function(response) {
            return response.data.data;
        }
    ).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}

export async function getFollowers(pageId, pageSize, accessToken) {

    const result = Axios.get('/Connections/GetFollowers', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        params: {
            PageNumber: pageId,
            PageSize: pageSize,
        }
    }).then(
        async function(response) {
            return response.data.data;
        }
    ).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}

export async function getAllConnections(pageId, pageSize, accessToken) {

    const result = Axios.get('/Connections/GetAllConnections', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        params: {
            PageNumber: pageId,
            PageSize: pageSize,
        }
    }).then(
        async function(response) {
            return response.data.data;
        }
    ).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}

export async function getAllUsers(pageId, pageSize, accessToken) {

    const result = Axios.get('/Connections/GetAllUsersWithConnectionStatus', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        params: {
            PageNumber: pageId,
            PageSize: pageSize,
        }
    }).then(
        async function(response) {
            return response.data.data;
        }
    ).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}