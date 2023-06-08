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
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
import Page from 'components/common/Page';
import { SectionBox, TypographyGradient } from 'components/home-v2/HomeStyles';
import { formatUnits } from 'ethers/lib/utils.js';
import useResponsive from 'hooks/useResponsive';
import React from 'react';
import { toast } from 'react-toastify';
import { SwapHelper, sdk } from './init';
import { AmountBox, AmountStack, ConnectButton, PriceTypography, SelectToken, SwapBox, SwapButton } from 'modules/swap-ui/SwapStyles';
import { IconArrowDown, IconChartLine, IconChevronDown, IconSettings, IconWallet } from '@tabler/icons';
import { set } from 'lodash';
import { formatAmount } from 'setting/format';
import { formatPrice } from 'setting/format';
import { formatUSD } from 'setting/format';
import { SwapSettings } from 'modules/swap-ui/SwapSettingsPopup';

export default function SwapPage() {
  const isMobile = useResponsive('down', 'sm');
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
  const [openSettings, setOpenSettings] = React.useState(false);

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
      <Page title="Swap">
        <SectionBox
          sx={{
            backgroundImage: "url('/images/background/homebg6.png')",
          }}
        >
          <Backdrop sx={{ zIndex: 99999 }} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </SectionBox>
      </Page>
    );
  return (
    <Page title="Swap">
      <SectionBox
        sx={{
          backgroundImage: "url('/images/background/homebg6.png')",
        }}
      >
        <Container maxWidth={'md'}>
          <SwapBox>
            <TypographyGradient variant="h2">
              Swap
            </TypographyGradient>
            <PriceTypography>
              <b>1 XUI</b> ($0.25) =  <b>0.35 SUI</b> ($17.15)
            </PriceTypography>
            <Stack direction="row" justifyContent={'space-between'}>
              <SwapButton loading={loading} onClick={handleSwap}>Swap</SwapButton>
              <Stack direction="row" justifyContent={'flex-end'} alignItems={'center'}
                sx={{
                  '& svg': {
                    color: '#fff',
                  }
                }}
              >
                <IconButton>
                  <IconChartLine />
                </IconButton>
                <IconButton onClick={() => setOpenSettings(true)}>
                  <IconSettings />
                </IconButton>
              </Stack>
            </Stack>
            <AmountBox>
              <Stack direction="row" justifyContent={'space-between'} alignItems={'center'}>
                <InputBase
                  variant='standard'
                  value={formatUSD(sendAmount)}
                  onChange={(e) => setSendAmount(e.target.value)}
                  sx={{
                    color: 'white',
                    fontSize: isMobile ? 16 : 40,
                  }}
                />
                <SelectToken value={sendToken?.address}>
                  {tokenList.map((token) => (
                    <MenuItem
                      value={token.address}
                      key={token.address}
                      onClick={() => setSendToken(token)}
                    >
                      <img src={`https://archive.cetus.zone/assets/image/sui/${(token.symbol).toLowerCase()}.png`}
                        alt={token.symbol}
                        width={isMobile ? 24 : 32} style={{ marginRight: '8px' }}
                      />
                      {token.symbol}
                    </MenuItem>
                  ))}
                </SelectToken>
              </Stack>
              <Stack direction="row" justifyContent={'space-between'} alignItems={'center'} mt={2}>
                <Typography color={'white'}>$ 0.00</Typography>
                <AmountStack>
                  <img src='/images/icon/icon-wallet-green.png' alt='' />
                  <Typography>$ 0.00</Typography>
                </AmountStack>
              </Stack>
            </AmountBox>

            <Stack alignItems={'center'} sx={{ '& svg': { color: '#14E3BE' } }}>
              <IconChevronDown size={'36px'} />
            </Stack>

            <AmountBox>
              <Stack direction="row" justifyContent={'space-between'} alignItems={'center'}>
                <InputBase
                  variant='standard'
                  value={formatAmount(0.0)}
                  sx={{
                    color: 'white',
                    fontSize: isMobile ? 16 : 40,
                  }}
                />
                <SelectToken value={receiveToken?.address}>
                  {tokenList.map((token) => (
                    <MenuItem
                      value={token.address}
                      key={token.address}
                      onClick={() => setReceiveToken(token)}
                    >
                      <img src={`https://archive.cetus.zone/assets/image/sui/${(token.symbol).toLowerCase()}.png`}
                        alt={token.symbol}
                        width={isMobile ? 24 : 32} style={{ marginRight: '8px' }}
                      />
                      {token.symbol}
                    </MenuItem>
                  ))}
                </SelectToken>
              </Stack>
              <Stack direction="row" justifyContent={'space-between'} alignItems={'center'} mt={2}>
                <Typography color={'white'}>$ 0.00</Typography>
                <AmountStack>
                  <img src='/images/icon/icon-wallet-green.png' alt='' />
                  <Typography>$ 0.00</Typography>
                </AmountStack>
              </Stack>
            </AmountBox>

            <ConnectButton>Connect Wallet</ConnectButton>
            <Stack direction="row" justifyContent={'space-between'} alignItems={'center'} mt={4}>
              <Box>
                <Typography variant='body2' fontWeight={600} color={'white'}>Price impact</Typography>
                <Typography variant='body2' fontWeight={600} color={'white'}>Est. received</Typography>
                <Typography variant='body2' fontWeight={600} color={'white'}>Min. received</Typography>
                <Typography variant='body2' fontWeight={600} color={'white'}>Network fee</Typography>
              </Box>
              <Box textAlign={'right'}>
                <Typography variant='body2' fontWeight={600} color={'white'} data-id="price-impact">
                  --
                </Typography>
                <Typography variant='body2' fontWeight={600} color={'white'} data-id="est-received">
                  --
                </Typography>
                <Typography variant='body2' fontWeight={600} color={'white'} data-id="min-received">
                  --
                </Typography>
                <Typography variant='body2' fontWeight={600} color={'white'} data-id="network-fee">
                  --
                </Typography>
              </Box>
            </Stack>
          </SwapBox>
          <SwapSettings open={openSettings}
            handleClose={() => setOpenSettings(false)} />
          {/* <Grid container spacing={2}>
            <Grid item xs={12}>
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
                              <img src={`https://archive.cetus.zone/assets/image/sui/${(token.symbol).toLowerCase()}.png`}
                                alt={token.symbol}
                                width={50}
                              /> {token.symbol}
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
              <Paper sx={{ mt: 2 }}>
                <Box p={2}>
                  <Typography variant="body2">Send: {sendToken?.address}</Typography>
                  <Typography variant="body2">Receive: {receiveToken?.address}</Typography>
                </Box>
              </Paper>
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
              <Paper sx={{ mt: 2 }}>
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
              </Paper>
            </Grid>
            <Grid item xs={12}>
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
          </Grid> */}
        </Container>
      </SectionBox>
    </Page >
  );
}
