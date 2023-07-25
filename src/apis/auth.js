import axiosClient from './axiosClient';
import axiosPrice from './client'

export const authApis = {
    login(data) {
        return axiosClient.post('/api/v1/login', data);
    },
    logout() {
        return axiosClient.get('/api/v1/logout');
    },
    getProfileById(id) {
        return axiosClient.get(`api/v1/account/profile/${id}`);
    },
    getAccountById(id) {
        return axiosClient.get(`api/v1/account/${id}`);
    },
    updateEmailById(payload) {
        return axiosClient.put(`api/v1/account/email/${payload?.id}`, { email: payload?.email });
    },
    updateInfo(payload) {
        return axiosClient.put(`api/v1/account/profile/${payload?.id}`, {
            Gender: payload?.Gender,
            Nationality: payload?.Nationality,
            Dob: payload?.Dob,
        });
    },
    sendOtp(data) {
        const url = '/email/send-register-otp';
        return axiosClient.post(url, data);
    },
    uploadAvatar(data) {
        return axiosClient.put(`/api/v1/account/avatar/${data.id}`, data.form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    getPrice() {
        return axiosPrice.get()
    }
};
