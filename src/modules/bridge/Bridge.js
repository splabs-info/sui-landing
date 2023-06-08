import { Box, Container, styled } from '@mui/material';
import WormholeBridge from '@wormhole-foundation/wormhole-connect';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home-v2/HomeStyles';
import './index.css'

const config = {
  env: 'mainnet',
  networks: ['ethereum', 'polygon', 'solana', 'bsc'],
  tokens: ['ETH', 'WETH', 'MATIC', 'WMATIC', 'WBNB', 'BNB'],
  rpc: {
    ethereum: 'https://rpc.ankr.com/eth',
    solana: 'https://rpc.ankr.com/solana',
    bsc: 'https://bsc-testnet.publicnode.com',
  },
};

export const BridgeBox = styled(Box)(({ theme }) => ({
  marginBottom: 64,
  marginTop: 24,
  padding: '32px',
  background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.07) -10%, rgba(109, 133, 218, 0.07) 100%)',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '15px',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    background: 'linear-gradient(0deg, rgba(0, 197, 211, 0.1) 0%, rgba(66, 238, 207, 0.1) 100%)',
    borderRadius: '15px',
    inset: '0px',
    padding: '1px',
    WebkitMask:
      'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
    WebkitMaskComposite: 'xor',
    zIndex: 0,
  },
  [theme.breakpoints.down('sm')]: {
    padding: '8px',
  },
}));

export default function Bridge() {
  return (
    <Page title="Swap">
      <SectionBox
        sx={{
          backgroundImage: "url('/images/background/homebg6.png')",
        }}
      >
        <Container maxWidth={'md'} className='bridge'>
          <BridgeBox>
            <WormholeBridge config={config} />
          </BridgeBox>
        </Container>
      </SectionBox>
    </Page>
  );
}
