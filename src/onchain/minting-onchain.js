import { ethers } from "ethers";
import { toast } from "react-toastify";
import { provider, signer } from ".";
import { ADDRESS_0 } from "../constant";
import { ERC20_ABI } from "./abi-bytecode";
import { parseEthereumError } from "./utils/common";

const ESCROW_VESTING = null;

export const onchainMintingModule = {
  _showError: function (error) {
    console.log(error);
    toast.error(parseEthereumError(error));
  },
  _getReceipt: async function (txHash) {
    try {
      const receipt = await provider.waitForTransaction(txHash);
      if (receipt.status === 1) {
        return true;
      } else {
        console.log("Transaction error with status code 0");
        return false;
      }
    } catch (error) {
      this._showError(error);
    }
  },
  _checkBeforePurchase: async function (
    addressApproved,
    tokenERC20Address,
    amountNeeded,
    walletAddress,
    _handleErrorCallback
  ) {
    console.log(this.a, {
      addressApproved,
      tokenERC20Address,
      amountNeeded,
      walletAddress,
      _handleErrorCallback,
    });
    try {
      if (tokenERC20Address === ADDRESS_0) return true;

      const contractInstance = new ethers.Contract(
        tokenERC20Address,
        ERC20_ABI,
        provider
      );

      var balance = await contractInstance.balanceOf(walletAddress);

      var approveAmount = await contractInstance.allowance(
        walletAddress,
        addressApproved
      );

      if (
        Number(ethers.utils.formatEther(approveAmount.toString())) >=
        Number(ethers.utils.formatEther(amountNeeded))
      ) {
        return true;
      }

      if (
        Number(ethers.utils.formatEther(balance)) >=
        Number(ethers.utils.formatEther(amountNeeded))
      ) {
        const contractWithSigner = new ethers.Contract(
          tokenERC20Address,
          ERC20_ABI,
          signer
        );

        const tx = await contractWithSigner.approve(
          addressApproved,
          amountNeeded
        );

        var approveSuccess = await this._getReceipt(tx.hash);

        if (!approveSuccess) {
          _handleErrorCallback();
          return false;
        }

        if (approveSuccess) return true;

        return false;
      } else {
        toast.error(`Unavailable balance`);
        _handleErrorCallback();
      }
    } catch (error) {
      console.log(error);
      this._showError(error);
      _handleErrorCallback(error);
    }
  },
  _purchase: async function (
    IDOContractAddress,
    abiArray,
    roundId,
    ref,
    tier,
    qty,
    paymentAmount,
    paymentToken,
    _handleErrorCallback
  ) {
    const contract = new ethers.Contract(IDOContractAddress, abiArray, signer);
    console.log(contract);
    //   try {
    const purchaseInput = {
      roundId,
      ref,
      tier,
      qty,
      paymentAmount,
      paymentToken,
    };
    console.log(purchaseInput);
    //     const tx = await ESCROW_VESTING.purchase(purchaseInput, signer);
    //     return tx.hash;
    //   } catch (error) {
    //     console.log(error);
    //     this._showError(error);
    //     _handleErrorCallback();
    //   }
  },
};
