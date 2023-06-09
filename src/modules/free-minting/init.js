import { JsonRpcProvider, mainnetConnection, testnetConnection } from '@mysten/sui.js';

export const config = {
  addresses: {
    package: process.env.REACT_APP_FREE_MINTING_PACKAGE
      ? process.env.REACT_APP_FREE_MINTING_PACKAGE
      : `0x36452bd1553717ab5b77a42c92e792a8cdd2844d8f98fc45f6c62cf84963b03f`,
    objectFreeMint: process.env.REACT_APP_FREE_MINTING_OBJECT
      ? process.env.REACT_APP_FREE_MINTING_OBJECT
      : `0x71ebf2a4ff1e2d4073d1d3ba052e843720ce786b5d5d0746f1daa3a9bf1316b0`,
    objectInformation: process.env.REACT_APP_FREE_MINTING_NFT_INFO
      ? process.env.REACT_APP_FREE_MINTING_NFT_INFO
      : `0xa247ba5fc5b4346ecf72c5a1de92cae40071149811f08142820280a1cd323fb0`,
  },
  providerConnection: process.env.REACT_APP_ENV === 'production' ? mainnetConnection : testnetConnection,
};

export const provider = new JsonRpcProvider(config.providerConnection);

console.log('free-minting-config', config);
