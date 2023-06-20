import { Box, Container, Grid, MenuItem, Stack, Typography } from '@mui/material';
import { IconBrandTelegram } from '@tabler/icons';
import Logo from 'components/common/Logo';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EndBox, Footer, FooterTitle, MenuCustom, SocialBox, UlCustom } from '../components/footer/FooterStyles';
import { _changeLanguage } from '../store/setting/settingActions';

const aboutYouSUI = [
    {
        label: 'key_Launchpad',
        link: 'https://1wcod92hu2t.typeform.com/to/yrmuPiG6',
    },
    {
        label: 'key_Staking',
        link: '/staking',
    },
    {
        label: 'key_Swap',
        link: '/bridge',
    },
    {
        label: 'key_Bridge',
        link: '/bridge',
    },
    {
        label: 'key_marketplace',
        link: '/nft-marketplace',
    },

    // {
    // 	label: 'key_13',
    // 	link: 'https://docs.google.com/document/d/1cbvUvE28TfKMIUhxzMQgl5O_wO2eEqdhFsKr2bQ8Q0M/',
    // },
];

const joinYouSUI = [
    {
        label: 'WHITEPAPER',
        link: '/whitepaper',
    },
    {
        label: 'Branding',
        link: '/whitepaper/brand-kit-and-community',
    },
    {
        label: 'key_16',
        link: 'https://1wcod92hu2t.typeform.com/to/yrmuPiG6',
    },
    {
        label: 'key_17',
        link: 'https://1wcod92hu2t.typeform.com/to/yrmuPiG6',
    },
    {
        label: 'key_Terms',
        link: 'https://docs.google.com/document/d/1RRO6w77nJyHE7LwGwLsSgr4GKcuMVSwQ6DinGnDi96s/',
    },
];

export const socials = [
    {
        src: '/images/icon/icon-medium.png',
        link: 'https://medium.com/@YouSUI',
    },
    {
        src: '/images/icon/icon-twitter.png',
        link: 'https://twitter.com/YouSUI_Global',
    },
    {
        src: '/images/icon/icon-discord.png',
        link: 'https://discord.com/invite/yousui',
    },
    {
        src: '/images/icon/icon-telegram.png',
        link: '',
    },
];

export default function FooterSection() {
    const dispatch = useDispatch();
    const { setting } = useSelector((state) => state);
    const { library } = setting;

    useEffect(() => {
        dispatch(_changeLanguage(localStorage.getItem('lang')));
    }, [dispatch]);

    return (
        <Footer id="contact">
            <Container maxWidth={'xl'}>
                <Grid container spacing={2}>
                    <Grid item sm={12} md={5}>
                        <Stack>
                            <Logo
                                sx={{
                                    width: { lg: 220, md: '160px', sm: '200px', xs: '200px' },
                                    transform: { md: 'translateY(-50px)', sm: 0 },
                                }}
                            />
                        </Stack>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: '0.95rem',
                                padding: { xs: '0', md: '0 20% 0 3%' },
                                transform: { md: 'translateY(-70px)', xs: 'translateY(-20px)' },
                            }}
                        >
                            YouSUI is an All-In-One platform running on the Sui Network, featuring a comprehensive suite of services
                            including a decentralized exchange (DEX), Launchpad, NFT marketplace, social platform, and bridge.
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2.5}>
                        <FooterTitle>{library.key_10}</FooterTitle>

                        <UlCustom>
                            {aboutYouSUI.map((item) => (
                                <li key={item.label}>
                                    <a href={item.link}>{library[item.label]}</a>
                                </li>
                            ))}
                        </UlCustom>
                    </Grid>

                    <Grid item xs={6} sm={4} md={2.5}>
                        <FooterTitle>{library.key_14}</FooterTitle>

                        <UlCustom>
                            {joinYouSUI.map((item) => (
                                <li key={item.label}>
                                    <a href={item.link} target="_blank" rel="noreferrer">
                                        {library[item.label]}
                                    </a>
                                </li>
                            ))}
                        </UlCustom>
                    </Grid>

                    <Grid item xs={12} sm={4} md={2}>
                        <FooterTitle>{library.key_9}</FooterTitle>
                        <a
                            href="mailto:business@yousui.io"
                            target="_blank"
                            rel="noreferrer"
                            style={{ fontSize: '1.125rem', textDecoration: 'underline', fontStyle: 'italic' }}
                        >
                            business@yousui.io
                        </a>
                        <FooterTitle mt={3}>{library.key_20}</FooterTitle>
                        <SocialFooter sx={{ justifyContent: 'flex-start' }} />

                        {/* <FooterTitle mt={3}>{library.key_21}</FooterTitle>
						<GetIntoButton>Get into Social Platform</GetIntoButton> */}
                    </Grid>
                </Grid>
            </Container>
            <EndBox>
                <Typography>Copyright © 2023 | All Rights Reserved</Typography>
            </EndBox>
        </Footer>
    );
}
export const SocialFooter = ({ sx }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    return (
        <SocialBox sx={sx}>
            {socials.map((item, index) =>
                item.link ? (
                    <Box key={index} component="a" href={item.link} target={'_blank'}>
                        <Box component="img" src={item.src} />
                    </Box>
                ) : (
                    <Box key={index} component="a" onClick={handleClick} sx={{ cursor: 'pointer' }}>
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
    );
};
