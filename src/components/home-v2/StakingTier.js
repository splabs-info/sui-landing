import { Box, Button, Container, Stack, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Tier1 } from 'components/staking-layer-box';
import { Tier2n3 } from 'components/staking-layer-box/tier2n3';
import { Tier4n5 } from 'components/staking-layer-box/tier4n5';
import { useNavigate } from 'react-router-dom';
import { ImgTitleBox, SectionBox, TitleBox, TypographyGradient } from './HomeStyles';

const StakingBtn = styled(Button)(({ theme }) => ({
    background:
        'linear-gradient(90deg, rgba(129, 236, 197, 0.7) 0%, rgba(148, 203, 255, 0.7) 50%, rgba(133, 150, 255, 0.7) 96.35%)',
    borderRadius: '50px',
    boxShadow: 'inset 0px 0px 30px rgba(255, 255, 255, 0.3)',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
    paddingRight: 16,
    paddingLeft: 14,
    marginTop: 16,
    display: 'flex',
    justifyContent: 'flex-end',

}));

export default function StakingTier() {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.down(1400));
    const navigate = useNavigate();

    return (
        <SectionBox
            sx={{
                backgroundImage: "url('/images/background/homebg4.png')",
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
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                    <StakingBtn onClick={() => navigate('/staking')}>
                        <img
                            src="/YouSUI-token.png"
                            alt="token"
                            style={{
                                width: 24,
                                height: 24,
                            }}
                        />
                        Staking now
                    </StakingBtn>
                </Box>
            </Container>
        </SectionBox>
    );
}
