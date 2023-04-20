import { Box, Button, Container, Stack, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Tier1 } from 'components/staking-layer-box';
import { Tier2n3 } from 'components/staking-layer-box/tier2n3';
import { Tier4n5 } from 'components/staking-layer-box/tier4n5';
import { ImgTitleBox, SectionBox, TitleBox, TypographyGradient } from './HomeStyles';

const StakingBtn = styled(Button)(({ theme }) => ({}));
export default function StakingTier() {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.down(1400));
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
                <Stack
                    direction={isDesktop ? 'column' : 'row'}
                    sx={{ width: '100%', alignItems: isDesktop ? 'center' : '' }}
                    spacing={3}
                >
                    <Tier1 />

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            [theme.breakpoints.down(1400)]: {
                                width: '60%',
                            },
                            [theme.breakpoints.down(1200)]: {
                                width: '80%',
                            },
                            [theme.breakpoints.down(900)]: {
                                width: '100%',
                            },
                        }}
                    >
                        <Tier2n3
                            tier="Tier 2"
                            stakingAmount="40.000"
                            logo="tier-2.png"
                            sx={{
                                [theme.breakpoints.down(1400)]: {
                                    marginBottom: '24px',
                                },
                            }}
                        />
                        <Tier2n3 tier="Tier 3" stakingAmount="15.000" logo="tier-3.png" />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            [theme.breakpoints.down(1400)]: {
                                width: '60%',
                            },
                            [theme.breakpoints.down(1200)]: {
                                width: '80%',
                            },
                            [theme.breakpoints.down(900)]: {
                                width: '100%',
                            },
                        }}
                    >
                        <Tier4n5
                            tier="Tier 4"
                            stakingAmount="10.000"
                            logo="tier-4.png"
                            sx={{
                                [theme.breakpoints.down(1400)]: {
                                    marginBottom: '24px',
                                },
                            }}
                        />
                        <Tier4n5 tier="Tier 5" stakingAmount="3.000" logo="tier-5.png" />
                    </Box>
                </Stack>
                {/* <StakingBtn>Staking now</StakingBtn> */}
            </Container>
        </SectionBox>
    );
}
