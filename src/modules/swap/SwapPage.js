import { Percentage, adjustForSlippage, d } from '@cetusprotocol/cetus-sui-clmm-sdk';
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
import { formatUnits } from 'ethers/lib/utils.js';
import useResponsive from 'hooks/useResponsive';
import React from 'react';
import { toast } from 'react-toastify';
import { SwapHelper, sdk } from './init';

export default function SwapPage() {
  const isDesktop = useResponsive('up', 'sm');
  const [tokenList, setTokenList] = React.useState([]);
  const [sendToken, setSendToken] = React.useState(null);
  const [receiveToken, setReceiveToken] = React.useState(null);
  const wallet = useWallet();
  const [poolList, setPoolList] = React.useState([]);
  const [balances, setBalances] = React.useState([]);
  const [a2b, setA2B] = React.useState(true);
  const [selectedPool, setSelectedPool] = React.useState(null);
  const [sendAmount, setSendAmount] = React.useState('0');
  const [flag, setFlag] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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
              tempPoolList.push(pool);
            }
          }
          const tempTokenList = [];
          for (const iterator of tokenList) {
            const balance = {
              ...iterator,
              ...(await SwapHelper.provider.getBalance({ owner: wallet.address, coinType: iterator.address })),
            };
            tempTokenList.push(balance);
          }
          setBalances(tempTokenList);
          setPoolList(tempPoolList);
          setTokenList(tokenList);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [wallet, flag]);

  const handleSwap = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const coinAmount = new SwapHelper.BN(sendAmount).mul(
        new SwapHelper.BN(10).pow(new SwapHelper.BN(sendToken.decimals))
      );
      const byAmountIn = true;
      const pool = selectedPool;
      //       const slippage = Percentage.fromDecimal(d(5));
      //       const res = await sdk.Swap.preswap({
      //         pool: pool,
      //         current_sqrt_price: pool.current_sqrt_price,
      //         coinTypeA: pool.coinTypeA,
      //         coinTypeB: pool.coinTypeB,
      //         decimalsA: 6, // coin a 's decimals
      //         decimalsB: 8, // coin b 's decimals
      //         a2b,
      //         byAmountIn,
      //         coinAmount,
      //       });

      //       const toAmount = byAmountIn ? res.estimatedAmountOut : res.estimatedAmountIn;
      //       const amountLimit = adjustForSlippage(toAmount, slippage, !byAmountIn);

      // console.log(amountLimit);

      const swapPayload = await sdk.Swap.createSwapTransactionPayload({
        pool_id: pool.poolAddress,
        coinTypeA: pool.coinTypeA,
        coinTypeB: pool.coinTypeB,
        a2b,
        byAmountIn,
        amount: coinAmount.toString(),
        amount_limit: '0',
      });

      const transferTxn = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: swapPayload,
      });
      if (transferTxn) {
        toast.success('Success');
      } else {
        toast.error('Fail');
      }
      setFlag(!flag);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(JSON.stringify(error));
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (sendToken && receiveToken) {
      if (sendToken.address !== receiveToken.address) {
        setA2B(true);
        let selectPool = poolList.find(
          (pool) => pool.coinTypeA === sendToken.address && pool.coinTypeB === receiveToken.address
        );
        if (!selectPool) {
          selectPool = poolList.find(
            (pool) => pool.coinTypeB === sendToken.address && pool.coinTypeA === receiveToken.address
          );
          setA2B(false);
        }
        if (selectPool) {
          setSelectedPool(selectPool);
        }
        console.log(selectPool);
      }
    }
  }, [poolList, receiveToken, sendToken]);

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
        <Container maxWidth={'xl'}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper>
                <Box sx={{ p: 2 }} component={'form'} onSubmit={handleSwap}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Send</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="send-token"
                          value={sendToken?.address}
                        >
                          {tokenList.map((token) => (
                            <MenuItem value={token.address} key={token.address} onClick={() => setSendToken(token)}>
                              {token.symbol}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField
                        sx={{ mt: 2 }}
                        label="Send amount"
                        fullWidth
                        value={sendAmount}
                        onChange={(e) => setSendAmount(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Receive</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="receive-token"
                          value={receiveToken?.address}
                        >
                          {tokenList.map((token, index) => (
                            <MenuItem value={token.address} key={index} onClick={() => setReceiveToken(token)}>
                              {token.symbol}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>{' '}
                      <TextField sx={{ mt: 2 }} label="Receive amount" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <LoadingButton variant="contained" type="submit" loading={loading}>
                        Submit
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
              {/* <Paper sx={{ mt: 2 }}>
                <Box p={2}>
                  <Typography variant="body2">Send: {sendToken?.address}</Typography>
                  <Typography variant="body2">Receive: {receiveToken?.address}</Typography>
                </Box>
              </Paper> */}
              <Paper sx={{ mt: 2 }}>
                <Box pt={2} px={2}>
                  <Typography variant="body2">Name: {selectedPool?.name}</Typography>
                  <Typography variant="body2">Pool: {selectedPool?.poolAddress}</Typography>
                  <Typography variant="body2">A: {selectedPool?.coinTypeA}</Typography>
                  <Typography variant="body2">B: {selectedPool?.coinTypeB}</Typography>
                  <Typography variant="body2">{a2b ? 'A => B' : 'B => A'}</Typography>
                  <Typography variant="body2">Ratio: {selectedPool?.current_sqrt_price}</Typography>
                  <Box mt={2} />
                  <Divider />
                </Box>
              </Paper>
              {/* <Paper sx={{ mt: 2 }}>
                {poolList.map((pool, index) => (
                  <Box pt={2} px={2} key={index}>
                    <Typography variant="body2">Name: {pool.name}</Typography>
                    <Typography variant="body2">Pool: {pool.poolAddress}</Typography>
                    <Typography variant="body2">From: {pool.coinTypeA}</Typography>
                    <Typography variant="body2">To: {pool.coinTypeB}</Typography>
                    <Typography variant="body2">Ratio: {pool.current_sqrt_price}</Typography>
                    <Box mt={2} />
                    <Divider />
                  </Box>
                ))}
              </Paper> */}
            </Grid>
            <Grid item xs={6}>
              <Paper>
                {balances?.map((balance, index) => (
                  <Box pt={2} px={2} key={index}>
                    <Typography variant="body2">Coin: {balance.coinType}</Typography>
                    <Typography variant="body2">
                      Balance: {formatUnits(balance.totalBalance, balance.decimals)}
                    </Typography>
                    <Box mt={2} />
                    <Divider />
                  </Box>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </SectionBox>
    </Page>
  );
}
