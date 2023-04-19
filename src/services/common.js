import { QueryCache, useQuery } from '@tanstack/react-query';

const queryCache = new QueryCache({
    onError: (error) => {
        console.error(error);
    },
});

export const useQueryWithCache = (queryKey, queryFn) => {
    const queryConfig = {
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 60,
        queryCache,
    };
    return useQuery(queryKey, queryFn, queryConfig);
};
