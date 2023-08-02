import { normalizeSuiAddress } from '@mysten/sui.js';
import { useQuery } from '@tanstack/react-query';

const defaultOptions = {
    showType: false,
    showContent: true,
    showOwner: false,
    showPreviousTransaction: false,
    showStorageRebate: true,
    showDisplay: true,
};

export function useGetObject(provider, objectId) {

    const normalizedObjId = objectId && normalizeSuiAddress(objectId);

    return useQuery({
        queryKey: ['object', normalizedObjId],
        queryFn: () =>
            provider.getObject({
                id: normalizedObjId,
                options: defaultOptions,
            }),
        enabled: !!normalizedObjId,
    });
}
