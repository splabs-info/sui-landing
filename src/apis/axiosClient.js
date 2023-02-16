import axios from 'axios';
import { getAccessToken } from '../utils/auth';

const axiosSSO = axios.create({
    baseURL: 'https://sea-lion-app-wqzel.ondigitalocean.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosSSO.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosSSO.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export default axiosSSO;
