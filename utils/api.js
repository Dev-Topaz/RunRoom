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