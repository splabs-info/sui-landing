import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApis } from 'apis/auth';
import { toast } from 'react-toastify';
import { useQueryWithCache } from './common';

const authenticationKeys = {
    all: () => ['auth-services'],
    user: () => [...authenticationKeys.all(), 'user'],
    account: (id) => [authenticationKeys.all(), 'account', id],
};

export const useLogin = (configs) => {
    const queryClient = useQueryClient();
    return useMutation((payload) => authApis.login(payload), {
        ...configs,
        onSuccess: (...args) => {
            queryClient.invalidateQueries([...authenticationKeys.all()]);
            configs?.onSuccess?.(...args);
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || err.message);
        },
    });
};

export const useSendOtp = (configs) => {
    const queryClient = useQueryClient();
    return useMutation((payload) => authApis.sendOtp(payload), {
        ...configs,
        onSuccess: (...args) => {
            queryClient.invalidateQueries([...authenticationKeys.all()]);
            configs?.onSuccess?.(...args);
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || err.message);
        },
    });
};

export const useUploadAvatar = (configs) => {
    const queryClient = useQueryClient();
    return useMutation((payload) => authApis.uploadAvatar(payload), {
        ...configs,
        onSuccess: (...args) => {
            queryClient.invalidateQueries([...authenticationKeys.user()]);
            console.log('args', args);
            console.log('configs', configs);
            configs?.onSuccess?.(...args);
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || err.message);
        },
    });
};

export const useGetAccount = (id) => {
    const { data, ...others } = useQueryWithCache(authenticationKeys.account(id), () => authApis.getAccountById(id));

    return {
        account: data || {},
        ...others,
    };
};
