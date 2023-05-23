import { Box, Grid, MenuItem, Typography } from '@mui/material';
import { TitleSection } from 'components/my-profile/TitleSection';
import { PoolInformationCard } from './PoolInfoCard';
import { TokenInformationCard } from './TokenInfoCard';
import { MenuCustom, SocialBox } from 'components/footer/FooterStyles';
import { socials } from 'layouts/Footer-v2';
import { IconBrandTelegram } from '@tabler/icons';
import { useState } from 'react';
export const PoolInformation = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <Grid container spacing={5} justifyContent="space-between" sx={{ marginBottom: 10 }}>
            <Grid sx={{ width: '100%', '& a': { marginRight: '16px' } }} xs={12} item>
                <Typography variant='h3' color={'white'} mb={3}>YOUSUI PJT</Typography>
                <Typography variant='body1' color={'white'} mb={3}>A is the easiest and fastest way to approach for developers who want to experime Web3, enabling the best addition of blockchain features to their games in a few minutes for the future of gaming…</Typography>

                <SocialBox>
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
            </Grid>
            <Grid sx={{ width: '100%' }} md={6} sm={12} item>
                <TitleSection title="POOL INFORMATION" />
                <PoolInformationCard />
            </Grid>
            <Grid sx={{ width: '100%' }} md={6} sm={12} item>
                <TitleSection title="TOKEN INFORMATION" />
                <TokenInformationCard />
            </Grid>
        </Grid>
    );
};
