import { TransactionUtil } from '@cetusprotocol/cetus-sui-clmm-sdk';
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
import { SwapSettings } from 'modules/cetus-swap/v3/components/SwapSettingsPopup';
import {
  AmountBox,
  AmountStack,
  ConnectButton,
  SelectToken,
  SwapBox,
} from 'modules/cetus-swap/v3/components/SwapStyles';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomInput from './components/CustomInput';
import Statistic from './components/Statistic';
import { SwapHelper, cetusLoad, getBalance, sdk } from './init';

const PYTHNET_CLUSTER_NAME = 'pythnet';
const connection = new Connection(getPythClusterApiUrl(PYTHNET_CLUSTER_NAME));
const pythPublicKey = getPythProgramKeyForCluster(PYTHNET_CLUSTER_NAME);

const supportTokens = ['USDT', 'WETH', 'SUI', 'USDC', 'WBNB', 'WBTC'];

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function SwapPage() {
  const isMobile = useResponsive('down', 'sm');
  const [tokenList, setTokenList] = React.useState([]);
  const [sendToken, setSendToken] = React.useState(null);
  const [receiveToken, setReceiveToken] = React.useState(null);
  const wallet = useWallet();
  const [sendAmount, setSendAmount] = React.useState('0');
  const [receiveAmount, setReceiveAmount] = React.useState('0');
  const [flag, setFlag] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [estimating, setEstimating] = React.useState(true);
  const [slippageSetting, setSlippageSetting] = React.useState(true);
  const [openSettings, setOpenSettings] = React.useState(false);
  const [error, setError] = React.useState('');
  const [bestRoute, setBestRoute] = React.useState(null);
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
            pythPrices.set(symbol.replace('Crypto.', '').replace('/USD', ''), price.price);
          } else {
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
      setEstimating(false);
    })();
  }, []);

  React.useEffect(() => {
    setSendToken(from);
    setReceiveToken(to);
    setPreSwapData(null);
    setBestRoute(null);
    setReceiveAmount('0');
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
    if (!loadingPage) {
      const tokenList = [];
      SwapHelper.CetusHelper.tokenMap.forEach((value, key) => {
        if (supportTokens.includes(value.symbol) && value.logo_url && !value.name.includes('Celer'))
          tokenList.push(value);
      });
      setTokenList(tokenList);
    }
  }, [loadingPage]);

  const handleSwap = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const allCoinAsset = await sdk.getOwnerCoinAssets(sdk.senderAddress);
      console.log({
        sdk,
        bestRoute,
        allCoinAsset,
        swapPartner: SwapHelper.config.swapPartner,
        slippageSetting,
      });
      const routerPayload = await TransactionUtil.buildAggregatorSwapTransaction(
        sdk,
        bestRoute,
        allCoinAsset,
        SwapHelper.config.swapPartner,
        slippageSetting
      );
      const transferTxn = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: routerPayload,
      });
      if (transferTxn) {
        toast.success('Success');
      } else {
        toast.error('Fail');
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
    if (!loadingPage) {
      handleReload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendToken, receiveToken, sendAmount, loadingPage]);

  const handleSwitch = () => {
    navigate(`?from=${receiveToken}&to=${sendToken}`);
    setSendAmount('0');
  };

  const handleReload = async () => {
    if (document.getElementById('refresh-button')) document.getElementById('refresh-button').classList.add('rotate');
    try {
      if (receiveToken && sendToken) {
        setEstimating(true);
        const amount = Number(sendAmount).toFixed(SwapHelper.CetusHelper.getDecimals(sendToken)).replace('.', '');
        const coinAmount = new SwapHelper.BN(parseFloat(amount));

        const routerV2 = (
          await sdk.RouterV2.getBestRouter(
            sendToken,
            receiveToken,
            coinAmount,
            true,
            slippageSetting,
            SwapHelper.config.swapPartner,
            undefined,
            true,
            false
          )
        ).result;

        if (!routerV2?.isExceed) {
          setBestRoute(routerV2);
          const fee = parseFloat(sdk.Swap.calculateSwapFee(routerV2.splitPaths)).toFixed(8);
          const priceImpact = parseFloat(sdk.Swap.calculateSwapPriceImpact(routerV2.splitPaths)).toFixed(2);
          const minimumReceived = await SwapHelper.CetusHelper.getMinimumReceived(
            routerV2.outputAmount,
            slippageSetting
          );
          setPreSwapData({ fee, priceImpact, minimumReceived });
          setReceiveAmount(
            formatUnits(routerV2.outputAmount.toString(), SwapHelper.CetusHelper.getDecimals(receiveToken))
          );
        } else {
          bestRoute(null);
          setReceiveAmount(0);
          setPreSwapData(null);
        }

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
    if (!loadingPage && !estimating) {
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
    } else {
      setError('');
    }
  }, [receiveToken, bestRoute, sendAmount, sendToken, wallet.address, loadingPage, estimating]);

  React.useEffect(() => {
    if (bestRoute) {
      const intervalTime = setInterval(() => {
        handleReload();
      }, 20000);
      return () => {
        clearInterval(intervalTime);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bestRoute]);

  const getPythPrice = (address, amount) => {
    if (address && amount && amount !== '0') {
      const symbol = SwapHelper.CetusHelper.tokenMap?.[address]?.official_symbol;
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
                            {tokenList.map((token) => (
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
                            ))}
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
                            {!loadingPage && sendToken
                              ? formatUnits(baseBalance, SwapHelper.CetusHelper.getDecimals(sendToken))
                              : '--'}
                          </Typography>
                          <ConnectButton
                            sx={{ height: 20, mt: 0, p: 0, borderRadius: 0.5, ml: 1, width: 50, minWidth: 'unset' }}
                            onClick={() =>
                              setSendAmount(formatUnits(baseBalance, SwapHelper.CetusHelper.getDecimals(sendToken)))
                            }
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
                            {tokenList.map(
                              (token) =>
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
                            )}
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
                            {!loadingPage && receiveToken
                              ? formatUnits(quoteBalance, SwapHelper.CetusHelper.getDecimals(receiveToken))
                              : '--'}
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
                              preSwapData && parseFloat(sendAmount)
                                ? preSwapData.priceImpact < 1
                                  ? 'green'
                                  : preSwapData?.priceImpact < 10
                                  ? 'yellow'
                                  : 'red'
                                : 'white'
                            }
                            data-id="price-impact"
                          >
                            {preSwapData && parseFloat(sendAmount) ? `${preSwapData.priceImpact}%` : '--'}
                          </Typography>
                          <Typography variant="body2" fontWeight={600} color={'white'} data-id="min-received">
                            {preSwapData
                              ? `${formatUnits(
                                  preSwapData?.minimumReceived,
                                  SwapHelper.CetusHelper.getDecimals(receiveToken)
                                )} ${SwapHelper.CetusHelper.getToken(receiveToken).symbol}`
                              : '--'}
                          </Typography>
                          <Typography variant="body2" fontWeight={600} color={'white'} data-id="network-fee">
                            {preSwapData
                              ? `${preSwapData.fee} ${SwapHelper.CetusHelper.getToken(sendToken).symbol}`
                              : '--'}
                          </Typography>
                          <Typography variant="body2" fontWeight={600} color={'white'}>
                            {bestRoute
                              ? bestRoute.splitPaths[0].basePaths.map(
                                  (item) => SwapHelper.CetusHelper.getToken(item.fromCoin).symbol + ` > `
                                )
                              : '--'}
                            {bestRoute
                              ? SwapHelper.CetusHelper.getToken(
                                  bestRoute.splitPaths[0].basePaths[bestRoute.splitPaths[0].basePaths.length - 1].toCoin
                                ).symbol
                              : ''}
                          </Typography>
                        </Box>
                      </Stack>
                    )}
                  </Box>
                </SwapBox>
              </Grid>
              <Grid item md={5} xs={12}>
                <SwapBox height={'100%'}>
                  <Stack direction={'row'} alignItems={'center'}>
                    {/* <TypographyGradient variant="h2" mr={1}>
                      Ref.
                    </TypographyGradient> */}
                    <img src="/images/pyth/pyth_logo_lockup_white.svg" height={42} width={'auto'} alt="" />
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
