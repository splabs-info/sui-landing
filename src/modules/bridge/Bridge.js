import { Container } from '@mui/material';
import WormholeBridge from '@wormhole-foundation/wormhole-connect';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home-v2/HomeStyles';

const config = {
  env: 'mainnet',
  networks: ['ethereum', 'polygon', 'solana'],
  tokens: ['ETH', 'WETH', 'MATIC', 'WMATIC'],
  rpc: {
    ethereum: 'https://rpc.ankr.com/eth',
    solana: 'https://rpc.ankr.com/solana',
  },
};

export default function Bridge() {
  return (
    <Page title="Swap">
      <SectionBox
        sx={{
          backgroundImage: "url('/images/background/homebg6.png')",
        }}
      >
        <Container maxWidth={'md'}>
          <WormholeBridge config={config} />
        </Container>
      </SectionBox>
    </Page>
  );
}
