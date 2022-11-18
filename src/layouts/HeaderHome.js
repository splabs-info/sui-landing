import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Avatar,
  Box,
  Collapse,
  Container,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { IconMenu2 } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useResponsive from "../hooks/useResponsive";
import { AppConfig } from "../setting";
import Languages from "./Languages";
import { WhitePaperButton, Header, IconLang, Navbar, ApplyButton } from "../components/header/HeaderStyles";

const config = [

  { label: "key_1", link: "/#" },
  { label: "key_2", link: "/#" },
  { label: "key_3", link: "/#" },
  { label: "key_4", link: "/#" },
  { label: "key_5", link: "/#" },
  { label: "key_6", link: "/#" },
];

const whitepaper = [
  {
    lang: "English",
    url: "/",
    icon: "/images/icon/icon-en.png",
  },
  {
    lang: "Korean",
    url: "/",
    icon: "/images/icon/icon-kr.png",
  },
  {
    lang: "Vietnamese",
    url: "/",
    icon: "/images/icon/icon-vn.png",
  },
  {
    lang: "Japanese",
    url: "/",
    icon: "/images/icon/icon-jp.png",
  },
];

const subMenus = [
  {
    label: "WHITEPAPER",
    items: [
      {
        label: "English",
        link: "/",
      },
      {
        label: "Korean",
        link: "/",
      },
      {
        label: "Vietnamese",
        link: "/",
      },
      {
        label: "Japanese",
        link: "/",
      },
    ],
  },
  {
    label: "LITEPAPER",
    items: [
      {
        label: "English",
        link: "/",
      },
      {
        label: "Korean",
        link: "/",
      },
      {
        label: "Vietnamese",
        link: "/",
      },
      {
        label: "Japanese",
        link: "/",
      },
    ],
  },
  {
    label: "PITCHDECK",
    items: [
      {
        label: "English",
        link: "/",
      },
      {
        label: "Korean",
        link: "/",
      },
      {
        label: "Vietnamese",
        link: "/",
      },
      {
        label: "Japanese",
        link: "/",
      },
    ],
  },
  {
    label: "INFORMATION",
    items: [
      {
        label: "Medium",
        link: ""
      },
      {
        label: "Twitter",
        link: ""
      },
    ],
  },
  {
    label: "TERM_OF_SERVICE",
    link: "/",
  },
  {
    label: "PRIMARY_POLICY",
    link: "/",
  },
];

export default function HeaderHome() {
  const { setting } = useSelector((state) => state);
  const { library } = setting;
  const isTablet = useResponsive(`down`, `md`);

  const [scrollPositionToggle, setScrollPositionToggle] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const scroll = (id) => {
    const section = document.querySelector(`${id}`);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleOpen = () => {
    setShowSidebar(true);
  };

  const handleClose = () => {
    setShowSidebar(false);
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position > 75) {
      setScrollPositionToggle(true);
    } else {
      setScrollPositionToggle(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Header>
        <Container
          maxWidth={"xl"}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
          className={scrollPositionToggle ? "sticky-scroll" : ""}
        >
          <Navbar>
            <Box component={Link} to="/" className="logo">
              <Box
                component="img"
                src="/logo.png"
                alt=""
              />
            </Box>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <Hidden lgDown>
                {AppConfig?.mainMenus?.map((menu, index) => (
                  <Link to={menu.link} key={index}>
                    {library[menu.label]}
                  </Link>
                ))}
                {config.map((item, index) => {
                  if (item.link.indexOf("#") <= -1) {
                    return (
                      <Link
                        to={item.link}
                        key={index}
                        className={item.customStyle || ""}
                      >
                        {library[item.label]}
                        {item.icon}
                      </Link>
                    );
                  } else
                    return (
                      <Link
                        to={item.link}
                        onClick={() => {
                          scroll(item);
                        }}
                        key={index}
                      // className={indexTag === item ? "active" : ""}
                      >
                        {library[item.label]}
                      </Link>
                    );
                })}
                <div>
                  <WhitePaperButton onClick={handleClick}>
                    {library.key_7}&nbsp;&nbsp;
                    <span
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: "6px solid transparent",
                        borderRight: "6px solid transparent",
                        borderTop: "6px solid #fee8e2",
                      }}
                    ></span>
                  </WhitePaperButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {whitepaper.map((item) => (
                      <MenuItem
                        key={item.url}
                        onClick={handleCloseMenu}
                        sx={{
                          "& a": {
                            color: "#0a0a0a",
                            textDecoration: "none",
                            display: "inline-flex",
                          },
                        }}
                      >
                        <a href={item.url} target="_blank" rel="noreferrer">
                          <IconLang component={"img"} src={item.icon} />
                          {item.lang}
                        </a>
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
                <ApplyButton>
                  Apply for Launchpad
                </ApplyButton>
                <Avatar src="/images/icon/icon-user.png" />
                {/* <Languages sx={{ color: "white" }} /> */}
              </Hidden>

              {/* <AccountPopover /> */}

              <Hidden lgUp>
                <IconButton
                  sx={{
                    padding: "4px",
                    marginLeft: "1.5rem",
                    "& svg": {
                      boxShadow: 'white 0 0 10px 0',
                      borderRadius: '10px',
                      background: 'white',
                      color: 'deepskyblue',
                      padding: '5px',
                    }
                  }}
                  onClick={() => {
                    handleOpen();
                  }}
                >
                  <IconMenu2 size="30px" />
                </IconButton>
              </Hidden>
            </Box>
          </Navbar>
        </Container>
      </Header>

      <Drawer open={showSidebar} anchor="right" onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            background: "url('/images/background/bg2.jpg')",
          }
        }}>
        <Box sx={{ width: isTablet ? 300 : 300, color: 'white' }} >
          <Box
            sx={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              aria-label="CLose menu list"
              onClick={handleClose}
              sx={{ color: "deepskyblue" }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Languages sx={{ "& span": { color: "#637381" } }} />
          </Box>
          <List>
            <Hidden lgUp>
              <Divider />
              {config.map((item, index) => {
                if (item.link.indexOf("#") <= -1) {
                  return (
                    <Link
                      to={item.link}
                      style={{ textDecoration: "none", color: "#212b36" }}
                      key={index}
                    >
                      <ListItemButton
                        onClick={() => {
                          handleClose();
                        }}
                        key={index}
                      >
                        <ListItemText>{library[item.label]}</ListItemText>
                      </ListItemButton>
                    </Link>
                  );
                }
                return (
                  <ListItemButton key={index}>
                    <ListItemText
                      onClick={() => {
                        scroll(item.link);
                        setTimeout(() => {
                          handleClose();
                        }, 1000);
                      }}
                    >
                      {library[item.label]}
                    </ListItemText>
                  </ListItemButton>
                );
              })}
            </Hidden>
            <Divider />

            {subMenus.map((menu, index) => (
              <SubMenu menu={menu} key={index} library={library} />
            ))}

            <Divider />
          </List>
        </Box>
      </Drawer>
    </>
  );
}

const SubMenu = ({ menu, library }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  if (menu.items) {
    return (
      <>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary={library[menu.label]} />
          {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {menu?.items?.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "unset",
                  textDecoration: "unset",
                }}
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 20,
                    }}
                  >
                    <div
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgb(145, 158, 171)",
                        transition:
                          "transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </a>
            ))}
          </List>
        </Collapse>
      </>
    );
  } else {
    return (
      <a
        href={menu.link}
        style={{ textDecoration: "none", color: "#212b36" }}
        target="_blank"
        rel="noreferrer"
      >
        <ListItemButton>
          <ListItemText primary={library[menu.label]} />
        </ListItemButton>
      </a>
    );
  }
};