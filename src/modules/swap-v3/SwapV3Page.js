import { Percentage, TransactionUtil, adjustForSlippage, d } from '@cetusprotocol/cetus-sui-clmm-sdk';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { PythHttpClient, getPythClusterApiUrl, getPythProgramKeyForCluster } from '@pythnetwork/client';
import { Connection } from '@solana/web3.js';
import { useWallet } from '@suiet/wallet-kit';
import { IconRefresh, IconSettings, IconSwitchVertical } from '@tabler/icons';
import Page from 'components/common/Page';
import { SectionBox, TypographyGradient } from 'components/home/HomeStyles';
import { formatUnits } from 'ethers/lib/utils.js';
import useResponsive from 'hooks/useResponsive';
import { SwapSettings } from 'modules/swap/components/SwapSettingsPopup';
import { AmountBox, AmountStack, ConnectButton, SelectToken, SwapBox } from 'modules/swap-v3/components/SwapStyles';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomInput from './components/CustomInput';
import Statistic from './components/Statistic';
import { SwapHelper, cetusLoad, getBalance, getDecimals, getPool, getPreSwapData, getToken, sdk } from './init';

const PYTHNET_CLUSTER_NAME = 'pythnet';
const connection = new Connection(getPythClusterApiUrl(PYTHNET_CLUSTER_NAME));
const pythPublicKey = getPythProgramKeyForCluster(PYTHNET_CLUSTER_NAME);

const supportTokens = ['USDT', 'WETH', 'SUI', 'USDC', 'WBNB', 'WBTC'];

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
  const [baseBalance, setBaseBalance] = React.useState(0);
  const [quoteBalance, setQuoteBalance] = React.useState(0);
  const [loadingPage, setLoadingPage] = React.useState(true);
  const [pythPrices, setPythPrice] = React.useState(null);
  let query = useQuery();
  const from = query.get('from');
  const to = query.get('to');
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      const pythPrices = new Map();
      const pythClient = new PythHttpClient(connection, pythPublicKey);
      const data = await pythClient.getData();
      for (const symbol of data.symbols) {
        if (symbol.includes('Crypto')) {
          const price = data.productPrice.get(symbol);
          if (price.price && price.confidence) {
            // console.log(`${symbol}: $${price.price} \xB1$${price.confidence}`);
            pythPrices.set(symbol.replace('Crypto.', '').replace('/USD', ''), price.price);
          } else {
            // console.log(`${symbol}: price currently unavailable. status is ${[price.status]}`);
          }
        }
      }
      setPythPrice(pythPrices);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      await cetusLoad();
      setLoadingPage(false);
    })();
  }, []);

  React.useEffect(() => {
    setSendToken(from);
    setReceiveToken(to);
    setPreSwapData(null);
    setBestRoute(null);
    setReceiveAmount('0');
    setBaseBalance(0);
    setQuoteBalance(0);
  }, [from, to]);

  React.useEffect(() => {
    if (wallet.address) {
      sdk.senderAddress = wallet.address;
    }
  }, [wallet.address]);

  React.useEffect(() => {
    if (wallet.address && from) {
      (async () => {
        const balance = await getBalance(wallet.address, from);
        setBaseBalance(balance ? balance.totalBalance : 0);
      })();
    }
  }, [from, wallet.address, flag]);

  React.useEffect(() => {
    if (wallet.address && to) {
      (async () => {
        const balance = await getBalance(wallet.address, to);
        setQuoteBalance(balance ? balance.totalBalance : 0);
      })();
    }
  }, [to, wallet.address, flag]);

  React.useEffect(() => {
    (async () => {
      try {
        const tokenList = await sdk.Token.getAllRegisteredTokenList();
        const tokenListObj = {};
        for (const iterator of tokenList) {
          tokenListObj[iterator.address] = iterator;
        }
        setTokenListObj(tokenListObj);
        setTokenList(tokenList);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleSwap = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (bestRoute.coinTypeC) {
        if (!bestRoute?.isExceed) {
          const allCoinAsset = await sdk.getOwnerCoinAssets(sdk.senderAddress);
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

        const slippage = Percentage.fromDecimal(d(slippageSetting));

        const amountLimit = adjustForSlippage(coinAmount, slippage, !byAmountIn);

        const swapPayload = await sdk.Swap.createSwapTransactionPayload({
          pool_id: pool.poolAddress,
          coinTypeA: pool.coinTypeA,
          coinTypeB: pool.coinTypeB,
          a2b: pool.coinTypeA === sendToken,
          by_amount_in: true,
          amount: pool.amountIn,
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
      toast.error(error.toString());
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleReload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendToken, receiveToken, sendAmount]);

  const handleSwitch = () => {
    navigate(`?from=${receiveToken}&to=${sendToken}`);
    setSendAmount('0');
  };

  const handleReload = async () => {
    if (document.getElementById('refresh-button')) document.getElementById('refresh-button').classList.add('rotate');
    try {
      if (receiveToken && sendToken) {
        const currentPool = await getPool(sendToken, receiveToken);
        const swapPool = currentPool ? await sdk.Pool.getPool([...currentPool.addressMap][0][1]) : null;

        setEstimating(true);
        const amount = Number(sendAmount).toFixed(tokenListObj[sendToken].decimals).replace('.', '');
        const coinAmount = new SwapHelper.BN(parseFloat(amount));

        let swapRouter = await (async () => {
          try {
            return await sdk.Router.price(
              sendToken,
              receiveToken,
              coinAmount,
              true,
              slippageSetting,
              SwapHelper.config.swapPartner
            );
          } catch (error) {
            return false;
          }
        })();

        if (!swapRouter) {
          swapRouter = swapPool;
        }

        if (swapRouter) {
          if (!swapRouter.coinTypeC) {
            const preSwap = await sdk.Swap.preswap({
              pool: swapRouter,
              current_sqrt_price: swapRouter.current_sqrt_price,
              coinTypeA: swapPool.coinTypeA,
              coinTypeB: swapPool.coinTypeB,
              decimalsA: getToken(swapPool.coinTypeA).decimals,
              decimalsB: getToken(swapPool.coinTypeB).decimals,
              a2b: swapPool.coinTypeA === sendToken ? true : false,
              by_amount_in: true,
              amount: coinAmount.toString(),
            });
            swapRouter.amountOut = preSwap.estimatedAmountOut;
            swapRouter.amountIn = preSwap.estimatedAmountIn;
            swapRouter.a2b = swapPool.coinTypeA === sendToken ? true : false;
          }

          setA2B(swapRouter.coinTypeA === sendToken ? true : false);
          setReceiveAmount(formatUnits(swapRouter.amountOut.toString(), tokenListObj[receiveToken].decimals));

          const preSwapData = await getPreSwapData(swapRouter, slippageSetting, true);
          setPreSwapData(preSwapData);
        }

        setBestRoute(swapRouter.amountIn === '0' ? null : swapRouter);
        setEstimating(false);
        setFlag(!flag);
      }
    } catch (error) {
      setEstimating(false);
      console.error(error);
    }
    setTimeout(() => {
      if (document.getElementById('refresh-button'))
        document.getElementById('refresh-button').classList.remove('rotate');
    }, 1000);
  };

  React.useEffect(() => {
    if (!wallet.address) {
      setError('Please connect wallet');
    } else if (!sendToken || !receiveToken) {
      setError('Please select pair to swap');
    } else if (!bestRoute || bestRoute?.is_pause || bestRoute?.isExceed) {
      setError('No Available Route');
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
      console.log('clear');
      clearInterval(intervalTime);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bestRoute]);

  // console.log(pythPrices);

  const getPythPrice = (address, amount) => {
    if (address && amount && amount !== '0') {
      const symbol = tokenListObj?.[address]?.official_symbol;
      if (symbol) {
        let price = pythPrices.get(symbol);
        if (!price) price = pythPrices.get(symbol.replace('W', ''));
        return `$ ${SwapHelper.formatBigNumber((amount * price).toString())}`;
      }
    }
    return null;
  };

  return (
    <Page title="Swap">
      <SectionBox
        sx={{
          backgroundImage: "url('/images/background/homebg6.png')",
        }}
      >
        <Container maxWidth={'xl'}>
          <Box
            sx={{
              marginBottom: '64px',
              marginTop: '24px',
            }}
          >
            <Grid container spacing={2} alignItems={'stretch'}>
              <Grid item md={7} xs={12}>
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
                        <Typography color={'Background'} variant="body2" fontWeight={600}>
                          {getPythPrice(sendToken, sendAmount)}
                        </Typography>
                        <AmountStack>
                          <img src="/images/icon/icon-wallet-green.png" alt="" />
                          <Typography>
                            {!loadingPage && sendToken ? formatUnits(baseBalance, getDecimals(sendToken)) : '--'}
                          </Typography>
                          <ConnectButton
                            sx={{ height: 20, mt: 0, p: 0, borderRadius: 0.5, ml: 1, width: 50, minWidth: 'unset' }}
                            onClick={() => setSendAmount(formatUnits(baseBalance, getDecimals(sendToken)))}
                            disabled={!baseBalance || baseBalance === '0' || loadingPage}
                          >
                            <small>Max</small>
                          </ConnectButton>
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
                                check &&
                                token.address !== sendToken && (
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
                        <Typography color={'Background'} variant="body2" fontWeight={600}>
                          {getPythPrice(receiveToken, receiveAmount)}
                        </Typography>
                        <AmountStack>
                          <img src="/images/icon/icon-wallet-green.png" alt="" />
                          <Typography>
                            {!loadingPage && receiveToken ? formatUnits(quoteBalance, getDecimals(receiveToken)) : '--'}
                          </Typography>
                        </AmountStack>
                      </Stack>
                    </AmountBox>

                    <ConnectButton loading={loading} type="submit" disabled={Boolean(error) || estimating}>
                      {error ? error : `Swap`}
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
                      ${tokenListObj?.[receiveToken]?.official_symbol}`
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
                                  {bestRoute?.coinTypeB
                                    ? ` > ${tokenListObj?.[bestRoute?.coinTypeB]?.official_symbol}`
                                    : ''}
                                  {bestRoute?.coinTypeC
                                    ? ` > ${tokenListObj?.[bestRoute?.coinTypeC]?.official_symbol}`
                                    : ''}
                                </>
                              ) : (
                                <>
                                  {bestRoute?.coinTypeC
                                    ? `${tokenListObj?.[bestRoute?.coinTypeC]?.official_symbol} > `
                                    : ''}
                                  {bestRoute?.coinTypeB
                                    ? `${tokenListObj?.[bestRoute?.coinTypeB]?.official_symbol} > `
                                    : ''}
                                  {bestRoute?.coinTypeA
                                    ? `${tokenListObj?.[bestRoute?.coinTypeA]?.official_symbol}`
                                    : ''}
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
              </Grid>
              <Grid item md={5} xs={12}>
                <SwapBox height={'100%'}>
                  <Stack direction={'row'} alignItems={'center'}>
                    <TypographyGradient variant="h2" mr={1}>
                      Ref.
                    </TypographyGradient>
                    <img src="/images/pyth/pyth_logo_lockup_white.png" height={42} width={'auto'} alt="" />
                  </Stack>
                  <Box mt={'56px'} />
                  <Statistic />
                </SwapBox>
              </Grid>
            </Grid>
          </Box>

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
