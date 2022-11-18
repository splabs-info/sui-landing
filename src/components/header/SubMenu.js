import { Menu } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Hidden,
  Popover,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppConfig } from "../../settings";
import { _changeLanguage } from "../../store/actions/settingActions";

const MenuButton = styled(Button)(({ theme }) => ({
  minWidth: "unset!important",
  marginLeft: theme.spacing(1),
  " &.active": {
    color: "red",
  },
}));

const LanguageItem = styled(Box)({
  background: "rgba(255,255,255,0.05)",
  borderRadius: "5px",
  whiteSpace: "nowrap",
  height: 30,
  width: 30,
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  marginRight: 8,
  cursor: "pointer",
  "&.active": {
    background: "var(--main-blue-color)",
  },
});

const Languages = ["en", "jp"];

export default function SubMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setting, user } = useSelector((state) => state);
  const { library } = setting;
  const dispatch = useDispatch();
  const { information } = user;
  const _handleClick = (event) => {
    setAnchorEl(anchorEl === null ? event.currentTarget : null);
  };
  const _handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <MenuButton onClick={_handleClick} className="custom-btn custom-font">
        <Menu />
      </MenuButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={_handleClose}
        onBlur={_handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          mt: 3,
        }}
      >
        <Box
          pt={3}
          pb={3}
          pr={2}
          pl={2}
          sx={{
            background: "#1b1c1d",
          }}
        >
          <Box>
            <Hidden mdUp>
              {AppConfig.MAIN_MENUS.map(
                (item, index) =>
                  (!item.isLogged || (item.isLogged && information)) && (
                    <Link to={item.url[0]} key={index}>
                      <Typography
                        variant="body1"
                        className="custom-font"
                        fontWeight={300}
                        sx={{
                          pt: 1,
                          pb: 1,
                        }}
                      >
                        {library[item.title]}
                      </Typography>
                    </Link>
                  )
              )}
              <Box mt={1} mb={3}>
                <Divider />
              </Box>
            </Hidden>
            <Typography variant="body2">{library.LANGUAGE}</Typography>
            <Box display="flex" mt={1}>
              {Languages.map((l, index) => (
                <LanguageItem
                  key={index}
                  onClick={() => {
                    dispatch(_changeLanguage(l));
                    _handleClose();
                  }}
                  className={library.lang === l ? "active" : ""}
                >
                  {l.toUpperCase()}
                </LanguageItem>
              ))}
            </Box>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
