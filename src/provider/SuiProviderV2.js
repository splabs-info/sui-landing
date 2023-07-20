import { Coin, Connection, JsonRpcProvider } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { ethers } from 'ethers';
import { isEmpty, toNumber } from 'lodash';
import { LAUNCHPAD_STORAGE } from 'onchain/constants';
import React, { createContext } from 'react';
const config = {
  providerConnection: new Connection({
    fullnode: `https://sui-mainnet-rpc.allthatnode.com/K9s5Id0QlQ6pqry2pr53sU1C4QeknzNp`,
    // fullnode: 'https://fullnode.testnet.sui.io:443'
  }),
};

const provider = new JsonRpcProvider(config.providerConnection);

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
      const [launchpadStorageDynamic, launchpadStorage] = await Promise.all([
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        const [suiBalance, allBalances] = await Promise.all([
          provider.getBalance({
            owner: wallet?.address || '',
          }),
          provider.getAllBalances({
            owner: wallet.address || '',
          }),
        ]);

        const assetsPromises = allBalances.map(async (balance) => {
          const { coinType } = balance;
          try {
            const metadata = await provider.getCoinMetadata({ coinType });
            const balanceObj = allBalances.find((balance) => balance.coinType === coinType);

            return {
              id: metadata?.id,
              decimals: metadata?.decimals,
              description: metadata?.description,
              iconUrl: metadata?.iconUrl,
              name: metadata?.name,
              symbol: metadata?.symbol,
              balance: balanceObj ? parseInt(balanceObj.totalBalance) : 0,
            };
          } catch (error) {
            console.error('Failed to fetch coin metadata:', error);
          }
        });
        const assets = await Promise.all(assetsPromises);

        setAssets(assets);
        const formattedBalance = toNumber(ethers.utils.formatUnits(suiBalance?.totalBalance, 9)) - 0.2;

        setBalance(formattedBalance);
        setCoinObjectsId(coinObjectsId);
      } catch (error) {
        console.error('error SUI provider', error);
      }
    }
  }, [wallet.address]);

  React.useEffect(() => {
    if (!provider) return;
    fetchData();
  }, [fetchData]);

  React.useEffect(() => {
    if (provider && wallet?.address && wallet?.connected) {
      fetchBalance();
      const interval = setInterval(() => {
        console.time('Time:');
        fetchData();
        console.timeEnd('Time:');
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [fetchBalance, wallet?.address, wallet?.connected]);

  return (
    <SuiContext.Provider
      value={{
        assets,
        balances,
        coinObjectsId,
        provider,
        projects,
      }}
    >
      {children}
    </SuiContext.Provider>
  );
};
