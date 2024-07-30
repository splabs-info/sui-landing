export const config = {
  appId: process.env.REACT_APP_ALCHEMY_PAY_APP_ID ? process.env.REACT_APP_ALCHEMY_PAY_APP_ID : '',
  appSecret: process.env.REACT_APP_ALCHEMY_PAY_APP_SECRET ? process.env.REACT_APP_ALCHEMY_PAY_APP_SECRET : '',
  link: process.env.REACT_APP_ALCHEMY_PAY_URL ? process.env.REACT_APP_ALCHEMY_PAY_URL : `https://ramp.alchemypay.org`,
  network: 'BSC',
  crypto: 'USDT',
  fiat: 'MYR',
};

console.log(JSON.stringify(config));
