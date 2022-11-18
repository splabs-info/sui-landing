const Promise = require("bluebird");
const { utils } = require("ethers");
const _ = require("lodash");

// Number || String: shortNumber
export const convertShortToLongNumber = (shortNumber) => {
  return utils.parseEther(Number(shortNumber).toString()).toString();
};

// BigNumber: longNumber
export const convertLongToShortNumber = (longNumber) => {
  return Number(utils.formatEther(longNumber));
};

export const checkBlockchainData = (arrData) =>
  arrData.filter((scData) => {
    const arrKeys = Object.keys(scData);
    if (Array.isArray(scData) && arrKeys.length % 2 === 0) {
      const [arr1, arr2] = _.chunk(Object.keys(scData), arrKeys.length / 2);
      if (
        _.difference(
          arr1.map((i) => scData[i]),
          arr2.map((i) => scData[i])
        ).length === 0
      )
        return true;
    }
    return false;
  }).length === arrData.length;

export const getKeysFromBlockchainData = (scData) =>
  _.chunk(Object.keys(scData), scData.length)[1];

export const getParsedBlockchainData = (arrData, arrParseShort, arrDefault) =>
  Promise.map(
    checkBlockchainData(arrData)
      ? arrData
      : checkBlockchainData([arrData])
        ? [arrData]
        : [],
    async (scData) =>
      Promise.reduce(
        getKeysFromBlockchainData(scData),
        async (rsObj, key) => {
          if (Array.isArray(scData[key]))
            rsObj[key] = await getParsedBlockchainData(
              scData[key],
              arrParseShort,
              arrDefault
            );
          else if (arrParseShort.includes(key))
            rsObj[key] = convertLongToShortNumber(scData[key]);
          else if (
            _.xor(
              getKeysFromBlockchainData(scData),
              arrParseShort,
              arrDefault
            ).includes(key)
          )
            rsObj[key] = scData[key].toString();
          else rsObj[key] = scData[key];
          return rsObj;
        },
        {}
      )
  );

export const convertOutput = async (
  arrData,
  arrParseShort = [],
  arrDefault = []
) => {
  const rs = await getParsedBlockchainData(arrData, arrParseShort, arrDefault);
  return rs.length === 1 ? rs.pop() : rs;
};

// export const convertEvent = async ({
//   filter,
//   eventName,
//   arrParseShort,
//   arrDefault,
// }) => {
//   const events = await web3.eth.getPastLogs(filter);
//   const arrRsData = await Promise.map(events, async (log) => {
//     const { topics, data, transactionHash, blockNumber, transactionIndex } =
//       log;
//     const rawData = config.ESCROW_VESTING_CONTRACT_IFACE.decodeEventLog(
//       eventName,
//       data,
//       topics
//     );
//     const parsedData = await convertOutput(
//       rawData,
//       arrParseShort,
//       arrDefault
//     );
//     return { blockNumber, transactionIndex, transactionHash, ...parsedData };
//   });
//   return _.sortBy(arrRsData, ["blockNumber", "transactionIndex"]);
// };

export const getReceiptFromTxHash = async (provider, txHash) => {
  return new Promise(async (resolve, reject) => {
    try {
      const receipt = await provider.waitForTransaction(txHash);
      // If status = 1 is success
      if (receipt.status === 1) {
        const gasPrice = await provider.getGasPrice();
        // Get real gas used
        const realGasUsed = utils.formatEther(receipt.gasUsed.mul(gasPrice));
        // Set data return to object dataResult
        const dataResult = {
          txHash: receipt.transactionHash,
          txFee: realGasUsed,
          isSuccess: true,
        };
        resolve(dataResult);
      }
      resolve({ isSuccess: false });
    } catch (error) {
      reject(error);
    }
  });
};

export const parseEthereumError = (exception) => {
  // console.log(exception);
  let objErr = {};
  let errorMessage = exception.toString();
  if (exception.tx) {
    if (exception.error.error.body) {
      objErr = JSON.parse(exception.error.error.body);
      errorMessage = objErr.error.message;
    } else {
      errorMessage = exception.reason;
    }
  } else if (exception.method && !exception.errorArgs) {
    if (exception.error) {
      objErr = JSON.parse(exception.error.body);
      errorMessage = objErr.error.message;
    } else {
      errorMessage = `[Smartcontract check] Address not found on chain`;
    }
  } else if (
    exception.argument ||
    exception.errorArgs ||
    exception.requestBody ||
    exception.code
  ) {
    if (exception.argument || exception.requestBody || exception.code) {
      errorMessage = `[Blockchain format check] ${exception.reason ? exception.reason : "Query for non exist data"
        }`;
    } else {
      errorMessage = `[Smartcontract check] ${exception.reason}`;
    }
  } else if (Object.keys(exception).length === 0) {
    errorMessage = `[Self check] ${errorMessage}`;
  } else {
    errorMessage = "Unknown error";
  }
  const modifyErrorMessage = errorMessage.replace(
    "execution reverted:",
    "[Smartcontract check]"
  );
  return modifyErrorMessage;
};
