import { Box, Container, Stack, Typography } from '@mui/material';
import { Tier1 } from 'components/staking-layer-box';
import { Tier2n3 } from 'components/staking-layer-box/tier2n3';
import { Tier4n5 } from 'components/staking-layer-box/tier4n5';
import useResponsive from '../../hooks/useResponsive';
import { ImgTitleBox, SectionBox, TitleBox, TypographyGradient } from './HomeStyles';
export default function StakingTier() {
    const isDesktop = useResponsive('up', 'md');

    return (
        <SectionBox
            sx={{
                backgroundImage: "url('/images/background/homebg5.png')",
            }}
        >
            <Container maxWidth={'xl'}>
                <Box mb={5} sx={{ position: 'relative' }}>
                    <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
                    <TitleBox>
                        <Typography>Staking</Typography>
                        <TypographyGradient>Tier</TypographyGradient>
                    </TitleBox>
                </Box>
                <Stack direction="row" sx={{ width: '100%' }} spacing={3}>
                    <Tier1 />

                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Tier2n3 tier="Tier 2" stakingAmount="40.000" />
                        <Tier2n3 tier="Tier 3" stakingAmount="15.000" />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Tier4n5 tier="Tier 3" stakingAmount="10.000" />
                        <Tier4n5 tier="Tier 4" stakingAmount="3.000" />
                    </Box>
                </Stack>
            </Container>
        </SectionBox>
    );
}
