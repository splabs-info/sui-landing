import { Percentage, TransactionUtil, adjustForSlippage, d } from '@cetusprotocol/cetus-sui-clmm-sdk';
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  InputBase,
  MenuItem,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
import { IconRefresh, IconSettings, IconSwitchVertical } from '@tabler/icons';
import Page from 'components/common/Page';
import { SectionBox, TypographyGradient } from 'components/home/HomeStyles';
import { formatUnits } from 'ethers/lib/utils.js';
import useResponsive from 'hooks/useResponsive';
import {
  AmountBox,
  AmountStack,
  ConnectButton,
  ErrorBox,
  SelectToken,
  SwapBox,
} from 'modules/swap/components/SwapStyles';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomInput from './components/CustomInput';
import { SwapSettings } from './components/SwapSettingsPopup';
import { SwapHelper, getBalance, getDecimals, getPreSwapData, sdk } from './init';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function SwapV3Page() {
  const isMobile = useResponsive('down', 'sm');
  const [tokenList, setTokenList] = React.useState([]);
  const [sendToken, setSendToken] = React.useState(null);
  const [receiveToken, setReceiveToken] = React.useState(null);
  const wallet = useWallet();
  const [poolList, setPoolList] = React.useState([]);
  const [a2b, setA2B] = React.useState(true);
  const [sendAmount, setSendAmount] = React.useState('0');
  const [receiveAmount, setReceiveAmount] = React.useState('0');
  const [flag, setFlag] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [byAmountIn, setByAmountInt] = React.useState(true);
  const [estimating, setEstimating] = React.useState(false);
  const [slippageSetting, setSlippageSetting] = React.useState(true);
  const [openSettings, setOpenSettings] = React.useState(false);
  const [error, setError] = React.useState('');
  const [bestRoute, setBestRoute] = React.useState(null);
  const [tokenListObj, setTokenListObj] = React.useState({});
  const [preSwapData, setPreSwapData] = React.useState(null);
  let query = useQuery();
  const from = query.get('from');
  const to = query.get('to');
  const navigate = useNavigate();
  const [balances, setBalances] = React.useState(null);

  const supportTokens = ['USDT', 'WETH', 'SUI', 'WBNB', 'WBTC'];

  React.useEffect(() => {
    setSendToken(from);
    setReceiveToken(to);
    setPreSwapData(null);
    setBestRoute(null);
    setReceiveAmount('0');
    setBalances(null);
  }, [from, to]);

  React.useEffect(() => {
    if (wallet.address && from && to) {
      (async () => {
        setBalances({
          from: await getBalance(wallet.address, from),
          to: await getBalance(wallet.address, to),
        });
      })();
    }
  }, [from, to, wallet.address]);

  React.useEffect(() => {
    (async () => {
      try {
        const tokenList = await sdk.Token.getAllRegisteredTokenList();
        const poolList = await sdk.Pool.getPools([], 0, 1000);
        // const filterTokenList = tokenList?.filter((c) => supportTokens.includes(c.official_symbol));
        setPoolList(poolList);
        setTokenList(tokenList);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  React.useState(() => {
    if (wallet.address) {
      sdk.senderAddress = wallet.address;
    }
  }, []);

  React.useEffect(() => {
    if (tokenList) {
      (async () => {
        const tokenListObj = {};
        for (const iterator of tokenList) {
          tokenListObj[iterator.address] = iterator;
        }
        setTokenListObj(tokenListObj);
      })();
    }
  }, [tokenList, wallet.address]);

  const handleSwap = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (bestRoute.coinTypeC) {
        if (!bestRoute?.isExceed) {
          const allCoinAsset = await sdk.getOwnerCoinAssets(wallet.address);
          const routerPayload = TransactionUtil.buildRouterSwapTransaction(
            sdk,
            bestRoute?.createTxParams,
            byAmountIn,
            allCoinAsset
          );
          const transferTxn = await wallet.signAndExecuteTransactionBlock({
            transactionBlock: routerPayload,
          });
          if (transferTxn) {
            toast.success('Success');
          } else {
            toast.error('Fail');
          }
        }
      } else {
        const amount = Number(sendAmount).toFixed(sendToken.decimals).replace('.', '');
        const coinAmount = new SwapHelper.BN(parseFloat(amount));
        const pool = bestRoute;
        console.log({
          coinAmount,
          slippageSetting,
          byAmountIn,
          bestRoute,
        });
        const slippage = Percentage.fromDecimal(d(slippageSetting));

        const amountLimit = adjustForSlippage(coinAmount, slippage, !byAmountIn);

        const swapPayload = await sdk.Swap.createSwapTransactionPayload({
          pool_id: pool.poolAddress,
          coinTypeA: pool.coinTypeA,
          coinTypeB: pool.coinTypeB,
          a2b,
          by_amount_in: byAmountIn,
          amount: coinAmount.toString(),
          amount_limit: amountLimit.toString(),
          swap_partner: SwapHelper.config.swapPartner,
        });

        const transferTxn = await wallet.signAndExecuteTransactionBlock({
          transactionBlock: swapPayload,
        });
        if (transferTxn) {
          toast.success('Success');
        } else {
          toast.error('Fail');
        }
      }
      setFlag(!flag);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.toString());
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleReload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendToken, receiveToken, sendAmount, poolList]);

  const handleSwitch = () => {
    navigate(`?from=${receiveToken}&to=${sendToken}`);
    setSendAmount('0');
  };

  const handleReload = async () => {
    document.getElementById('refresh-button').classList.add('rotate');
    try {
      if (poolList.length > 0 && sendToken && receiveToken && sendToken !== receiveToken) {
        let tempA2B = true;
        const byAmountIn = true;
        setEstimating(true);
        const amount = Number(sendAmount).toFixed(getDecimals(sendToken)).replace('.', '');
        const coinAmount = new SwapHelper.BN(parseFloat(amount));

        let swapRouter = poolList.find((pool) => pool.coinTypeA === sendToken && pool.coinTypeB === receiveToken);
        if (!swapRouter) {
          tempA2B = false;
          swapRouter = poolList.find((pool) => pool.coinTypeB === sendToken && pool.coinTypeA === receiveToken);
        }

        if (!swapRouter) {
          tempA2B = true;
          swapRouter = await sdk.Router.price(
            sendToken,
            receiveToken,
            coinAmount,
            tempA2B,
            slippageSetting,
            SwapHelper.config.swapPartner
          );
        }

        if (!swapRouter.coinTypeC) {
          const preSwap = await sdk.Swap.preswap({
            pool: swapRouter,
            current_sqrt_price: swapRouter.current_sqrt_price,
            coinTypeA: swapRouter.coinTypeA,
            coinTypeB: swapRouter.coinTypeB,
            decimalsA: getDecimals(sendToken),
            decimalsB: getDecimals(receiveToken),
            a2b: tempA2B,
            by_amount_in: byAmountIn,
            amount: coinAmount.toString(),
          });
          swapRouter.amountOut = preSwap.estimatedAmountOut;
          swapRouter.amountIn = preSwap.estimatedAmountIn;
          swapRouter.a2b = tempA2B;
        }

        console.log({
          pool: swapRouter,
          current_sqrt_price: swapRouter.current_sqrt_price,
          coinTypeA: swapRouter.coinTypeA,
          coinTypeB: swapRouter.coinTypeB,
          decimalsA: getDecimals(sendToken),
          decimalsB: getDecimals(receiveToken),
          a2b: tempA2B,
          by_amount_in: byAmountIn,
          amount: coinAmount.toString(),
        });

        console.log(swapRouter);

        setBestRoute(swapRouter);
        setEstimating(false);
        setA2B(tempA2B);
        setReceiveAmount(
          formatUnits(
            byAmountIn ? swapRouter.amountOut.toString() : swapRouter.amountIn.toString(),
            getDecimals(receiveToken)
          )
        );

        const preSwapData = await getPreSwapData(swapRouter, slippageSetting, byAmountIn);
        setPreSwapData(preSwapData);
      }
    } catch (error) {
      setEstimating(false);
      console.error(error);
    }
    setTimeout(() => {
      document.getElementById('refresh-button').classList.remove('rotate');
    }, 1000);
  };

  React.useEffect(() => {
    if (!wallet.address) {
      setError('Please connect wallet');
    } else if (!sendToken || !receiveToken) {
      setError('Please select pair to swap');
    } else if (!bestRoute || bestRoute?.is_pause || bestRoute?.isExceed) {
      setError('Route is not found');
    } else if (!sendAmount || sendAmount === '0') {
      setError('Please enter amount');
    } else {
      setError('');
    }
  }, [receiveToken, bestRoute, sendAmount, sendToken, wallet.address]);

  React.useEffect(() => {
    const intervalTime = setInterval(() => {
      handleReload();
    }, 20000);
    return () => {
      clearInterval(intervalTime);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(tokenList);

  return (
    <Page title="Swap">
      <SectionBox
        sx={{
          backgroundImage: "url('/images/background/homebg6.png')",
        }}
      >
        <Container maxWidth={'md'}>
          <SwapBox>
            <Box component={'form'} onSubmit={handleSwap}>
              <TypographyGradient variant="h2">Swap</TypographyGradient>
              {/* <PriceTypography>
                <b>1 {sendToken?.official_symbol}</b> ($0.25) = <b>0.35 {receiveToken?.official_symbol}</b> ($17.15)
              </PriceTypography> */}
              <Stack
                direction="row"
                justifyContent={'flex-end'}
                alignItems={'center'}
                sx={{
                  '& svg': {
                    color: '#fff',
                  },
                }}
              >
                {/* <IconButton>
                  <IconChartLine />
                </IconButton> */}
                <Typography color={'#fff'} ml={1}>
                  {slippageSetting === true ? 'Auto' : `${slippageSetting}%`}
                </Typography>
                <IconButton onClick={() => setOpenSettings(true)}>
                  <IconSettings />
                </IconButton>
                <Tooltip title="Auto refresh in 20 seconds, you can click to update manually.">
                  <IconButton onClick={handleReload} id="refresh-button">
                    <IconRefresh />
                  </IconButton>
                </Tooltip>
              </Stack>
              <AmountBox>
                <Stack direction="row" justifyContent={'space-between'} alignItems={'center'}>
                  <CustomInput
                    variant="standard"
                    handleDone={(e) => setSendAmount(e)}
                    sx={{
                      color: 'white',
                      fontSize: isMobile ? 16 : 40,
                    }}
                    disabled={!sendToken || estimating}
                    defaultValue={sendAmount}
                  />
                  {tokenList.length > 0 ? (
                    <SelectToken value={sendToken}>
                      {tokenList.map((token) => {
                        const check = supportTokens.includes(token.official_symbol);
                        return (
                          check && (
                            <MenuItem
                              value={token.address}
                              key={token.address}
                              onClick={() => {
                                navigate(`?from=${token.address}&to=${to}`);
                                setSendAmount('0');
                                setReceiveAmount('0');
                              }}
                            >
                              <img
                                src={token.logo_url}
                                alt={token.symbol}
                                width={isMobile ? 24 : 32}
                                style={{ marginRight: '8px' }}
                              />
                              {token.symbol}
                            </MenuItem>
                          )
                        );
                      })}
                    </SelectToken>
                  ) : (
                    <Skeleton
                      variant="rounded"
                      width={120}
                      height={56}
                      sx={{
                        background:
                          'linear-gradient(178.73deg, rgba(104, 230, 184, 0.25) -10%, rgba(109, 133, 218, 0.25) 100%)',
                      }}
                    />
                  )}
                </Stack>
                <Stack direction="row" justifyContent={'space-between'} alignItems={'center'} mt={2}>
                  <Typography color={'white'}></Typography>
                  <AmountStack>
                    <img src="/images/icon/icon-wallet-green.png" alt="" />
                    <Typography>
                      {balances?.from ? formatUnits(balances?.from?.totalBalance, getDecimals(sendToken)) : '--'}
                    </Typography>
                  </AmountStack>
                </Stack>
              </AmountBox>

              <Stack alignItems={'center'} sx={{ '& svg': { color: '#14E3BE' } }}>
                <IconButton onClick={handleSwitch}>
                  <IconSwitchVertical size={'36px'} />
                </IconButton>
              </Stack>

              <AmountBox>
                <Stack direction="row" justifyContent={'space-between'} alignItems={'center'}>
                  <InputBase
                    variant="standard"
                    value={receiveAmount}
                    sx={{
                      color: 'white',
                      fontSize: isMobile ? 16 : 40,
                    }}
                  />
                  {tokenList.length > 0 ? (
                    <SelectToken value={receiveToken}>
                      {tokenList.map((token) => {
                        const check = supportTokens.includes(token.official_symbol);

                        return (
                          check && (
                            <MenuItem
                              value={token.address}
                              key={token.address}
                              onClick={() => {
                                navigate(`?from=${from}&to=${token.address}`);
                                setSendAmount('0');
                                setReceiveAmount('0');
                              }}
                            >
                              <img
                                src={token.logo_url}
                                alt={token.symbol}
                                width={isMobile ? 24 : 32}
                                style={{ marginRight: '8px' }}
                              />
                              {token.symbol}
                            </MenuItem>
                          )
                        );
                      })}
                    </SelectToken>
                  ) : (
                    <Skeleton
                      variant="rounded"
                      width={120}
                      height={56}
                      sx={{
                        background:
                          'linear-gradient(178.73deg, rgba(104, 230, 184, 0.25) -10%, rgba(109, 133, 218, 0.25) 100%)',
                      }}
                    />
                  )}
                </Stack>
                <Stack direction="row" justifyContent={'space-between'} alignItems={'center'} mt={2}>
                  <Typography color={'white'}></Typography>
                  <AmountStack>
                    <img src="/images/icon/icon-wallet-green.png" alt="" />
                    <Typography>
                      {balances?.to ? formatUnits(balances?.to?.totalBalance, getDecimals(receiveToken)) : '--'}
                    </Typography>
                  </AmountStack>
                </Stack>
              </AmountBox>
              {error && (
                <ErrorBox my={1}>
                  <Typography textAlign={'left'}>{error}</Typography>
                </ErrorBox>
              )}

              <ConnectButton loading={loading} type="submit" disabled={Boolean(error) || estimating}>
                Swap
              </ConnectButton>
              {estimating ? (
                <Stack direction="row" justifyContent={'center'} alignItems={'center'} mt={4}>
                  <CircularProgress color="primary" />
                </Stack>
              ) : (
                <Stack direction="row" justifyContent={'space-between'} alignItems={'center'} mt={4}>
                  <Box>
                    <Typography variant="body2" fontWeight={600} color={'white'}>
                      Price impact
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color={'white'}>
                      Min. received
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color={'white'}>
                      Network fee
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color={'white'}>
                      Route
                    </Typography>
                  </Box>
                  <Box textAlign={'right'}>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color={
                        preSwapData?.impactPrice && preSwapData?.impactPrice > -1
                          ? preSwapData.impactPrice < 1
                            ? 'green'
                            : preSwapData?.impactPrice < 10
                            ? 'yellow'
                            : 'red'
                          : 'white'
                      }
                      data-id="price-impact"
                    >
                      {preSwapData
                        ? `${preSwapData?.impactPrice > -1 ? `${preSwapData.impactPrice}%` : 'Estimating'}`
                        : '--'}
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color={'white'} data-id="min-received">
                      {preSwapData
                        ? `${formatUnits(preSwapData?.minimumReceived, getDecimals(receiveToken))}
                      ${tokenListObj?.[receiveToken].official_symbol}`
                        : '--'}
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color={'white'} data-id="network-fee">
                      {preSwapData
                        ? `${
                            preSwapData?.totalFee > -1
                              ? `${preSwapData.totalFee} ${tokenListObj?.[sendToken].official_symbol}`
                              : 'Estimating'
                          }`
                        : '--'}
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color={'white'}>
                      {bestRoute ? (
                        a2b ? (
                          <>
                            {tokenListObj?.[bestRoute?.coinTypeA]?.official_symbol}
                            {bestRoute?.coinTypeB ? ` > ${tokenListObj?.[bestRoute?.coinTypeB]?.official_symbol}` : ''}
                            {bestRoute?.coinTypeC ? ` > ${tokenListObj?.[bestRoute?.coinTypeC]?.official_symbol}` : ''}
                          </>
                        ) : (
                          <>
                            {bestRoute?.coinTypeC ? `${tokenListObj?.[bestRoute?.coinTypeC]?.official_symbol} > ` : ''}
                            {bestRoute?.coinTypeB ? `${tokenListObj?.[bestRoute?.coinTypeB]?.official_symbol} > ` : ''}
                            {bestRoute?.coinTypeA ? `${tokenListObj?.[bestRoute?.coinTypeA]?.official_symbol}` : ''}
                          </>
                        )
                      ) : (
                        '--'
                      )}
                    </Typography>
                    {/* <Typography variant="caption" color={'white'}>{`${sendToken} > ${receiveToken}`}</Typography> */}
                  </Box>
                </Stack>
              )}
            </Box>
          </SwapBox>
          <SwapSettings
            open={openSettings}
            handleClose={() => setOpenSettings(false)}
            handleChangeSlippage={(e) => setSlippageSetting(e)}
          />
        </Container>
      </SectionBox>
    </Page>
  );
}
