import { Box, Stack, Typography } from "@mui/material";
import { ImageBox, RoundInfoBox, TitleBackgroundBox } from "./RoundStyled";
import { SocialBox } from "components/footer/FooterStyles";


const info = {
    title: 'XUI - YouSUI Token',
    description: '$XUI is a utility token of the YouSUI platform that can be used in Launchpad, DEX, Cross Chain Swap, Bridge, and NFT Marketplace. YouSUI governance determines the direction of the community and is directly used for voting or governance to make reasonable decisions. By staking $XUI, the community can give their opinions or make suggestions to the community. When users stake $XUI, they are given a "Tier" to participate in IDO and INO Launchpad. A portion of the revenue generated from using DEX, NFT Marketplace and Bridge goes to $XUI stakers, and the rest goes to $XUI "Burn and Buyback".',
}

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
export const RoundIntro = () => {
    return (
        <RoundInfoBox>
            <ImageBox>
                <img
                    src={'/images/staking/water-seek.jpg'}
                    alt=""
                />
                <img src='/logo-1.png' alt='' width={200} className='absolute' />
            </ImageBox>
            <Stack direction='row' spacing={2} justifyContent={'space-between'} alignItems={'center'} my={3}>

                <TitleBackgroundBox>
                    <Typography variant="h5" >{info.title}</Typography>
                </TitleBackgroundBox>
                <SocialBox>
                    {socials.map((item, index) =>
                        <Box key={index} component="a" href={item.link} target={'_blank'}>
                            <Box component="img" src={item.src} />
                        </Box>

                    )}</SocialBox>
            </Stack>
            <Typography variant="body2" lineHeight={2}>{info.description}</Typography>

        </RoundInfoBox>
    );
};
