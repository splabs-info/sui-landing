import { Close } from "@mui/icons-material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {
  Box,
  ClickAwayListener,
  Drawer,
  IconButton,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CustomBorderButton, CustomButton } from "../common/CustomButton";
import ChoseWalletModal from "./ChoseWalletModal";
import LoggedComponent from "./LoggedComponent";

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  zIndex: "9998!important",
  " .MuiDrawer-paperAnchorRight": {
    color: "#fff",
    backgroundImage: "linear-gradient(to top, #006e6b, #232930 60%)",
    backdropFilter: "blur(80px)",
    width: "420px!important",
    boxShadow: "none",
  },
  [theme.breakpoints.down("sm")]: {
    " .MuiDrawer-paperAnchorRight": {
      width: "100%!important",
    },
  },
}));

const MyWallet = ({ isBorderButton }) => {
  const [open, setOpen] = useState(false);
  const { userStore } = useSelector((state) => state);
  const { walletAddress } = userStore;

  const _handleClick = () => {
    setOpen(true);
  };

  const _onClose = () => {
    setOpen(false);
  };
  return (
    <>
      {isBorderButton ? (
        <CustomBorderButton
          sx={{
            textTransform: "unset!important",
            minWidth: "unset!important",
          }}
          onClick={_handleClick}
        >
          <AccountBalanceWalletIcon />
        </CustomBorderButton>
      ) : (
        <CustomButton
          sx={{
            textTransform: "unset!important",
            minWidth: "unset!important",
          }}
          onClick={_handleClick}
        >
          <AccountBalanceWalletIcon />
        </CustomButton>
      )}
      <CustomDrawer anchor={"right"} open={open} onClose={_onClose}>
        <ClickAwayListener onClickAway={_onClose}>
          <Box>
            <IconButton
              sx={{
                position: "absolute",
                right: 0,
                top: 0,
              }}
              onClick={_onClose}
            >
              <Close color="#fff" />
            </IconButton>
            {walletAddress ? (
              <LoggedComponent _onClose={_onClose} />
            ) : (
              <ChoseWalletModal />
            )}
            <Box>
              <img
                src="/images/characters/111936879.png"
                style={{ width: "70%", marginLeft: "15%" }}
                alt=""
              />
            </Box>
          </Box>
        </ClickAwayListener>
      </CustomDrawer>
    </>
  );
};

export default MyWallet;
