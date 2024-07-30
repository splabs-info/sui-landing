export const config = {
  appId: process.env.REACT_APP_ALCHEMY_PAY_APP_ID ? process.env.REACT_APP_ALCHEMY_PAY_APP_ID : '2713VQ03Icjd3n4E',
  appSecret: process.env.REACT_APP_ALCHEMY_PAY_APP_SECRET
    ? process.env.REACT_APP_ALCHEMY_PAY_APP_SECRET
    : 'wFNaNFP8YSgAm1dG',
  link: process.env.REACT_APP_ALCHEMY_PAY_URL ? process.env.REACT_APP_ALCHEMY_PAY_URL : `https://ramp.alchemypay.org`,
  network: 'BSC',
  crypto: 'USDT',
  fiat: 'MYR',
};

console.log(JSON.stringify(config));
