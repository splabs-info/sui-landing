/* eslint-disable jsx-a11y/alt-text */
import { Box, Grid, Stack, Typography } from '@mui/material';
import { BorderGradientButton } from 'components/common/CustomButton';
import { GradientShadowTypography, ShadowTypography } from 'components/common/CustomTypography';
import { ProcessBarBox } from 'components/common/ProcessBarBox';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { useNavigate } from 'react-router-dom';


export default function ClaimTokens() {
    const isMobile = useResponsive('down', 'sm');

    const navigate = useNavigate();
    return (
        <Box mb={20} mt={10} position="relative">
            <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
            <TitleBox>
                <Typography >Claim</Typography>
                <TypographyGradient >your IDO tokens</TypographyGradient>
            </TitleBox>

            <Grid container alignItems={'center'} spacing={5}>
                <Grid item md={5} xs={12} sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={'/images/ino/nft.png'} style={{ width: 'min(400px, 100%)', height: '100%' }} alt="" />
                </Grid>
                <Grid item md={7} xs={12}>

                    <Stack spacing={1.5} alignItems={'center'} sx={{ marginTop: isMobile ? '24px' : '24px' }}>
                        <BorderGradientButton
                            onClick={() => navigate('/ino-launchpad/free-minting-nft')}
                            sx={{

                            }}
                        >
                            JOIN NOW
                        </BorderGradientButton>
                    </Stack>

                </Grid>
            </Grid>
        </Box>
    );
}
