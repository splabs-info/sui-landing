import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApis } from 'apis/auth';
import { toast } from 'react-toastify';
import { useQueryWithCache } from './common';

const authenticationKeys = {
    all: () => ['auth-services'],
    user: () => [...authenticationKeys.all(), 'user'],
    account: (id) => [authenticationKeys.all(), 'account', id],
    profile: (id) => [authenticationKeys.all(), 'profile', id],
    logout: () => [...authenticationKeys.all(), 'logout'],
};

export const useLogin = (configs) => {
    const queryClient = useQueryClient();
    return useMutation((payload) => authApis.login(payload), {
        onSuccess: (...args) => {
            queryClient.invalidateQueries([...authenticationKeys.user()]);
            configs?.onSuccess?.(...args);
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || err.message);
        },
    });
};
export const useLogout = () => {
    const { data, ...others } = useQueryWithCache(authenticationKeys.logout(), () => authApis.logout(), {});
    return {
        logout: data || {},
        ...others,
    };
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

export const useUpdateEmailById = (configs) => {
    const queryClient = useQueryClient();
    return useMutation((payload) => authApis.updateEmailById(payload), {
        ...configs,
        onSuccess: (...args) => {
            queryClient.invalidateQueries([...authenticationKeys.user()]);
            configs?.onSuccess?.(...args);
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || err.message);
        },
    });
};

export const useUpdateInfo = (configs) => {
    const queryClient = useQueryClient();
    return useMutation((payload) => authApis.updateInfo(payload), {
        ...configs,
        onSuccess: (...args) => {
            queryClient.invalidateQueries([...authenticationKeys.user()]);
            configs?.onSuccess?.(...args);
            toast.success('Update successfully');
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

            configs?.onSuccess?.(...args);
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || err.message);
        },
    });
};

export const useGetProfile = (id) => {
    const { data, ...others } = useQueryWithCache(authenticationKeys.profile(id), () => {
        if (id) {
            return authApis.getProfileById(id);
        }
        return Promise.resolve(null);
    });
    return {
        profile: data || {},
        ...others,
    };
};

export const useGetAccount = (id) => {
    const { data, ...others } = useQueryWithCache(authenticationKeys.account(id), () => authApis.getAccountById(id));

    return {
        account: data || {},
        ...others,
    };
};

