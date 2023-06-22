import { JsonRpcProvider, mainnetConnection, testnetConnection } from '@mysten/sui.js';

export const config = {
  addresses: {
    package: process.env.REACT_APP_FREE_MINTING_PACKAGE
      ? process.env.REACT_APP_FREE_MINTING_PACKAGE
      : `0xefa4719dc641121fec0b5107a4585c1d23bea339c843c2da62a58fc7ea90bd76`,
    objectFreeMint: process.env.REACT_APP_FREE_MINTING_OBJECT
      ? process.env.REACT_APP_FREE_MINTING_OBJECT
      : `0xed89e1ba866666ed97c42505a705df182fbb9b4107cb6f19de3625ec3dfaa92c`,
    objectInformation: process.env.REACT_APP_FREE_MINTING_NFT_INFO
      ? process.env.REACT_APP_FREE_MINTING_NFT_INFO
      : `0xa247ba5fc5b4346ecf72c5a1de92cae40071149811f08142820280a1cd323fb0`,
  },
  providerConnection: process.env.REACT_APP_ENV === 'production' ? mainnetConnection : testnetConnection,
};

export const provider = new JsonRpcProvider(config.providerConnection);

console.log('free-minting-config', { config, provider });

export const FreeMintingHelper = {
  config,
};
