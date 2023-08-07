import { Box, Stack, Typography, styled } from '@mui/material';
import { IDOCountdown } from 'components/countdown/IDOCountdown';
import { SocialBox } from 'components/footer/FooterStyles';
import { RELEAP_PROJECT_NAME } from 'onchain/constants';
import React from 'react';
import { ImageBox, RoundInfoBox, TitleBackgroundBox } from './RoundStyled';
const CountDownBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '0px 16px',
}));

const info = {
    title: 'XUI - YouSUI Token',
    description:
        '$XUI is a utility token of the YouSUI platform that can be used in Launchpad, DEX, Cross Chain Swap, Bridge, and NFT Marketplace. YouSUI governance determines the direction of the community and is directly used for voting or governance to make reasonable decisions. By staking $XUI, the community can give their opinions or make suggestions to the community. When users stake $XUI, they are given a "Tier" to participate in IDO and INO Launchpad. A portion of the revenue generated from using DEX, NFT Marketplace and Bridge goes to $XUI stakers, and the rest goes to $XUI "Burn and Buyback".',
};

const socials = [
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
        src: '/images/icon/icon-wpp.png',
        link: '/whitepaper',
    },
];

export const RoundIntro = ({
    medium,
    twitter,
    discord,
    telegram,
    startAt,
    roundName,
    description,
    imageUrl,
    projectName,
}) => {
    const renderRoundTitle = React.useCallback(() => {
        if (projectName === RELEAP_PROJECT_NAME) {
            return 'Releap Protocol';
        } else {
            return 'XUI - YouSUI Token';
        }
    }, [projectName]);

    const renderSocial = React.useCallback(() => {
        if (projectName === RELEAP_PROJECT_NAME) {
            return (
                <>
                    <Box component="a" href={medium} target={'_blank'}>
                        <img component="img" src="/images/icon/icon-medium.png" alt="" />
                    </Box>
                    <Box component="a" href={twitter} target={'_blank'}>
                        <img component="img" src="/images/icon/icon-twitter.png" alt="" />
                    </Box>
                    <Box component="a" href={discord} target={'_blank'}>
                        <img component="img" src="/images/icon/icon-discord.png" alt="" />
                    </Box>
                    <Box component="a" href="https://docs.releap.xyz/introduction/overview" target={'_blank'}>
                        <img component="img" src="/images/icon/icon-wpp.png" alt="" />
                    </Box>
                </>
            );
        } else {
            return (
                <>
                    {socials.map((item, index) => (
                        <Box key={index} component="a" href={item.link} target={'_blank'}>
                            <Box component="img" src={item.src} />
                        </Box>
                    ))}
                </>
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderCountDown = React.useCallback(() => {
        if (projectName === RELEAP_PROJECT_NAME) {
            return (
                <>
                    <Typography sx={{ fontSize: 18, color: '#1FD8D1', textAlign: 'center' }} mt={2}>
                        Start After
                    </Typography>

                    <Box
                        mb={13}
                        sx={{
                            position: 'relative',
                        }}
                    >
                        {startAt && roundName === 'Public_Sale' ? (
                            <CountDownBox>
                                <IDOCountdown endTime={'2023-08-08T12:30:00'} />
                            </CountDownBox>
                        ) : (
                            <CountDownBox>
                                <IDOCountdown endTime={'2023-08-07T12:00:00'} />
                            </CountDownBox>
                        )}
                    </Box>
                </>
            );
        } else return;
    }, [projectName, roundName, startAt]);

    return (
        <RoundInfoBox>
            <ImageBox>
                {imageUrl ? (
                    <a target="_blank" href="https://releap.xyz/" rel="noreferrer">
                        <img src={imageUrl} alt="" />
                    </a>
                ) : (
                    <img src={'/images/staking/water-seek.jpg'} alt="" />
                )}

                {imageUrl ? '' : <img src="/logo-1.png" alt="" width={200} className="absolute" />}
            </ImageBox>
            {renderCountDown()}

            <Stack direction="row" spacing={2} justifyContent={'space-between'} alignItems={'center'} my={3}>
                <TitleBackgroundBox>
                    <Typography variant="h5">{renderRoundTitle()}</Typography>
                </TitleBackgroundBox>
                <SocialBox>{renderSocial()}</SocialBox>
            </Stack>
            <Typography variant="body2" lineHeight={2}>
                {description ? description : info.description}
            </Typography>
        </RoundInfoBox>
    );
};
