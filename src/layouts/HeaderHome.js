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
import { Link } from 'react-router-dom';
import { subMenus } from 'static/subMenus';
import { ApplyButton, Header, Navbar } from '../components/header/HeaderStyles';
// import { ConnectPopup } from '../components/wallet/connect-popup';
import { CreateProfilePopup } from 'components';
import { WalletDrawer } from 'components/drawer';
import { WalletContext } from '../hooks/use-connect';
import useResponsive from '../hooks/useResponsive';
import { AppConfig } from '../setting';
import Languages from './Languages';
import { socials } from './Footer-v2';
import { MenuCustom, SocialBox } from 'components/footer/FooterStyles';
const config = [
    { label: 'key_1', link: '/' },
    { label: 'key_2', link: '/coming-soons' },
    { label: 'key_3', link: '/coming-soon' },
    { label: 'key_4', link: '/coming-soon' },
    { label: 'key_5', link: '/coming-soon' },
    { label: 'key_6', link: '/coming-soon' },
];

export default function HeaderHome() {
    const { address } = useContext(WalletContext);
    const { setting } = useSelector((state) => state);
    const { library } = setting;
    const isTablet = useResponsive(`down`, `md`);
    const [openConnectPopup, setOpenConnectPopup] = useState();
    const [wallet, setWallet] = useState();
    const [openCreateProfile, setOpenCreateProfile] = useState();

    const [openWalletDrawer, setOpenWalletDrawer] = useState();
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

    const handleScroll = () => {
        const position = window.pageYOffset;
        if (position > 75) {
            setScrollPositionToggle(true);
        } else {
            setScrollPositionToggle(false);
        }
    };

    const handleOpenConnectPopup = () => setOpenWalletDrawer(true);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // console.log('address', address);
        // console.log('wallet', wallet);
        if (address) {
            setWallet(address);
            setOpenConnectPopup(false);
        }
    }, [address]);

    const activeRoute = '/coming-soons';

    return (
        <>
            <Header>
                <Box
                    sx={{
                        position: 'absolute',
                        zIndex: 0,
                        opacity: 0.3,
                        transform: 'matrix(1, 0, 0, -1, 0, 0)',
                        width: '100%',
                        height: '100%',
                    }}
                ></Box>
                <Container
                    maxWidth={'xl'}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 1,
                    }}
                    className={scrollPositionToggle ? 'sticky-scroll' : ''}
                >
                    <Navbar
                        sx={{
                            '& .active': {
                                background: 'linear-gradient(270deg, #EACCF8 0%, #96E0DA 100%)',
                                backgroundClip: 'text',
                                textFillColor: 'transparent',
                                position: 'relative',
                            },
                            '& .active::before': {
                                content: '" "',
                                position: 'absolute',
                                width: '100%',
                                height: '3px',
                                background: 'linear-gradient(270deg, #EACCF8 0%, #96E0DA 100%)',
                                bottom: -8,
                            },
                            '& a': {
                                fontWeight: 700,
                            },
                        }}
                    >
                        <Box component={Link} to="/" className="logo">
                            <Box component="img" src="/logo.png" alt="" />
                        </Box>
                        <Box
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                            }}
                        >
                            <Hidden lgDown>
                                {AppConfig?.mainMenus?.map((menu, index) => (
                                    <Link to={menu.link} key={index}>
                                        {library[menu.label]}
                                    </Link>
                                ))}
                                {config.map((item, index) => {
                                    if (item.link.indexOf('#') <= -1) {
                                        return (
                                            <Box
                                                className={`${item.link === activeRoute ? 'active' : ''}`}
                                                sx={{
                                                    display: 'flex',
                                                    alignSelf: 'stretch',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Link to={item.link} key={index} className={item.customStyle || ''}>
                                                    {library[item.label]}
                                                    {item.icon}
                                                </Link>
                                            </Box>
                                        );
                                    } else
                                        return (
                                            <Link
                                                to={item.link}
                                                onClick={() => {
                                                    scroll(item);
                                                }}
                                                key={index}
                                                className={item.link === activeRoute ? 'active' : ''}
                                            >
                                                {library[item.label]}
                                            </Link>
                                        );
                                })}
                                {/* <div>
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
                </div> */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1.18rem',
                                        marginLeft: '8rem',
                                    }}
                                >
                                    {wallet ? (
                                        <>
                                            {/* <IconButton onClick={handleOpenDrawer}>
                                            <Avatar src="/images/icon/icon-user.png" />
                                        </IconButton> */}
                                            {/* <Web3Button /> */}
                                            {/* <Button onClick={() => setOpenCreateProfile(!openCreateProfile)}>
                                            create profile test button
                                        </Button> */}
                                        </>
                                    ) : (
                                        // <Typography sx={{ color: 'white', fontSize: 14 }}>{address}</Typography>
                                        <>
                                            {/* <Button onClick={() => setOpenCreateProfile(!openCreateProfile)}>
                                            create profile test button
                                        </Button> */}
                                            <ApplyButton
                                                sx={{ margin: 0 }}
                                                onClick={handleOpenConnectPopup}
                                                open={openConnectPopup}
                                            >
                                                Connect Wallet
                                            </ApplyButton>
                                            {/* <Web3Button /> */}
                                        </>
                                    )}

                                    <SocialBox sx={{ gap: '1.18rem' }}>
                                        {socials.map((item, index) =>
                                            item.link ? (
                                                <Box
                                                    className="ádasd"
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
                                    <IconButton onClick={handleOpenDrawer} sx={{ textAlign: 'center' }}>
                                        <Avatar src="/images/icon/icon-person-sui.png" sx={{ borderRadius: '0' }} />
                                    </IconButton>

                                    <Languages sx={{ color: 'white' }} />
                                </Box>
                            </Hidden>

                            {/* <AccountPopover /> */}

                            <Hidden lgUp>
                                <IconButton
                                    sx={{
                                        padding: '4px',
                                        marginLeft: '1.5rem',
                                        '& svg': {
                                            color: 'aqua',
                                        },
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
            <Drawer
                open={showSidebar}
                anchor="right"
                onClose={handleClose}
                sx={{
                    '& .MuiPaper-root': {
                        background: "url('/images/background/bg2.jpg')",
                    },
                }}
            >
                <Box sx={{ width: isTablet ? 300 : 300, color: 'white' }}>
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
                        <Languages sx={{ '& span': { color: '#637381' } }} />
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

                        {subMenus.map((menu, index) => (
                            <SubMenu menu={menu} key={index} library={library} />
                        ))}

                        <Divider />
                    </List>
                </Box>
            </Drawer>

            {/* <ConnectPopup open={openConnectPopup} handleClose={setOpenConnectPopup} /> */}
            <CreateProfilePopup open={openCreateProfile} handleClose={setOpenCreateProfile} />
            {/* <WalletDrawer address={wallet} open={openWalletDrawer} handleClose={setOpenWalletDrawer} /> */}
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
