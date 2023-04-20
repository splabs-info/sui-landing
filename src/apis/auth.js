import axiosClient from './axiosClient';

export const authApis = {
    login(data) {
        const url = '/api/v1/login';
        return axiosClient.post(url, data);
    },
    getAccountById(id) {
        return axiosClient.get(`api/v1/account/${id}`);
    },
    sendOtp(data) {
        const url = '/email/send-register-otp';
        return axiosClient.post(url, data);
    },
    uploadAvatar(data) {
        return axiosClient.put('/api/v1/account/avatar/1', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};
