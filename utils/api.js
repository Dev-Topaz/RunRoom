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