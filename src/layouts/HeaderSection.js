import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useWallet } from '@suiet/wallet-kit';
import { IconBrandTelegram, IconMenu2, IconShoppingCart } from '@tabler/icons';
import Logo from 'components/common/Logo';
import { WalletDrawer } from 'components/drawer';
import { MenuCustom, SocialBox } from 'components/footer/FooterStyles';
import { FrameButton } from 'components/home/HomeStyles';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Header, Navbar } from '../components/header/HeaderStyles';
import { WalletContext } from '../hooks/use-connect';
import useResponsive from '../hooks/useResponsive';
import NotifiHistory from 'modules/notifi-network/NotifiHistory';
import { BuyCryptoButton } from 'components/common/CustomButton';
import AlchemyPay from 'modules/alchemy-pay/AlchemyPay';

const config = [
  { label: 'key_2', link: '/ido-launchpad' },
  { label: 'key_3', link: '/ino-launchpad' },
  { label: 'key_4', link: '/staking' },
  { label: 'key_Swap', link: '/swap' },
  { label: 'key_Bridge', link: '/bridge' },
  { label: 'key_Governance', link: '/governance' },
  { label: 'key_marketplace', link: '/nft-marketplace' },
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

export default function HeaderSection() {
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
  const isMobile = useResponsive('down', 'sm');

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
      const header = window.document.getElementById('header');
      if (prevScrollpos > position) {
        if (header !== null) header.style.top = '0';
      } else {
        if (header !== null) header.style.top = '-130px';
      }
      setPrevScrollpos(position);
    } else {
      setScrollPositionToggle(false);
    }
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

  const activeRoute = useLocation().pathname;

  const MenuHeaderBox = () => (
    <>
      {config.map((item, index) => (
        <Box
          id={item.id}
          key={index}
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
            <NavLink to={item.link} key={index} className={`${item.link === activeRoute ? 'animatedText' : ''}`}>
              {library[item.label]}
              {item.icon}
            </NavLink>
          )}
        </Box>
      ))}
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

  const NotifiBox = () => (
    <></>
    // <NotifiHistory />
  );
  const BuyCrypto = () => (
    <>
      <AlchemyPay />
    </>
  );

  return (
    <>
      <Header sx={{ flexDirection: 'column' }} id="header">
        <Box sx={{ backgroundColor: 'rgba(11, 55, 77, 1)', width: '100%' }}>
          <Container
            maxWidth={'xl'}
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 36,
              justifyContent: 'space-between',
            }}
          >
            {isMobile ? (
              <BuyCrypto />
            ) : (
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
            )}
            <Stack direction="row" gap={2}>
              <Hidden smDown>
                <BuyCrypto />
              </Hidden>
              {SocialHeaderBox()}
            </Stack>
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
                gap: { sm: '10px', xs: '6px' },
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
                    sx={{ fontSize: 14, width: 140, height: 56 }}
                  >
                    Connect Wallet
                  </FrameButton>
                )}
                <StyledBtnBorderGreen size="large" onClick={() => navigate('/my-profile')}>
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
                <NotifiBox />
              </Hidden>

              <Hidden lgUp>
                {walletAddress ? (
                  <>
                    <IconButton onClick={handleOpenDrawer} sx={{ textAlign: 'center' }}>
                      <Avatar
                        src="/images/icon/icon-user.png"
                        sx={{ borderRadius: '0', height: 'auto', width: 'auto' }}
                      />
                    </IconButton>
                    <NotifiBox />
                  </>
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
