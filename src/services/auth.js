import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApis } from 'apis/auth';
import { toast } from 'react-toastify';

const authenticationKeys = {
    all: () => ['auth-services'],
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
