import { Stack, Typography } from "@mui/material";
import { ImageBox, RoundInfoBox } from "./RoundStyled";


const info = {
    title: 'XUI - YouSUIToken',
    description: '$XUI is a utility token of the YouSUI platform that can be used in Launchpad, DEX, Cross Chain Swap, Bridge, and NFT Marketplace. YouSUI governance determines the direction of the community and is directly used for voting or governance to make reasonable decisions. By staking $XUI, the community can give their opinions or make suggestions to the community. When users stake $XUI, they are given a "Tier" to participate in IDO and INO Launchpad. A portion of the revenue generated from using DEX, NFT Marketplace and Bridge goes to $XUI stakers, and the rest goes to $XUI "Burn and Buyback".',
}

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
            <Stack direction='column' spacing={2} justifyContent={'space-between'} my={3}>
                <Typography variant="h5">{info.title}</Typography>
            </Stack>
            <Typography variant="body2" lineHeight={1.8}>{info.description}</Typography>

        </RoundInfoBox>
    );
};
