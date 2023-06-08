import { Percentage, adjustForSlippage, d } from '@cetusprotocol/cetus-sui-clmm-sdk';
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  IconButton,
  InputBase,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
import { IconChartLine, IconChevronDown, IconSettings } from '@tabler/icons';
import Page from 'components/common/Page';
import { SectionBox, TypographyGradient } from 'components/home-v2/HomeStyles';
import { formatUnits } from 'ethers/lib/utils.js';
import useResponsive from 'hooks/useResponsive';
import { SwapSettings } from 'modules/swap-ui/SwapSettingsPopup';
import {
  AmountBox,
  AmountStack,
  ConnectButton,
  PriceTypography,
  SelectToken,
  SwapBox,
  SwapButton,
} from 'modules/swap-ui/SwapStyles';
import React from 'react';
import { toast } from 'react-toastify';
import { SwapHelper, sdk } from './init';
import CustomInput from './components/CustomInput';

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
  const [receiveAmount, setReceiveAmount] = React.useState('0');
  const [flag, setFlag] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [byAmountIn, setByAmountInt] = React.useState(true);
  const [estimate, setEstimate] = React.useState(null);
  const [estimating, setEstimating] = React.useState(false);
  const [calculateResult, setCalculateResult] = React.useState(null);
  const [slippageSetting, setSlippageSetting] = React.useState(true);
  const [openSettings, setOpenSettings] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
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
        setPoolList(tempPoolList);
        setTokenList(tokenList);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [flag]);

  React.useEffect(() => {
    if (wallet.address) {
      sdk.senderAddress = wallet.address;
      (async () => {
        const tempTokenList = [];
        for (const iterator of tokenList) {
          const balance = {
            ...iterator,
            ...(await SwapHelper.provider.getBalance({ owner: wallet.address, coinType: iterator.address })),
          };
          tempTokenList.push(balance);
        }
        setBalances(tempTokenList);
      })();
    }
  }, [wallet.address]);

  const handleSwap = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const coinAmount = new SwapHelper.BN(sendAmount).mul(
        new SwapHelper.BN(10).pow(new SwapHelper.BN(sendToken.decimals))
      );
      const pool = selectedPool;

      console.log({
        pool_id: pool.poolAddress,
        coinTypeA: pool.coinTypeA,
        coinTypeB: pool.coinTypeB,
        a2b,
        by_amount_in: byAmountIn,
        amount: coinAmount.toString(),
        amount_limit: estimate.amountLimit,
      });

      const swapPayload = await sdk.Swap.createSwapTransactionPayload({
        pool_id: pool.poolAddress,
        coinTypeA: pool.coinTypeA,
        coinTypeB: pool.coinTypeB,
        a2b,
        by_amount_in: byAmountIn,
        amount: coinAmount.toString(),
        amount_limit: estimate.amountLimit.toString(),
        swap_partner: '0x62da05b0008c2a07edd407016fea0ba72fa27495d582f1c6209ff9fd7eca6bca',
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
        setSelectedPool(selectPool ? selectPool : null);
      }
    }
  }, [poolList, receiveToken, sendToken]);

  React.useEffect(() => {
    if (selectedPool && sendAmount) {
      setEstimating(true);
      (async () => {
        try {
          const coinAmount = new SwapHelper.BN(sendAmount).mul(
            new SwapHelper.BN(10).pow(new SwapHelper.BN(sendToken.decimals))
          );
          const slippage = Percentage.fromDecimal(d(slippageSetting));

          console.log({
            pool: selectedPool,
            current_sqrt_price: selectedPool.current_sqrt_price,
            coinTypeA: selectedPool.coinTypeA,
            coinTypeB: selectedPool.coinTypeB,
            decimalsA: sendToken.decimals,
            decimalsB: receiveToken.decimals,
            a2b,
            by_amount_in: byAmountIn,
            amount: coinAmount.toString(),
          });

          const res = await sdk.Swap.preswap({
            pool: selectedPool,
            current_sqrt_price: selectedPool.current_sqrt_price,
            coinTypeA: selectedPool.coinTypeA,
            coinTypeB: selectedPool.coinTypeB,
            decimalsA: sendToken.decimals,
            decimalsB: receiveToken.decimals,
            a2b,
            by_amount_in: byAmountIn,
            amount: coinAmount.toString(),
          });

          const tickData = await sdk.Pool.fetchTicksByRpc(selectedPool.ticks_handle);

          const calculateResult = await sdk.Swap.calculateRates({
            currentPool: selectedPool,
            decimalsA: sendToken.decimals,
            decimalsB: receiveToken.decimals,
            a2b,
            byAmountIn,
            amount: coinAmount,
            swapTicks: tickData,
          });

          const toAmount = byAmountIn ? res.estimatedAmountOut : res.estimatedAmountIn;
          const amountLimit = adjustForSlippage(new SwapHelper.BN(toAmount), slippage, !byAmountIn);
          setEstimating(false);
          setReceiveAmount(formatUnits(toAmount.toString(), receiveToken.decimals));
          setEstimate({ ...res, amountLimit, slippage });
          setCalculateResult(calculateResult);
        } catch (error) {
          console.log(error);
          setEstimating(false);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a2b, byAmountIn, selectedPool, sendAmount]);

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
                <IconButton>
                  <IconChartLine />
                </IconButton>
                <Typography color={'#fff'} ml={1}>
                  {' '}
                  {slippageSetting === true ? 'Auto' : `${slippageSetting}%`}
                </Typography>
                <IconButton onClick={() => setOpenSettings(true)}>
                  <IconSettings />
                </IconButton>
              </Stack>
              <AmountBox>
                <Stack direction="row" justifyContent={'space-between'} alignItems={'center'}>
                  <CustomInput
                    variant="standard"
                    // value={sendAmount}
                    handleDone={(e) => setSendAmount(e)}
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
                        onClick={() => {
                          setSendToken(token);
                          setSendAmount('0');
                          setReceiveAmount('0');
                        }}
                      >
                        <img
                          src={`https://archive.cetus.zone/assets/image/sui/${token.symbol.toLowerCase()}.png`}
                          alt={token.symbol}
                          width={isMobile ? 24 : 32}
                          style={{ marginRight: '8px' }}
                        />
                        {token.symbol}
                      </MenuItem>
                    ))}
                  </SelectToken>
                </Stack>
                <Stack direction="row" justifyContent={'space-between'} alignItems={'center'} mt={2}>
                  <Typography color={'white'}>$ 0.00</Typography>
                  <AmountStack>
                    <img src="/images/icon/icon-wallet-green.png" alt="" />
                    <Typography>
                      {sendToken && balances.length > 0
                        ? formatUnits(
                            balances.find((item) => item.symbol === sendToken?.symbol)?.totalBalance,
                            sendToken.decimals
                          )
                        : '--'}
                    </Typography>
                  </AmountStack>
                </Stack>
              </AmountBox>

              <Stack alignItems={'center'} sx={{ '& svg': { color: '#14E3BE' } }}>
                <IconChevronDown size={'36px'} />
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
                  <SelectToken value={receiveToken?.address}>
                    {tokenList.map((token) => (
                      <MenuItem
                        value={token.address}
                        key={token.address}
                        onClick={() => {
                          setReceiveToken(token);
                          setSendAmount('0');
                          setReceiveAmount('0');
                        }}
                      >
                        <img
                          src={`https://archive.cetus.zone/assets/image/sui/${token.symbol.toLowerCase()}.png`}
                          alt={token.symbol}
                          width={isMobile ? 24 : 32}
                          style={{ marginRight: '8px' }}
                        />
                        {token.symbol}
                      </MenuItem>
                    ))}
                  </SelectToken>
                </Stack>
                <Stack direction="row" justifyContent={'space-between'} alignItems={'center'} mt={2}>
                  <Typography color={'white'}>$ 0.00</Typography>
                  <AmountStack>
                    <img src="/images/icon/icon-wallet-green.png" alt="" />
                    <Typography>
                      {balances.length > 0 && receiveToken
                        ? formatUnits(
                            balances.find((item) => item.symbol === receiveToken?.symbol)?.totalBalance,
                            receiveToken.decimals
                          )
                        : '--'}
                    </Typography>
                  </AmountStack>
                </Stack>
              </AmountBox>

              <ConnectButton loading={loading || estimating} type="submit">
                Swap
              </ConnectButton>
              {estimating ? (
                <Stack direction="row" justifyContent={'center'} alignItems={'center'} mt={4}>
                  <CircularProgress />
                </Stack>
              ) : null}
              {estimate && !estimating ? (
                <Stack direction="row" justifyContent={'space-between'} alignItems={'center'} mt={4}>
                  <Box>
                    <Typography variant="body2" fontWeight={600} color={'white'}>
                      Price impact
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color={'white'}>
                      Est. received
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color={'white'}>
                      Min. received
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color={'white'}>
                      Network fee
                    </Typography>
                  </Box>
                  <Box textAlign={'right'}>
                    <Typography variant="body2" fontWeight={600} color={'white'} data-id="price-impact">
                      {calculateResult ? `${calculateResult.priceImpactPct.toFixed(4)}%` : '--'}
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color={'white'} data-id="est-received">
                      --
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color={'white'} data-id="min-received">
                      {estimate
                        ? `${formatUnits(estimate.amountLimit.toString(), receiveToken.decimals)}
                      ${receiveToken.official_symbol}`
                        : '--'}
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color={'white'} data-id="network-fee">
                      {estimate
                        ? `${formatUnits(estimate?.estimatedFeeAmount, sendToken.decimals)} ${
                            sendToken.official_symbol
                          }`
                        : '--'}
                    </Typography>
                  </Box>
                </Stack>
              ) : null}
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
