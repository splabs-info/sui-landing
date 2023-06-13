import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
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
  MenuItem,
} from '@mui/material';
import { IconBrandTelegram, IconMenu2 } from '@tabler/icons';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Header, Navbar } from '../components/header/HeaderStyles';
// import { ConnectPopup } from '../components/wallet/connect-popup';
import { useWallet } from '@suiet/wallet-kit';
import Logo from 'components/common/Logo';
import { WalletDrawer } from 'components/drawer';
import { MenuCustom, SocialBox } from 'components/footer/FooterStyles';
import { WalletContext } from '../hooks/use-connect';
import useResponsive from '../hooks/useResponsive';
import { AppConfig } from '../setting';
// import Languages from './Languages';
import EmailIcon from '@mui/icons-material/Email';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FrameButton } from 'components/home/HomeStyles';
const config = [
  { label: 'key_2', link: '/ido-launchpad' },
  { label: 'key_3', link: '/ino-launchpad' },
  { label: 'key_4', link: '/staking' },
  // { label: 'key_5', link: '/claim-tokens' },
  { label: 'key_6', link: '/coming-soon' },
  { label: 'key_Bridge', link: '/bridge' },
  { label: 'key_marketplace', link: '/coming-soon' },
  { label: 'key_crew3', link: 'https://zealy.io/c/yousui' },
];

const socials = [
  {
    src: '/images/icon/logo-medium.svg',
    link: 'https://medium.com/@YouSUI',
  },
  {
    src: '/images/icon/logo-twitter.svg',
    link: 'https://twitter.com/YouSUI_Global',
  },
  {
    src: '/images/icon/logo-discord.svg',
    link: 'https://discord.com/invite/yousui',
  },
  {
    src: '/images/icon/tele.svg',
    link: '',
  },
];

const StyledBtnBorderGreen = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(180deg, rgba(104, 229, 184, 0.3) 0%, rgba(109, 133, 218, 0.3) 100%)',
  borderRadius: '50px',
  fontWeight: 'bold',
  fontSize: 14,
  color: 'rgba(255, 255, 255, 1)',
  padding: '8px 18px',
  maxHeight: '40px',
  '::before': {
    content: "''",
    position: 'absolute',
    background: 'linear-gradient(180deg, rgba(104, 229, 184, 1) 0%, rgba(109, 133, 218, 1) 100%)',
    inset: '0px',
    zIndex: 1,
    borderRadius: '50px',
    padding: '2px',
    '-webkit-mask':
      'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box,linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
    '-webkit-mask-composite': 'xor',
  },
}));

const CustomLink = styled('a')(({ theme }) => ({
  margin: '0 !important',
  color: 'rgba(255, 255, 255, 1)',
  textDecoration: 'none',
  '-webkit-text-fill-color': 'rgba(255, 255, 255, 1) !important',
  '&:hover': { color: 'rgba(255, 255, 255, 1) !important' },
}));

export default function HeaderHome() {
  const { address } = useContext(WalletContext);
  const wallet = useWallet();
  const { setting } = useSelector((state) => state);
  const { library } = setting;
  const isTablet = useResponsive(`down`, `md`);
  const [openConnectPopup, setOpenConnectPopup] = useState();
  const [walletAddress, setWallet] = useState();
  const [openWalletDrawer, setOpenWalletDrawer] = useState();
  const [scrollPositionToggle, setScrollPositionToggle] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const isDesktop = useResponsive('up', 'md');

  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const scroll = (id) => {
    const section = document.querySelector(`${id}`);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleOpenDrawer = () => {
    setOpenWalletDrawer(true);
  };

  const handleOpen = () => {
    setShowSidebar(true);
  };

  const handleClose = () => {
    setShowSidebar(false);
  };

  const [prevScrollpos, setPrevScrollpos] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position > 75) {
      setScrollPositionToggle(true);
    } else {
      setScrollPositionToggle(false);
    }
    const header = window.document.getElementById('header');
    if (prevScrollpos > position) {
      if (header !== null) header.style.top = '0';
    } else {
      if (header !== null) header.style.top = '-130px';
    }
    setPrevScrollpos(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevScrollpos]);

  const handleOpenConnectPopup = () => setOpenWalletDrawer(true);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (address || wallet?.address || !wallet?.connected || wallet?.status === 'disconnected') {
      setWallet(address || wallet?.address);
      setOpenConnectPopup(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, wallet?.address]);

  const activeRoute = '/coming-soons';

  const MenuHeaderBox = () => (
    <>
      {AppConfig?.mainMenus?.map((menu, index) => (
        <Link to={menu.link} key={index}>
          {library[menu.label]}
        </Link>
      ))}
      {config.map((item, index) => {
        if (item.link.indexOf('#') <= -1) {
          return (
            <Box
              id={item.id}
              key={item.id}
              className={`${item.link === activeRoute ? 'active' : ''}`}
              sx={{
                display: 'flex',
                alignSelf: 'stretch',
                alignItems: 'center',
                textTransform: 'uppercase',
                fontSize: '14px',
              }}
            >
              {isDesktop && library[item.label] === 'Crew3' ? (
                <></>
              ) : (
                <NavLink to={item.link} key={index} className={item.customStyle || ''}>
                  {library[item.label]}
                  {item.icon}
                </NavLink>
              )}
            </Box>
          );
        } else
          return (
            <NavLink
              to={item.link}
              onClick={() => {
                scroll(item);
              }}
              key={index}
              className={item.link === activeRoute ? 'active' : ''}
            >
              {library[item.label]}
            </NavLink>
          );
      })}
    </>
  );

  const SocialHeaderBox = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
      className={'socials'}
    >
      <SocialBox
        sx={{
          gap: '8px',
          '& img': {
            width: '90%',
          },
        }}
      >
        {socials.map((item, index) =>
          item.link ? (
            <Box
              key={index}
              component="a"
              href={item.link}
              target={'_blank'}
              sx={{ padding: '0px !important', margin: '0 !important' }}
            >
              <Box component="img" src={item.src} />
            </Box>
          ) : (
            <Box
              key={index}
              component="a"
              onClick={handleClick}
              sx={{
                cursor: 'pointer',
                padding: '0px !important',
                margin: '0 !important',
              }}
            >
              <Box component="img" src={item.src} />
            </Box>
          )
        )}
        <MenuCustom
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          className="Menu"
          sx={{
            background: 'transparent!important',
            border: '1px solid black',
            color: 'white',
            marginTop: '15px',
            '& a': {
              color: 'white',
              textDecoration: 'none',
            },
            '& .MuiMenu-paper': {
              background: '#0a0a0a!important',
            },
          }}
        >
          <a href="https://t.me/YouSUI" target="_blank" rel="noreferrer">
            <MenuItem onClick={handleCloseMenu}>
              <IconBrandTelegram /> YouSUI Official{' '}
            </MenuItem>
          </a>
          <a href="https://t.me/YouSUIchat" target="_blank" rel="noreferrer">
            {' '}
            <MenuItem onClick={handleCloseMenu}>
              <IconBrandTelegram /> YouSUI Chat
            </MenuItem>
          </a>
        </MenuCustom>
      </SocialBox>
    </Box>
  );

  return (
    <>
      <Header sx={{ flexDirection: 'column' }} id="header">
        <Box sx={{ backgroundColor: 'rgba(11, 55, 77, 1)', width: '100%' }}>
          <Container
            maxWidth={'xl'}
            sx={{ display: 'flex', alignItems: 'center', height: 36, justifyContent: 'space-between' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ color: 'rgba(255, 255, 255, 1)', fontSize: 18, marginRight: '8px' }} />
              <a
                href="mailto:business@yousui.io"
                style={{
                  fontSize: 14,
                  color: 'rgba(255, 255, 255, 1)',
                  lineHeight: '20px',
                }}
              >
                business@yousui.io
              </a>
            </Box>
            <Box>{SocialHeaderBox()}</Box>
          </Container>
        </Box>
        <Container
          maxWidth={'xl'}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1,
          }}
          className={scrollPositionToggle ? 'sticky-scroll' : ''}
        >
          <Navbar>
            <Logo sx={{ width: { md: '120px', sm: '100px', xs: '100px', transform: 'scale(1.3)' } }} />
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: { sm: '1rem', xs: '0.5rem' },
                '& img': {
                  height: 32,
                },
              }}
            >
              <Hidden lgDown>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mr: 2,
                  }}
                >
                  <MenuHeaderBox />
                </Box>
                {!walletAddress && (
                  <FrameButton
                    onClick={handleOpenConnectPopup}
                    open={openConnectPopup}
                    sx={{ fontSize: 14, width: 140, height: 56, }}
                  >
                    Connect Wallet
                  </FrameButton>
                )}
                {/* <SocialHeaderBox /> */}
                <StyledBtnBorderGreen
                  size="large"
                  onClick={() => navigate('/my-profile')}
                >
                  My Page
                </StyledBtnBorderGreen>
                <CustomLink href="https://zealy.io/c/yousui" target="_blank" rel="noreferrer">
                  <StyledBtnBorderGreen size="large">Crew3</StyledBtnBorderGreen>
                </CustomLink>

                {walletAddress && (
                  <IconButton onClick={handleOpenDrawer} sx={{ textAlign: 'center', padding: 0 }}>
                    <Avatar src="/images/icon/icon-user.png" sx={{ borderRadius: '0', width: 32, height: 32 }} />
                  </IconButton>
                )}
                {/* <Languages sx={{ color: 'white' }} /> */}
              </Hidden>
              {/* <AccountPopover /> */}

              {/* BUTTON MENU MOBILE */}
              <Hidden lgUp>
                {walletAddress ? (
                  <IconButton onClick={handleOpenDrawer} sx={{ textAlign: 'center' }}>
                    <Avatar
                      src="/images/icon/icon-user.png"
                      sx={{ borderRadius: '0', height: 'auto', width: 'auto' }}
                    />
                  </IconButton>
                ) : (
                  <FrameButton
                    onClick={handleOpenConnectPopup}
                    open={openConnectPopup}
                    sx={{ fontSize: 14, width: 156, height: 64 }}
                  >
                    Connect Wallet
                  </FrameButton>
                )}
                <IconButton
                  sx={{
                    padding: '5px',
                    '& svg': {
                      color: '#81ECC5',
                    },
                  }}
                  onClick={() => {
                    handleOpen();
                  }}
                >
                  <IconMenu2 size="25px" />
                </IconButton>
              </Hidden>
            </Box>
          </Navbar>
        </Container>
      </Header>

      {/* MENU MOBILE */}
      <Drawer
        open={showSidebar}
        anchor="right"
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            background: 'linear-gradient(to bottom, rgba(13, 112, 216, 0.05) 0%, rgba(7, 128, 120, 0.3) 100%)',
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        <Box
          sx={{
            width: isTablet ? 320 : 300,
            color: 'white',
            '& .socials': {
              m: 2,
            },
            '& img': {
              height: 32,
            },
          }}
        >
          <Box
            sx={{
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <IconButton aria-label="CLose menu list" onClick={handleClose} sx={{ color: 'deepskyblue' }}>
              <ArrowBackIcon />
            </IconButton>
            {/* <Languages sx={{ '& span': { color: '#637381' } }} /> */}
          </Box>
          <List sx={{ color: 'white' }}>
            <Hidden lgUp>
              <Divider />
              {config.map((item, index) => {
                if (item.link.indexOf('#') <= -1) {
                  return (
                    <Link to={item.link} style={{ textDecoration: 'none' }} key={index}>
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
            <SocialHeaderBox />
          </List>
        </Box>
      </Drawer>
      <WalletDrawer
        address={walletAddress}
        open={openWalletDrawer}
        handleClose={setOpenWalletDrawer}
        disconnectSui={setWallet}
      />
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
                  color: 'unset',
                  textDecoration: 'unset',
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
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgb(145, 158, 171)',
                        transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
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
      <a href={menu.link} style={{ textDecoration: 'none', color: '#212b36' }} target="_blank" rel="noreferrer">
        <ListItemButton>
          <ListItemText primary={library[menu.label]} />
        </ListItemButton>
      </a>
    );
  }
};
