export const ADDRESS_0 = "0x0000000000000000000000000000000000000000";
export const CoinList = {
  ING: "ING",
  INC: "INC",
};
export const StatusList = {
  UNKNOWN: "UNKNOWN",
};
export const ErrorCode = {
  ACCOUNT_NOTFOUND: "ACCOUNT_NOTFOUND",
};
export const PRE_SALE_TOKEN = "ING";
export const PRE_SALE_ROUNDS = [
  {
    key: 0,
    roundId: `0x1000000000000000000000000000000000000000`,
    name: `${PRE_SALE_TOKEN} Token OG Pre-sale`,
    notices: ["PRESALE_ROUND_O_TIME", "PRESALE_ROUND_0_VESTING_INFORMATION"],
    time: "19:00 ~ 23:00 September 17, 2022 (UTC+9)",
    totalSupply: 2857142.86,
    currentSold: 0,
    USDPrice: 0.0141,
    startAt: 1663408800,
    endAt: 1663423200,
    minUSD: 400,
    isSync: true,
    isStaticEnd: true,
  },
  {
    key: 1,
    roundId: `0x1000000000000000000000000000000000000001`,
    name: `${PRE_SALE_TOKEN} Token Pre-sale Round 1`,
    notices: ["PRESALE_ROUND_1_TIME", "PRESALE_ROUND_1_VESTING_INFORMATION"],
    time: "19:00 September 20 ~ 23:00 September 21, 2022 (UTC+9)",
    totalSupply: 33333333.3,
    currentSold: 0,
    USDPrice: 0.015,
    startAt: 1663668000,
    endAt: 1663768800,
    minUSD: 800,
    isSync: true,
    isStaticEnd: true,
  },
  {
    key: 2,
    roundId: `0x1000000000000000000000000000000000000002`,
    name: `${PRE_SALE_TOKEN} Token Pre-sale Round 2`,
    notices: [
      "PRESALE_ROUND_2_TIME",
      "PRESALE_ROUND_2_BENEFIT",
      "PRESALE_ROUND_2_VESTING_INFORMATION",
    ],
    time: "15:00 September 23 ~ 23:00 September 27, 2022 (UTC+9)",
    totalSupply: 93750000,
    currentSold: 0,
    USDPrice: 0.016,
    startAt: 1663912800,
    endAt: 1664287200,
    isSync: true,
  },
  // {
  //   key: 3,
  //   roundId: `0x2000000000000000000000000000000000000000`,
  //   name: `${PRE_SALE_TOKEN} Token Pre-sale Round 3`,
  //   notices: [
  //     "PRESALE_ROUND_3_TIME",
  //     "PRESALE_ROUND_3_BENEFIT",
  //     "PRESALE_ROUND_3_VESTING_INFORMATION",
  //   ],
  //   time: "19:00 September 29 ~ 23:00 October 6, 2022 (UTC+9)",
  //   staticTotalSupply: 88235294.1,
  //   staticPrice: 0.017,
  //   isSync: true,
  // },
];
