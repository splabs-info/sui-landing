import { Box } from "@mui/material";
import { parseUnits } from "ethers/lib/utils";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { onchainMintingModule } from "../../onchain/minting-onchain";
import { formatPrice } from "../../setting/format";
import { CustomLoadingButton } from "../common/CustomButton";
import CustomModal from "../common/CustomModal";

export default function MintingPurchaseForm({ data, _close }) {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { setting, userStore } = useSelector((state) => state);
  const { applicationConfig } = setting;
  const { walletAddress } = userStore;
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (data && data.items.length > 0) {
      setSelectedPayment(data.items[0]);
    }
  }, [data]);

  const _handleErrorCallback = () => { };

  const _handlePurchase = () => {
    console.log(amount, selectedPayment, data);
    const price = (amount * data.unitPrice) / selectedPayment.usdRate;
    console.log(price);
    const boxScPrice = parseUnits(formatPrice("0.01", 8), 18);
    const contractAddress = selectedPayment.paymentContract;
    // console.log(applicationConfig);
    // if (contractAddress) {
    //   // setPurchasing(true);
    //   onchainMintingModule
    //     ._checkBeforePurchase(
    //       applicationConfig.inoContractAddress,
    //       contractAddress,
    //       boxScPrice,
    //       walletAddress,
    //       _handleErrorCallback
    //     )
    //     .then((success) => {
    //       console.log(success);
    //       if (success) {
    //         // setIsApproved(true);
    //         onchainMintingModule
    //           ._purchase(
    //             applicationConfig.inoContractAddress,
    //             applicationConfig.inoPurchaseAbi,
    //             "0x3000000000000000000000000000000000000002",
    //             "0x8d4857A7b17ffaD461D39BE5a92168fdC7812811",
    //             1,
    //             1,
    //             boxScPrice,
    //             contractAddress,
    //             _handleErrorCallback
    //           )
    //           .then((txHash) => {
    //             onchainMintingModule._getReceipt(txHash).then((success) => {
    //               if (success) {
    //                 // setIsConfirmed(true);
    //                 // setTimeout(() => {
    //                 //   setShowConfirm(false);
    //                 //   setPurchasing(false);
    //                 //   _handleSync();
    //                 //   toast.success(
    //                 //     `Congratulations. Buy ${formatNumberWithDecimal(
    //                 //       toAmount,
    //                 //       2
    //                 //     )} ${PRE_SALE_TOKEN} success.`
    //                 //   );
    //                 // }, 3000);
    //               }
    //             });
    //           });
    //       }
    //     });
    // } else {
    //   toast.error("Something went wrong. Please try again later.");
    // }
  };

  return (
    <CustomModal open={Boolean(data)} isShowCloseButton={true} _close={_close}>
      {data?.items?.map(
        (item, index) =>
          item.paymentContract && (
            <Box
              key={index}
              sx={{
                color:
                  selectedPayment?.paymentContract === item.paymentContract
                    ? "red"
                    : "green",
              }}
              onClick={() => setSelectedPayment(item)}
            >
              {item.paymentContract} - Rate: {item.usdRate}
            </Box>
          )
      )}
      <CustomLoadingButton onClick={_handlePurchase}>
        Purchase
      </CustomLoadingButton>
    </CustomModal>
  );
}
