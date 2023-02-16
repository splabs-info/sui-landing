import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApis } from 'apis/auth';
import { toast } from 'react-toastify';

const startGrowingKeys = {
    all: () => ['startGrowingServices'],
};

export const useLogin = (configs) => {
    const queryClient = useQueryClient();
    return useMutation((payload) => authApis.login(payload), {
        ...configs,
        onSuccess: (...args) => {
            queryClient.invalidateQueries([...startGrowingKeys.all()]);
            configs?.onSuccess?.(...args);
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || err.message);
        },
    });
};
