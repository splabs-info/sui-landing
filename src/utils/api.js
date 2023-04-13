import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppConfig } from '../setting';
import { logout } from './auth';
import { getAccessToken } from './auth';
import { API } from 'setting/environment';

export const defaultHeaders = {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',

    Accept: 'application/json',
};

export function get(endpoint, successCallback, errorCallback) {
    myFetch('GET', endpoint, undefined, successCallback, errorCallback);
}

export function post(endpoint, body, successCallback, errorCallback) {
    myFetch('POST', endpoint, body, successCallback, errorCallback);
}

export function put(endpoint, body, successCallback, errorCallback) {
    myFetch('PUT', endpoint, body, successCallback, errorCallback);
}

export function _delete(endpoint, body, successCallback, errorCallback) {
    myFetch('DELETE', endpoint, body, successCallback, errorCallback);
}

export async function postWithFormData(endpoint, body, successCallback, errorCallback) {
    let url = API + endpoint;

    let headers = {
        Authorization: 'bearer ' + getAccessToken(),
        'Content-Type': 'multipart/form-data',
        accept: 'application/json',
    };

    const config = { headers, mode: 'no-cors' };

    let response = null;

    try {
        response = await axios.post(url, body, config);
        _handleSuccess(response, successCallback);
    } catch (error) {
        _handleError(error, errorCallback);
    }
}

export const alertError = (error) => {
    alert(error.code + (error.msg ? ': ' + error.msg : ''));
};

async function myFetch(method, endpoint, body, successCallback, errorCallback) {
    let url = API + endpoint;
    // axios.defaults.withCredentials = true

    body = JSON.stringify(body);

    let headers = defaultHeaders;
    headers['Authorization'] = '' + getAccessToken();

    const config = { headers };

    let response = null;

    try {
        switch (method) {
            case 'POST':
                response = await axios.post(url, body, config);
                break;
            case 'PUT':
                response = await axios.put(url, body, config);
                break;
            case 'DELETE':
                response = await axios.delete(url, body, config);
                break;
            default:
                response = await axios.get(url, config);
                break;
        }
        _handleSuccess(response, successCallback);
    } catch (error) {
        _handleError(error, errorCallback);
    }
}

const _handleSuccess = (
    response,
    successCallback = () => {
        return true;
    }
) => {
    const { data } = response;
    successCallback(data);
};

const _handleError = (
    error,
    errorCallback = () => {
        return false;
    }
) => {
    console.log(error);
    const { code, message, response } = error;
    if (code === 'ERR_BAD_REQUEST' || code === 'ERR_BAD_RESPONSE') {
        errorCallback(response.data);
    } else if (code === 'ERR_NETWORK') {
        errorCallback();
        logout();
    } else {
        console.log(error)
        errorCallback();
        toast.error(() => (
            <Box>
                <Typography variant="body2" fontWeight={500}>
                    {message}
                </Typography>
                <Typography variant="caption">{code}</Typography>
            </Box>
        ));
    }
};
