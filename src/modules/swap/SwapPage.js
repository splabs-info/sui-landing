import { LoadingButton } from '@mui/lab';
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import React from 'react';
import { toast } from 'react-toastify';
import { SwapHelper, sdk } from './init';

export default function SwapPage() {
  const isDesktop = useResponsive('up', 'sm');
  const [tokenList, setTokenList] = React.useState([]);
  const [sendToken, setSendToken] = React.useState(null);
  const [receiveToken, setReceiveToken] = React.useState('');
  const wallet = useWallet();
  const [poolList, setPoolList] = React.useState([]);
  const [balances, setBalances] = React.useState([]);

  console.log(sendToken);

  React.useEffect(() => {
    (async () => {
      try {
        if (SwapHelper.provider && wallet.address) {
          sdk.senderAddress = wallet.address;
          const tokenConfig = sdk.sdkOptions.token.config;
          const tokenList = await sdk.Token.getAllRegisteredTokenList();
          const { pool_list_owner, coin_list_owner } = tokenConfig;
          const poolList = await sdk.Token.getOwnerPoolList(pool_list_owner, coin_list_owner);
          const tempPoolList = [];
          for (const iterator of poolList) {
            if (!iterator.is_closed) {
              const pool = await sdk.Pool.getPool(iterator.address);
              console.log(pool);
              tempPoolList.push(pool);
            }
          }
          setPoolList(tempPoolList);
          setTokenList(tokenList);
          const balances = await SwapHelper.provider.getAllCoins({ owner: wallet.address });
          // console.log(balances);
          setBalances(balances.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [wallet.address]);

  const handleSwap = async () => {
    try {
      const a2b = false;
      const coinAmount = new SwapHelper.BN('12000000');
      const by_amount_in = true;
      const pool = await sdk.Pool.getPool('0xe63cedb411544f435221df201157db8666c910b7c7dd58c385cbc6a7a26f218b');

      const swapPayload = await sdk.Swap.createSwapTransactionPayload({
        pool_id: pool.poolAddress,
        coinTypeA: pool.coinTypeA,
        coinTypeB: pool.coinTypeB,
        a2b,
        by_amount_in,
        amount: coinAmount.toString(),
        amount_limit: '0',
      });

      console.log(swapPayload);
      const transferTxn = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: swapPayload,
      });
      console.log('swap: ', transferTxn);
      if (transferTxn) {
        toast.success('Success');
      } else {
        toast.error('Fail');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (tokenList.length === 0)
    return (
      <Backdrop sx={{ zIndex: 99999 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  return (
    <Page title="Swap">
      <SectionBox
        sx={{
          backgroundImage: "url('/images/background/homebg6.png')",
          paddingTop: !isDesktop && 5,
        }}
      >
        <Container maxWidth={'md'}>
          <Paper>
            <Box sx={{ p: 2 }} component={'form'}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Send</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="send-token"
                      value={sendToken?.address}
                      onChange={(e) => setSendToken(e.target.dataValue)}
                    >
                      {tokenList.map((token) => (
                        <MenuItem value={token.address} dataValue={token} key={token.address}>
                          {token.symbol}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField sx={{ mt: 2 }} label="Send amount" fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Receive</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="receive-token"
                      value={receiveToken}
                      onChange={(e) => setReceiveToken(e.target.value)}
                    >
                      {tokenList.map((token) => (
                        <MenuItem value={token.address} key={token.address}>
                          {token.symbol}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>{' '}
                  <TextField sx={{ mt: 2 }} label="Receive amount" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton variant="contained" onClick={handleSwap}>
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>
          </Paper>
          <Paper sx={{ mt: 2 }}>
            <Box p={2}>
              <Typography>Send: {sendToken?.address}</Typography>
              <Typography>Receive: {receiveToken}</Typography>
            </Box>
          </Paper>
          <Paper sx={{ mt: 2 }}>
            {poolList.map((pool) => (
              <Box pt={2} px={2}>
                <Typography>Name: {pool.name}</Typography>
                <Typography>Pool: {pool.poolAddress}</Typography>
                <Typography>From: {pool.coinTypeA}</Typography>
                <Typography>To: {pool.coinTypeB}</Typography>
                <Typography>Ratio: {pool.current_sqrt_price}</Typography>
                <Box mt={2} />
                <Divider />
              </Box>
            ))}
          </Paper>
          <Paper sx={{ mt: 2 }}>
            {balances?.map((balance) => (
              <Box pt={2} px={2}>
                <Typography>Coin: {balance.coinType}</Typography>
                <Typography>Balance: {balance.balance}</Typography>
                <Box mt={2} />
                <Divider />
              </Box>
            ))}
          </Paper>
        </Container>
      </SectionBox>
    </Page>
  );
}
