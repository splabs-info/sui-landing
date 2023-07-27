import { normalizeSuiAddress } from '@mysten/sui.js';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRpcClient } from 'apis/RpcClientContext';

const MAX_PAGE_SIZE = 10;

export function useGetDynamicFields(parentId, maxPageSize = MAX_PAGE_SIZE) {
    const rpc = useRpcClient();
    return useInfiniteQuery(
        ['dynamic-fields', parentId],
        ({ pageParam = null }) =>
            rpc.getDynamicFields({
                parentId: normalizeSuiAddress(parentId),
                cursor: pageParam,
                limit: maxPageSize,
            }),
        {
            enabled: !!parentId,
            getNextPageParam: ({ nextCursor, hasNextPage }) => (hasNextPage ? nextCursor : null),
        }
    );
}
