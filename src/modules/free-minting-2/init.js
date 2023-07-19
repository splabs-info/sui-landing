import { Connection, JsonRpcProvider, mainnetConnection, testnetConnection } from '@mysten/sui.js';

export const config = {
  addresses: {
    package: process.env.REACT_APP_FREE_MINTING_2_PACKAGE
      ? process.env.REACT_APP_FREE_MINTING_2_PACKAGE
      : `0xefa4719dc641121fec0b5107a4585c1d23bea339c843c2da62a58fc7ea90bd76`,
    objectFreeMint: process.env.REACT_APP_FREE_MINTING_2_OBJECT
      ? process.env.REACT_APP_FREE_MINTING_2_OBJECT
      : `0xed89e1ba866666ed97c42505a705df182fbb9b4107cb6f19de3625ec3dfaa92c`,
    objectInformation: process.env.REACT_APP_FREE_MINTING_2_NFT_INFO
      ? process.env.REACT_APP_FREE_MINTING_2_NFT_INFO
      : `0xa247ba5fc5b4346ecf72c5a1de92cae40071149811f08142820280a1cd323fb0`,
    nftPackageId: process.env.REACT_APP_FREE_MINTING_PACKAGE
      ? process.env.REACT_APP_FREE_MINTING_PACKAGE
      : `0x4a0de1e2b482da120f7d680e68df66fcb587b56cb89ba81b3322ccede49ed523`,
  },
  // providerConnection: process.env.REACT_APP_ENV === 'production' ? mainnetConnection : testnetConnection,
  providerConnection:
    process.env.REACT_APP_ENV === 'production'
      ? new Connection({ fullnode: `https://explorer-rpc.mainnet.sui.io/` })
      : testnetConnection,
};

export const provider = new JsonRpcProvider(config.providerConnection);

console.log('free-minting-2-config', { config, provider });

export const FreeMintingHelper = {
  config,
};
