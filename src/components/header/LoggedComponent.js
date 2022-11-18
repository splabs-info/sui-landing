import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { Button, Divider, Grid, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CoinList } from "../../constant";
import { _addToken } from "../../onchain";
import { formatAddress, formatNumberWithDecimal } from "../../setting/format";
import {
  _getInformationByAddress,
  _getWalletLogout,
} from "../../store/user/userActions";
import CopyComponent from "../common/CopyComponent";

const WalletOption = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  position: "relative",
  backgroundImage: "linear-gradient(to right, #4b565e, #2d343d)",
  WebkitTextStroke: "0.1px #3f484f",
  borderRadius: 8,
  transition: "all 0.5s ease-out",
  marginBottom: theme.spacing(1),
  ".img-box": {
    padding: theme.spacing(1),
    background: "#22272d",
    borderRadius: "50%",
    img: {
      height: theme.spacing(4),
      width: theme.spacing(4),
      borderRadius: "50%",
    },
  },
  "&:hover": {
    background: "#22272d",
    boxShadow: "rgb(63 72 79 / 30%) 0px 0px 8px 0px",
    ".img-box": {
      backgroundImage: "linear-gradient(to right, #4b565e, #2d343d)",
    },
  },
}));

const MenuItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  cursor: "pointer",
  opacity: "0.9",
  "&:hover": {
    opacity: 1,
  },
}));

const InstallButton = styled(Button)(({ theme }) => ({
  display: "flex",
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  color: "#fff !important",
  borderRadius: 8,
  textTransform: "uppercase!important",
  background: "#22272d",
  position: "absolute",
  right: theme.spacing(2),
  minWidth: "unset!important",
  border: "1px solid #869ba5",
}));

const LoggedComponent = () => {
  const { userStore, setting } = useSelector((state) => state);
  const { onChainBalances, walletAddress } = userStore;
  const dispatch = useDispatch();
  const { library } = setting;

  const _handleLogout = () => {
    dispatch(_getWalletLogout());
    dispatch(_getInformationByAddress());
  };

  return (
    <Box pl={3} pr={3} mt={2} mb={2} textAlign="center">
      <Typography>Logged in</Typography>
      <AccountCircleIcon sx={{ width: 70, height: 70 }} />
      <Typography fontWeight={900}>{library.MY_WALLET}</Typography>
      <Box mb={2}>
        <CopyComponent content={`${walletAddress}`}>
          {formatAddress(`${walletAddress}`, 10)}
        </CopyComponent>
      </Box>
      <Divider sx={{ borderBottomWidth: 3 }} />
      <Box p={3}>
        {onChainBalances &&
          onChainBalances.map(
            (item, index) =>
              item.symbol !== CoinList.INC && (
                <WalletOption key={index}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Box className="img-box">
                            <img
                              alt={item.asset}
                              src={`/images/coins/${item.symbol}.png`}
                            />
                          </Box>
                        </Grid>
                        <Grid item>
                          <Typography variant="body1">
                            {formatNumberWithDecimal(item.onChainBalance)}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="caption" fontWeight={500}>
                            {item.symbol}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {index > 0 && (
                    <InstallButton
                      onClick={() => {
                        _addToken({
                          tokenAddress: item.contractAddress,
                          tokenSymbol: item.symbol,
                          tokenDecimals: item.decimals,
                          tokenImage: `https://marketplace.infinityangel.io/images/coins/${item.symbol}.png`,
                        });
                      }}
                    >
                      <Typography variant="body2">{library.ADD}</Typography>
                    </InstallButton>
                  )}
                </WalletOption>
              )
          )}
      </Box>
      <Box pl={3} pr={3}>
        <MenuItem onClick={_handleLogout}>
          <ExitToAppOutlinedIcon /> <Box ml={2}>{library.DISCONNECT}</Box>
        </MenuItem>
      </Box>
    </Box>
  );
};

export default LoggedComponent;
