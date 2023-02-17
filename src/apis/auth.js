import axiosClient from './axiosClient';

export const authApis = {
    login(data) {
        const url = '/auth/login';
        return axiosClient.post(url, data);
    },
    sendOtp(data) {
        const url = '/email/send-register-otp';
        return axiosClient.post(url, data);
    },
};
