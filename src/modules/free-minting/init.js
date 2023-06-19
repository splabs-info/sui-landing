import { JsonRpcProvider, mainnetConnection, testnetConnection } from '@mysten/sui.js';

export const config = {
  addresses: {
    package: process.env.REACT_APP_FREE_MINTING_PACKAGE
      ? process.env.REACT_APP_FREE_MINTING_PACKAGE
      : `0x6a29b3b80de2bd69ee94b2a2f11e5bf2e3614d1cc08f1cb16eefa290bc859cb0`,
    objectFreeMint: process.env.REACT_APP_FREE_MINTING_OBJECT
      ? process.env.REACT_APP_FREE_MINTING_OBJECT
      : `0x10dfba7d8456a54a45cc17072b9e5f1fc4ce8a56c86c6f9f8cfd061c4f0ff855`,
    objectInformation: process.env.REACT_APP_FREE_MINTING_NFT_INFO
      ? process.env.REACT_APP_FREE_MINTING_NFT_INFO
      : `0x7cc3144431a5f5eaa07428989eca1ecd25666dbc5b80a5261c7e1327fa7910de`,
  },
  providerConnection: process.env.REACT_APP_ENV === 'production' ? mainnetConnection : mainnetConnection,
};

export const provider = new JsonRpcProvider(config.providerConnection);

// console.log(provider);

// console.log('free-minting-config', config);
