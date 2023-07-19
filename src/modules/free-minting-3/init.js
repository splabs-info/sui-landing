import { Connection, JsonRpcProvider, mainnetConnection, testnetConnection } from '@mysten/sui.js';

// export const config = {
//   addresses: {
//     package: process.env.REACT_APP_FREE_MINTING_2_PACKAGE
//       ? process.env.REACT_APP_FREE_MINTING_2_PACKAGE
//       : `0xefa4719dc641121fec0b5107a4585c1d23bea339c843c2da62a58fc7ea90bd76`,
//     objectFreeMint: process.env.REACT_APP_FREE_MINTING_2_OBJECT
//       ? process.env.REACT_APP_FREE_MINTING_2_OBJECT
//       : `0xed89e1ba866666ed97c42505a705df182fbb9b4107cb6f19de3625ec3dfaa92c`,
//     objectInformation: process.env.REACT_APP_FREE_MINTING_2_NFT_INFO
//       ? process.env.REACT_APP_FREE_MINTING_2_NFT_INFO
//       : `0xa247ba5fc5b4346ecf72c5a1de92cae40071149811f08142820280a1cd323fb0`,
//     nftPackageId: process.env.REACT_APP_FREE_MINTING_PACKAGE
//       ? process.env.REACT_APP_FREE_MINTING_PACKAGE
//       : `0x4a0de1e2b482da120f7d680e68df66fcb587b56cb89ba81b3322ccede49ed523`,
//   },
//   providerConnection: process.env.REACT_APP_ENV === 'production' ? mainnetConnection : testnetConnection,
// };

export const config = {
  addresses: {
    package: `0x7a47875b2e0f06fe7f834ab8745d67e266115fb69ff91d3ce48ac2bf51d155c5`,
    objectFreeMint: `0xfb105c032f78cedfbd49a44b293aa970e2892e02a5f168bd548001d27b525adb`,
    objectInformation: `0x7cc3144431a5f5eaa07428989eca1ecd25666dbc5b80a5261c7e1327fa7910de`,
    nftPackageId: '0x6a29b3b80de2bd69ee94b2a2f11e5bf2e3614d1cc08f1cb16eefa290bc859cb0',
  },
  providerConnection: new Connection({ fullnode: `https://explorer-rpc.mainnet.sui.io/` }),
};

export const provider = new JsonRpcProvider(config.providerConnection);

console.log('free-minting-3-config', { config, provider });

export const FreeMintingHelper = {
  config,
};
