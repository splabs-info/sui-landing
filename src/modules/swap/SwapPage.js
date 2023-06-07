import { Container, Paper } from '@mui/material';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import React from 'react';
import { sdk } from './init';

export default function SwapPage() {
  const isDesktop = useResponsive('up', 'sm');

  React.useEffect(() => {
    (async () => {
      try {
        const tokenMap = await sdk.Token.getTokenListByCoinTypes([
          '0x6864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS',
        ]);

        console.log(sdk, tokenMap);
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
