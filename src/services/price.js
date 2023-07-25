import { useQuery } from '@tanstack/react-query';
import { authApis } from 'apis/auth';

const priceKeys = {
    all: () => ['price'],
    price: () => [...priceKeys.all(), 'price'],
};

export const useGetPrice = () => {
    const { data, ...other } = useQuery(priceKeys.price(), () => authApis.getPrice())

    return {
        price: data
    }
}