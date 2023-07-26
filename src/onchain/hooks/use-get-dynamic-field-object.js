import { useRpcClient } from 'apis/RpcClientContext';
import { useQuery } from '@tanstack/react-query';

export function useGetDynamicFieldObject(parentId, name) {
    const rpc = useRpcClient();
    return useQuery({
        queryKey: ['dynamic-fields-object', parentId, name],
        queryFn: () =>
            rpc.getDynamicFieldObject({
                parentId,
                name,
            }),
        enabled: !!parentId && !!name,
    });
}
