import { authApis } from 'apis/auth';
import React from 'react';

const priceKeys = {
  all: () => ['price'],
  price: () => [...priceKeys.all(), 'price'],
};

export const useGetPrice = () => {
  //   const { data, ...other } = useQuery(priceKeys.price(), () => authApis.getPrice());
  const [data, setData] = React.useState(0);

  const syncData = async () => {
    const data = await authApis.getPrice();
    setData(data);
  };

  React.useEffect(() => {
    syncData();
    const interval = setInterval(() => {
      syncData();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return {
    price: data,
  };
};
