import SDK, { TickMath } from '@cetusprotocol/cetus-sui-clmm-sdk';
import { JsonRpcProvider, mainnetConnection, testnetConnection } from '@mysten/sui.js';
import { formatUnits } from 'ethers/lib/utils.js';
import { mainnet } from './mainnet.config';
import { testnet } from './testnet.config';
const BN = require('bn.js');
const Decimal = require('decimal.js');

const config = {
  swapPartner: process.env.REACT_APP_CETUS_SWAP_PARTNER
    ? process.env.REACT_APP_CETUS_SWAP_PARTNER
    : '0x62da05b0008c2a07edd407016fea0ba72fa27495d582f1c6209ff9fd7eca6bca',
  sdkEnv: process.env.REACT_APP_ENV === 'production' ? mainnet : testnet,
  providerConnection: process.env.REACT_APP_ENV === 'production' ? mainnetConnection : testnetConnection,
};

export const sdk = new SDK(config.sdkEnv);
const coinMap = new Map();
const poolMap = new Map();
const tokenMap = new Map();
let pools = [];
let tokenList = [];

export const cetusLoad = async () => {
  const tokenList = await sdk.Token.getAllRegisteredTokenList();
  for (const token of tokenList) {
    tokenMap.set(token.address, token);
  }

  pools = [...(await sdk.Pool.getPools([], 0, 1000))];

  for (let i = 0; i < pools.length; i += 1) {
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

  // Load the path graph.
  sdk.Router.loadGraph(coins, paths);
};

cetusLoad();

const provider = new JsonRpcProvider(config.providerConnection);

export async function getBalance(address, coin) {
  try {
    return await SwapHelper.provider.getBalance({ owner: address, coinType: coin });
  } catch (error) {
    console.log(error);
  }
}

export function prettyAmount(amount, coin) {
  console.log({ amount, coin });
  amount = Number(amount).toFixed(getDecimals(coin)).replace('.', '');
  const coinAmount = new BN(parseFloat(amount));
  return coinAmount.toString();
}

export function getDecimals(coinType) {
  try {
    return tokenMap.get(coinType).decimals;
  } catch (error) {
    console.log(error);
  }
}

async function estimateFee({ poolAddress, from, amount }) {
  let fee;
  const pool = pools.find((p) => p.poolAddress === poolAddress);
  console.log('estimateFee.pool', { pool });
  if (pool.coinTypeA === from) {
    fee = formatUnits(
      new Decimal(amount.toString()).mul(
        new Decimal(prettyAmount(pool.fee_rate, pool.coinTypeA)),
        getDecimals(pool.coinTypeA)
      )
    );
  } else {
    fee = formatUnits(
      new Decimal(amount.toString()).mul(
        new Decimal(prettyAmount(pool.fee_rate, pool.coinTypeA)),
        getDecimals(pool.coinTypeA)
      )
    );
  }
  fee = fee * 100;
  console.log('estimateFee', { fee: formatUnits(fee.toString()) });
  return fee;
}

export async function getPreSwapData(swapRouter, slippage, byAmountIn) {
  const amountOut = swapRouter.amountOut.toString();
  const { paths, coinTypeA, coinTypeB, amountIn, coinTypeC } = swapRouter;
  const priceLimit = new Decimal(amountOut).mul(new Decimal(slippage / 100));
  let minimumReceived;
  let totalFee;
  let impactPrice;
  let res = {};

  // let poolA = pools.find((p) => p.coinTypeA === coinTypeA && p.coinTypeB === coinTypeB);
  // if (!poolA) poolA = pools.find((p) => p.coinTypeB === coinTypeA && p.coinTypeA === coinTypeB);
  // let poolB = pools.find((p) => p.coinTypeA === coinTypeB && p.coinTypeB === coinTypeC);
  // if (!poolB) poolB = pools.find((p) => p.coinTypeB === coinTypeB && p.coinTypeA === coinTypeC);

  // console.log({ pools, poolA, poolB });

  // const res = await sdk.Swap.preswap({
  //   pool: poolA,
  //   current_sqrt_price: poolA.current_sqrt_price,
  //   coinTypeA: poolA.coinTypeA,
  //   coinTypeB: poolA.coinTypeB,
  //   decimalsA: tokenMap.get(swapRouter.coinTypeA).decimals,
  //   decimalsB: tokenMap.get(swapRouter.coinTypeB).decimals,
  //   a2b: true,
  //   by_amount_in: true,
  //   amount: amountIn.toString(),
  // });

  // console.log(poolMap);
  // const { addressMap } = poolMap.get(`${swapRouter.coinTypeA}-${swapRouter.coinTypeB}`);

  // let fee = new Decimal(0);

  // addressMap.forEach((value, key) => {
  //   fee = fee.add(new Decimal(key));
  //   console.log(key);
  // });

  // const { decimals } = tokenMap.get(swapRouter.coinTypeA);

  // console.log(formatUnits(fee.toString(), decimals));

  // console.log(swapRouter.paths[0].rawAmountLimit[0].toString());
  // console.log(swapRouter.paths[0].rawAmountLimit[1].toString());

  if (swapRouter.coinTypeA && swapRouter.coinTypeB && swapRouter.coinTypeC) {
    minimumReceived = new Decimal(amountOut).sub(priceLimit).toString().split('.')[0];
    totalFee = -1;
    impactPrice = -1;
    // const poolA = pools.find((p) => p.poolAddress === swapRouter.paths[0].poolAddress[0]);

    // console.log({ poolA });

    // let fee;
    // let currentPrice = TickMath.sqrtPriceX64ToPrice(
    //   poolA.current_sqrt_price,
    //   tokenMap.get(poolA.coinTypeA).decimals,
    //   tokenMap.get(poolA.coinTypeB).decimals
    // ).toString();
    // let impact;

    // fee = formatUnits(
    //   swapRouter.amountIn * formatUnits(poolA.fee_rate, getDecimals(poolA.coinTypeA)),
    //   getDecimals(poolA.coinTypeA)
    // );
    // impact =
    //   formatUnits(swapRouter.amountOut.toString(), getDecimals(poolA.coinType)) /
    //   formatUnits(swapRouter.amountIn.toString(), getDecimals(poolA.coinTypeA));
    // impactPrice = ((currentPrice - impact) / currentPrice) * 100;

    // totalFee = fee * 100;

    // const poolBFee = await estimateFee({
    //   poolAddress: swapRouter.paths[0].poolAddress[1],
    //   from: swapRouter.coinTypeB,
    //   to: swapRouter.coinTypeC,
    //   amount: swapRouter.amountOut,
    // });
    // const poolA = pools.find((p) => p.poolAddress === swapRouter.paths[0].poolAddress[0]);
    // const poolB = pools.find((p) => p.poolAddress === swapRouter.paths[0].poolAddress[1]);

    // console.log({ poolA, poolB });

    // console.log('poolADecimals', tokenMap.get(poolA.coinTypeA).decimals);

    // console.log(
    //   'formatUnits',
    //   formatUnits(swapRouter.paths[0].amountIn.toString(), tokenMap.get(poolA.coinTypeA).decimals)
    // );

    // const swapFeeA =
    //   parseFloat(formatUnits(swapRouter.paths[0].amountIn.toString(), tokenMap.get(poolA.coinTypeA).decimals)) *
    //   parseFloat(formatUnits(poolA.fee_rate, tokenMap.get(poolA.coinTypeA).decimals));
    // console.log(swapFeeA);

    // let swapFeeB;

    // let feeBDecimals =
    //   poolB.coinTypeA === coinTypeC ? tokenMap.get(poolB.coinTypeB).decimals : tokenMap.get(poolB.coinTypeA).decimals;

    // console.log({ feeBDecimals });

    // if (poolB.coinTypeA === coinTypeC) {
    //   swapFeeB =
    //     formatUnits(swapRouter.paths[0].rawAmountLimit[1].toString(), feeBDecimals) *
    //     parseFloat(formatUnits(poolA.fee_rate, tokenMap.get(poolB.coinTypeA).decimals));
    // } else {
    //   swapFeeB =
    //     formatUnits(swapRouter.paths[0].rawAmountLimit[0].toString(), feeBDecimals) *
    //     parseFloat(formatUnits(poolA.fee_rate, tokenMap.get(poolB.coinTypeA).decimals));
    // }

    // console.log({ swapFeeB });
    // let a2b;

    // if (poolA.coinTypeA === coinTypeA) {
    //   a2b = true;
    // } else {
    //   a2b = false;
    // }
    // let currentPrice;

    // if (a2b) {
    //   currentPrice = TickMath.sqrtPriceX64ToPrice(
    //     swapRouter.currentSqrtPrice[0],
    //     tokenMap.get(poolA.coinTypeA).decimals,
    //     tokenMap.get(poolA.coinTypeB).decimals
    //   ).toString();
    // } else {
    //   currentPrice =
    //     1 /
    //     TickMath.sqrtPriceX64ToPrice(
    //       swapRouter.currentSqrtPrice[0],
    //       tokenMap.get(poolA.coinTypeA).decimals,
    //       tokenMap.get(poolA.coinTypeB).decimals
    //     ).toString();
    // }

    // const fee = swapFeeA + swapFeeB * currentPrice;
    // const poolFee = poolA.fee * 100 + '%';
    // console.log({ poolFee, fee: formatUnits(fee, '9') });
    // console.log(poolFee);
    // suiSwapFee.value = fee>0&&fee<0.000001?<0.000001 ${fromCoin.value.symbol}:addCommom(sFixD(fee, fromCoin.value.decimals)) +  ${fromCoin.value.symbol}
  } else {
    minimumReceived = new Decimal(byAmountIn ? amountOut.toString() : amountIn.toString())
      .sub(priceLimit)
      .toString()
      .split('.')[0];
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

export const SwapHelper = {
  sdk,
  provider,
  BN,
  Decimal,
  config,
  cetusLoad,
  CetusHelper: {
    getPreSwapData,
    tokenMap,
    pools,
    getDecimals,
  },
};
