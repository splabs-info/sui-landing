import { Typography, Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
const StyledPooName = styled(Typography)(({ theme }) => ({
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: '44px',
    marginBottom: 24,
}));

const Description = styled(Typography)(({ theme }) => ({
    fontSize: 20,
    lineHeight: '27px',
    color: 'white',
    width: '50%',
    marginBottom: 16,
}));

const SocialNetworkArea = styled(Box)(({ theme }) => ({}));

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

export const PoolName = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <Box>
            <StyledPooName>A PJT</StyledPooName>
            <Description>
                A is the easiest and fastest way to approach for developers who want to experime Web3, enabling the best
                addition of blockchain features to their games in a few minutes for the future of gaming…
            </Description>
            <SocialNetworkArea>
                <Stack direction="row" spacing={2}>
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
                </Stack>
            </SocialNetworkArea>
        </Box>
    );
};
