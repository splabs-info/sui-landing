import { normalizeSuiAddress } from '@mysten/sui.js';
import { useQuery } from '@tanstack/react-query';
import { useRpcClient } from 'apis/RpcClientContext';

const defaultOptions = {
    showType: true,
    showContent: true,
    showOwner: true,
    showPreviousTransaction: true,
    showStorageRebate: true,
    showDisplay: true,
};

export function useGetObject(objectId) {
    const rpc = useRpcClient();
    const normalizedObjId = objectId && normalizeSuiAddress(objectId);

    return useQuery({
        queryKey: ['object', normalizedObjId],
        queryFn: () =>
            rpc.getObject({
                id: normalizedObjId,
                options: defaultOptions,
            }),
        enabled: !!normalizedObjId,
    });
}
