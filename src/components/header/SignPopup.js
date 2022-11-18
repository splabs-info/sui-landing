import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Buffer } from "buffer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { prefix } from "../../onchain";
import { _setWalletSignature } from "../../store/user/userActions";
import CustomModal from "../common/CustomModal";

const SignButton = styled(Button)(({ theme }) => ({
  minHeight: "45px",
  width: "48%!important",
  minWidth: "unset!important",
  display: "flex",
  padding: " 0px 40px",
  color: "#fff !important",
  borderRadius: "7px !important",
  textTransform: "uppercase!important",
  fontFamily: "Orbitron !important",
  background: "rgba(255, 255, 255, 0.1) !important",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.2) !important",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    width: "100%!important",
  },
}));

const CancelButton = styled(Button)(({ theme }) => ({
  minHeight: "45px",
  width: "48%!important",
  minWidth: "unset!important",
  display: "flex",
  padding: " 0px 40px",
  color: "#fff !important",
  borderRadius: "7px !important",
  textTransform: "uppercase!important",
  fontFamily: "Orbitron !important",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    width: "100%!important",
    marginBottom: theme.spacing(2),
  },
  "&:hover": {
    background: "rgba(255, 255, 255, 0.2) !important",
  },
}));

const CustomLink = styled(Link)({
  color: "var(--primary-color)",
  opacity: 0.9,
  "&:hover": {
    opacity: 1,
  },
});

export default function SignPopup({ open, _onClose }) {
  const { userStore, setting } = useSelector((state) => state);
  const { walletAddress } = userStore;
  const dispatch = useDispatch();
  const { library, applicationConfig } = setting;

  const _checkSignature = async () => {
    const data = `0x${Buffer.from(
      applicationConfig.ARR_SIGN_MESSAGE.HUMAN,
      "utf8"
    ).toString("hex")}`;
    prefix
      .request({
        method: "personal_sign",
        params: [data, walletAddress],
      })
      .then((signature) => {
        dispatch(_setWalletSignature(signature));
        _onClose();
      })
      .catch((error) => {
        toast.error("Sign wallet failed. Please try again.");
        _onClose();
        console.log(error);
      });
  };

  return (
    <CustomModal open={open} _close={_onClose} p={5}>
      <Typography variant="h6" mb={5}>
        {library.WELCOME_TO} Infinity Angel Marketplace
      </Typography>
      <img
        src="/logo.png"
        width={130}
        alt="sign-logo"
        style={{ margin: "auto" }}
      />
      <Typography mt={5} variant="body2" mb={5}>
        {library.SIGN_NOTE}{" "}
        <CustomLink to="https://doc.infinityangel.io/faqs/terms-of-use">
          {library.TERM_OF_SERVICE}
        </CustomLink>{" "}
        {library.AND}{" "}
        <CustomLink to="https://doc.infinityangel.io/faqs/privacy-policy">
          {library.PRIVACY_POLICY}
        </CustomLink>
        .
      </Typography>
      <Box
        sx={(theme) => ({
          display: "flex",
          justifyContent: "space-between",
          [theme.breakpoints.down("sm")]: {
            display: "block",
          },
        })}
      >
        <CancelButton onClick={_onClose}>{library.CANCEL}</CancelButton>
        <SignButton onClick={_checkSignature}>
          {library.ACCEPT_AND_SIGN}
        </SignButton>
      </Box>
    </CustomModal>
  );
}
