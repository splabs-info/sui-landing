import { Box, Container, Paper } from '@mui/material';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import React from 'react';
import { cetusSDK } from './config';

export default function SwapPage() {
  const isDesktop = useResponsive('up', 'sm');

  console.log(cetusSDK.senderAddress);

  React.useEffect(() => {
    (async () => {
      try {
        const tokenConfig = cetusSDK.sdkOptions.token.config;

        const tokenMap = await cetusSDK.Token.getTokenListByCoinTypes([
          '0x6864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS',
        ]);
        console.log('tokenMap: ', tokenMap);

        // // Fetch  all tokens
        // const tokenList = await sdk.Config.getAllRegisteredTokenList();

        // // Fetch  all tokens for specify ownerAddress
        // const tokenList = await sdk.Config.getOwnerTokenList(tokenConfig.coin_list_owner);

        // // Fetch  all pools
        // const poolList = await sdk.Config.getAllRegisteredPoolList();

        // // Fetch  all pools for specify ownerAddress
        // const poolList = await sdk.Config.getOwnerPoolList(tokenConfig.pool_list_owner);

        // //Fetch  all pools (contains the token metadata)
        // const poolList = await sdk.Config.getWarpPoolList();

        // Fetch  all pools for specify ownerAddress (contains the token metadata)
        const { pool_list_owner, coin_list_owner } = tokenConfig;
        const poolList = await cetusSDK.Config.getOwnerPoolList(pool_list_owner, coin_list_owner);

        console.log(poolList);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Page title="Swap">
      <SectionBox
        sx={{
          backgroundImage: "url('/images/background/homebg6.png')",
          paddingTop: !isDesktop && 5,
        }}
      >
        <Container maxWidth={'xl'}>
          <Paper>qokdqwop</Paper>
        </Container>
      </SectionBox>
    </Page>
  );
}
