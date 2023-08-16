import { Coin, Connection, JsonRpcProvider } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { ethers } from 'ethers';
import { isEmpty, toNumber } from 'lodash';
import { LAUNCHPAD_STORAGE, XUI_TYPE } from 'onchain/constants';
import React, { createContext } from 'react';
const config = {
    providerConnection: new Connection({
        fullnode: `https://sui-mainnet-rpc.allthatnode.com/K9s5Id0QlQ6pqry2pr53sU1C4QeknzNp`,
        // fullnode: 'https://sui.getblock.io:443/a8e9b1ba-578b-470a-b901-79f928669fa0/mainnet',
        // fullnode: 'https://sui-testnet-rpc.allthatnode.com:443/cd2f7736h5krjpsednzd5qjigxgkl803',
    }),
};

const provider = new JsonRpcProvider(config?.providerConnection);

export const SuiContext = createContext({
  assets: [],
  balances: null,
  coinObjectsId: null,
  provider: new JsonRpcProvider(config.providerConnection),
  projects: [],
});

export const SUIWalletContext = ({ children }) => {
  const wallet = useWallet();
  const [assets, setAssets] = React.useState([]);
  const [allAssets, setAllAssets] = React.useState([]);
  const [balances, setBalance] = React.useState(0);
  const [projects, setProjects] = React.useState([]);
  const [coinObjectsId, setCoinObjectsId] = React.useState();

  // Format rounds data
  const formatRound = React.useCallback(async (round) => {
    try {
      const formattedPaymentsPromise = Promise.all(
        round?.data.content?.fields.payments?.fields?.contents.map(formatPayment)
      );

      const formattedPayments = await formattedPaymentsPromise;
      const formattedTotalSold = ethers.utils.formatUnits(
        round?.data?.content?.fields?.total_sold,
        round?.data?.content?.fields?.token_decimal
      );
      const formattedTotalSupply = ethers.utils.formatUnits(
        round?.data?.content?.fields?.total_supply,
        round?.data?.content?.fields?.token_decimal
      );
      const tokenInfo = await provider.getCoinMetadata({
        coinType: `0x${round?.data?.content?.fields?.token_type}`,
      });
      const roundState = {
        ...round?.data?.content?.fields,
        total_sold: formattedTotalSold || '',
        total_supply: formattedTotalSupply || '',
        token: tokenInfo,
        payments: formattedPayments || [],
      };
      return roundState;
    } catch (error) {
      console.error('error format round function', error);
    }
  }, []);

  // Format projects data
  const formatProject = React.useCallback(
    async (project) => {
      // More detailed error handling for each field
      if (project?.data?.content?.fields?.id?.id) {
        return provider
          .getDynamicFields({
            parentId: project?.data?.content?.fields?.id?.id,
          })
          .then(async (roundsResponse) => {
            const roundPromises = roundsResponse?.data.map((r) =>
              r?.name
                ? provider.getDynamicFieldObject({
                    parentId: project?.data?.content?.fields?.id?.id,
                    name: r?.name,
                  })
                : Promise.resolve(null)
            );
            const roundResults = await Promise.allSettled(roundPromises);

            const rounds = roundResults.filter((result) => result.status === 'fulfilled').map((result) => result.value);

            if (!isEmpty(rounds)) {
              const roundInfo = Promise.all(rounds.map(formatRound));

              const all_rounds = await roundInfo;
              return {
                ...project?.data?.content?.fields?.info?.fields,
                id: project?.data?.content?.fields?.id?.id,
                all_rounds,
              };
            } else {
              return {
                ...project?.data?.content?.fields?.info?.fields,
                id: project?.data?.content?.fields?.id?.id,
              };
            }
          })
          .catch((error) => {
            console.error(
              `Failed to fetch dynamic fields for project ${project?.data?.content?.fields?.id?.id}:`,
              error
            );
            return project;
          });
      } else {
        console.error('Invalid project id:', project?.data?.content?.fields?.id?.id);
        return Promise.resolve(project);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const fetchData = React.useCallback(async () => {
    try {
      const [launchpadStorageDynamic] = await Promise.all([
        provider.getDynamicFields({ parentId: LAUNCHPAD_STORAGE }),
        provider.getObject({ id: LAUNCHPAD_STORAGE, options: { showContent: true } }),
      ]);

      const allProjects = launchpadStorageDynamic?.data || [];

      if (!isEmpty(allProjects)) {
        const projectPromises = allProjects.map((p) =>
          p?.name
            ? provider.getDynamicFieldObject({
                parentId: LAUNCHPAD_STORAGE,
                name: p?.name,
              })
            : Promise.resolve(null)
        );

        const projectResults = await Promise.allSettled(projectPromises);
        const projects = projectResults.map((result) => result.value);

        if (!isEmpty(projects)) {
          const formattedProjects = projects.map(formatProject);

          const formattedProjectResults = await Promise.allSettled(formattedProjects);
          const validProjects = formattedProjectResults
            .filter((result) => result.status === 'fulfilled')
            .map((result) => result.value);
          setProjects(validProjects);
        }
      }
    } catch (error) {
      console.error('An error occurred while fetching data');
    }
  }, [formatProject]);

  // Format payments data
  const formatPayment = async (p) => {
    const paymentType = await provider.getCoinMetadata({
      coinType: `0x${p.fields.value.fields.method_type}`,
    });

    return {
      ...paymentType,
      method_type: p.fields.value.fields.method_type,
      ratio_per_token: p.fields.value.fields.ratio_per_token,
    };
  };

  const fetAllBalanceAsset = async (address) => {
    let flag = true;
    let nextCursor = null;
    let arr_data = [];
    while (flag) {
      const aaa = await provider.getAllCoins({
        owner: address,
        cursor: nextCursor,
      });
      if (!aaa.hasNextPage) {
        flag = false;
      }
      nextCursor = aaa.nextCursor;
      arr_data = [...arr_data, ...aaa.data];
    }
    return arr_data;
  };

  const fetchBalance = React.useCallback(async () => {
    if (provider) {
      try {
        const filter = {
          MatchAll: [
            {
              StructType: `0x2::coin::Coin<0x2::sui::SUI>`,
            },
            {
              AddressOwner: wallet.address,
            },
          ],
        };

        const objects = await provider.getOwnedObjects({
          owner: wallet.address || '',
          filter: filter,
          options: { showContent: true },
        });

        const coinObjectsId = objects.data.filter((obj) => Coin.isSUI(obj));

        const [suiBalance, allBalances, allCoins] = await Promise.all([
          provider.getBalance({
            owner: wallet?.address || '',
          }),
          provider.getAllBalances({
            owner: wallet.address || '',
          }),
          fetAllBalanceAsset(wallet.address),
          // provider.getAllCoins({
          //   owner: wallet.address || '',
          // }),
        ]);

        const assetsPromises = allBalances.map(async (balance) => {
          const { coinType } = balance;

          try {
            const metadata = await provider.getCoinMetadata({ coinType });

            const coin = allCoins?.filter((coin) => coin.coinType === coinType);

            const balanceObj = allBalances.find((balance) => balance.coinType === coinType);

            return {
              id: metadata?.id,
              coin: coin,
              decimals: metadata?.decimals,
              description: metadata?.description,
              iconUrl: metadata?.iconUrl,
              name: metadata?.name,
              symbol: metadata?.symbol,
              coinType: coinType,
              balance: balanceObj ? parseInt(balanceObj.totalBalance) : 0,
            };
          } catch (error) {
            console.error('Failed to fetch coin metadata:', error);
          }
        });
        const assets = await Promise.all(assetsPromises);

        const validAssets = assets.filter((asset) => asset.coinType === XUI_TYPE);

        setAssets(validAssets);
        let formattedBalance = toNumber(ethers.utils.formatUnits(suiBalance?.totalBalance, 9));

        // Handle gas
        formattedBalance = formattedBalance > 0.2 ? formattedBalance - 0.2 : formattedBalance;

        // const formattedBalance = toNumber(ethers.utils.formatUnits(suiBalance?.totalBalance, 9)) - 0.2
        if (assets) {
          setAllAssets(assets);
        }
        setBalance(formattedBalance);
        setCoinObjectsId(coinObjectsId);
      } catch (error) {
        console.error('error SUI provider', error);
      }
    }
  }, [wallet.address]);

  // React.useEffect(() => {
  //   if (!provider) return;
  //   fetchData();
  //   setInterval(() => {
  //     console.log('fetchData');
  //     fetchData();
  //   }, 20000);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  React.useEffect(() => {
    if (provider && wallet?.address && wallet?.connected) {
      fetchBalance();
    }
  }, [fetchBalance, wallet?.address, wallet?.connected]);

  return (
    <SuiContext.Provider
      value={{
        assets,
        allAssets,
        balances,
        coinObjectsId,
        provider,
        projects,
        fetchData,
        fetchBalance,
      }}
    >
      {children}
    </SuiContext.Provider>
  );
};
