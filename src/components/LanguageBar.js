import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { _changeLanguage, _setLoading } from "../store/actions/settingActions";

const languages = [
  {
    key: "en",
    text: "English",
  },
  {
    key: "vn",
    text: "Vietnamese",
  },
  {
    key: "kr",
    text: "Korean",
  },
  {
    key: "jp",
    text: "Japanese",
  },
  {
    key: "rf",
    text: "Russian",
  },
];

export default function LanguageBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state);
  const { library, loading } = setting;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const _handleChange = (lang) => {
    dispatch(_changeLanguage(lang));
    dispatch(_setLoading(!loading));
    handleClose();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          ml: 2,
          width: 120,
          color: "#fa8962",
        }}
      >
        {library.CURRENT_LANG}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {languages.map((lang, index) => (
          <MenuItem onClick={() => _handleChange(lang.key)} key={index}>
            {lang.text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
