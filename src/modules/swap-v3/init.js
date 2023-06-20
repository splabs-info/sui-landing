import SDK, { TickMath } from '@cetusprotocol/cetus-sui-clmm-sdk';
import { JsonRpcProvider, mainnetConnection } from '@mysten/sui.js';
import { formatUnits } from 'ethers/lib/utils.js';
import { mainnet } from './mainnet.config';
const BN = require('bn.js');
const Decimal = require('decimal.js');

const config = {
  swapPartner: process.env.REACT_APP_CETUS_SWAP_PARTNER
    ? process.env.REACT_APP_CETUS_SWAP_PARTNER
    : '0x2792048da4b0b174ebcd269be9bda69342edc0fc103422545880c61dc69fac21',
  sdkEnv: process.env.REACT_APP_ENV === 'production' ? mainnet : mainnet,
  providerConnection: process.env.REACT_APP_ENV === 'production' ? mainnetConnection : mainnetConnection,
};

export const sdk = new SDK(config.sdkEnv);
const coinMap = new Map();
const poolMap = new Map();
const tokenMap = new Map();

export const getPool = async (coinTypeA, coinTypeB) => {
  let pool = poolMap.get(`${coinTypeA}-${coinTypeB}`);
  if (!pool) {
    pool = poolMap.get(`${coinTypeB}-${coinTypeA}`);
  }
  return pool;
};

export function getToken(coinType) {
  return tokenMap.get(coinType);
}

export const cetusLoad = async () => {
  try {
    const pools = await sdk.Pool.getPools([], 0, 500);

    const tokens = await sdk.Token.getAllRegisteredTokenList();

    for (let i = 0; i < tokens.length; i += 1) {
      tokenMap.set(tokens[i].address, tokens[i]);
    }

    for (let i = 0; i < pools.length; i += 1) {
      if (pools[i].is_pause || pools[i].liquidity === '0') {
        continue;
      }

      let coin_a = pools[i].coinTypeA;
      let coin_b = pools[i].coinTypeB;

      coinMap.set(coin_a, {
        address: coin_a,
        decimals: 9,
      });
      coinMap.set(coin_b, {
        address: coin_b,
        decimals: 9,
      });

      const pair = `${coin_a}-${coin_b}`;
      const pathProvider = poolMap.get(pair);
      if (pathProvider) {
        pathProvider.addressMap.set(pools[i].fee_rate, pools[i].poolAddress);
      } else {
        poolMap.set(pair, {
          base: coin_a,
          quote: coin_b,
          addressMap: new Map([[pools[i].fee_rate, pools[i].poolAddress]]),
        });
      }
    }

    const coins = {
      coins: Array.from(coinMap.values()),
    };
    const paths = {
      paths: Array.from(poolMap.values()),
    };

    sdk.Router.loadGraph(coins, paths);
    return;
  } catch (error) {
    return;
  }
};

const provider = new JsonRpcProvider(config.providerConnection);

export async function getBalance(address, coin) {
  try {
    return await SwapHelper.provider.getBalance({ owner: address, coinType: coin });
  } catch (error) {
    console.log(error);
  }
}

export function getDecimals(coinType) {
  try {
    return tokenMap.get(coinType).decimals;
  } catch (error) {
    // console.log(error);
  }
}

export async function getPreSwapData(swapRouter, slippage, byAmountIn) {
  const amountOut = swapRouter.amountOut.toString();
  const { paths, coinTypeA, coinTypeB, amountIn, coinTypeC } = swapRouter;
  const priceLimit = new Decimal(amountOut).mul(new Decimal(slippage / 100));
  let minimumReceived;
  let totalFee;
  let impactPrice;

  if (swapRouter.coinTypeA && swapRouter.coinTypeB && swapRouter.coinTypeC) {
    minimumReceived = new Decimal(amountOut).sub(priceLimit).toString().split('.')[0];
    totalFee = -1;
    impactPrice = -1;
  } else {
    minimumReceived = new Decimal(amountOut.toString()).sub(priceLimit).toString().split('.')[0];
    let fee;
    let currentPrice = TickMath.sqrtPriceX64ToPrice(
      swapRouter.current_sqrt_price,
      tokenMap.get(swapRouter.coinTypeA).decimals,
      tokenMap.get(swapRouter.coinTypeB).decimals
    ).toString();
    let impact;

    if (swapRouter.a2b) {
      fee = formatUnits(
        swapRouter.amountIn * formatUnits(swapRouter.fee_rate, getDecimals(swapRouter.coinTypeA)),
        getDecimals(swapRouter.coinTypeA)
      );
      impact =
        formatUnits(swapRouter.amountOut, getDecimals(swapRouter.coinTypeB)) /
        formatUnits(swapRouter.amountIn, getDecimals(swapRouter.coinTypeA));
      impactPrice = ((currentPrice - impact) / currentPrice) * 100;
    } else {
      fee = formatUnits(
        swapRouter.amountIn * formatUnits(swapRouter.fee_rate, getDecimals(swapRouter.coinTypeA)),
        getDecimals(swapRouter.coinTypeB)
      );
      impact =
        formatUnits(swapRouter.amountIn, getDecimals(swapRouter.coinTypeB)) /
        formatUnits(swapRouter.amountOut, getDecimals(swapRouter.coinTypeA));
      impactPrice = ((impact - currentPrice) / currentPrice) * 100;
    }
    totalFee = fee * 100;
  }

  return { minimumReceived, totalFee, impactPrice: impactPrice.toFixed(2) };
}

export function formatBigNumber(str) {
  const num = Math.abs(Number(str)).toFixed(2);
  let result;
  if (num >= 1.0e9) {
    // Nine Zeroes for Billions
    const decimal = Math.floor((num - Math.floor(num / 1.0e9) * 1.0e9) / 1.0e7);
    result = Math.floor(num / 1.0e9) + '.' + (decimal > 9 ? decimal : '0' + decimal) + 'B';
  } else {
    if (num >= 1.0e6) {
      // Six Zeroes for Millions
      const decimal = Math.floor((num - Math.floor(num / 1.0e6) * 1.0e6) / 1.0e4);
      result = Math.floor(num / 1.0e6) + '.' + (decimal > 9 ? `${decimal}` : `0${decimal}`) + 'M';
    } else {
      if (num >= 1.0e3) {
        // Three Zeroes for Thousands
        const decimal = Math.floor((num - Math.floor(num / 1.0e3) * 1.0e3) / 1.0e1);
        result = Math.floor(num / 1.0e3) + '.' + (decimal > 9 ? `${decimal}` : `0${decimal}`) + 'K';
      } else {
        return num;
      }
    }
  }
  return result;
}

export const SwapHelper = {
  sdk,
  provider,
  BN,
  Decimal,
  config,
  cetusLoad,
  formatBigNumber,
  CetusHelper: {
    getPreSwapData,
    tokenMap,
    getDecimals,
  },
};