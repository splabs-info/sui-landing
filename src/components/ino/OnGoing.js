/* eslint-disable jsx-a11y/alt-text */
import { Box, Grid, Stack, Typography } from '@mui/material';
import { JsonRpcProvider, devnetConnection } from '@mysten/sui.js';
import { BorderGradientButton } from 'components/common/CustomButton';
import { GradientShadowTypography, ShadowTypography } from 'components/common/CustomTypography';
import { ProcessBarBox } from 'components/common/ProcessBarBox';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { addresses } from 'modules/free-minting/FreeMinting';
import { SuiContext } from 'provider/SuiProvider';
import { FreeMintingHelper } from 'modules/free-minting/init';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConnect } from 'wagmi';
import React from 'react';
import { INOCard } from './UpComingCard';
import { OnGoingCard } from './OnGoingCard';

const provider = new JsonRpcProvider(devnetConnection);
export default function OnGoing({ projects }) {
  const isMobile = useResponsive('down', 'sm');
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [minted, setMinted] = useState(0);

  useEffect(() => {
    if (provider) {
      (async () => {
        const result = await provider.getObject({
          id: FreeMintingHelper.config.addresses.objectFreeMint,
          options: { showContent: true },
        });
        setTotal(result?.data?.content?.fields?.max_number);
        setMinted(result?.data?.content?.fields?.number);
      })();
    }
  }, []);
  return (
    <Box mb={20} mt={10} position="relative">
      <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
      <TitleBox>
        <Typography>On-going</Typography>
        <TypographyGradient>INOs</TypographyGradient>
      </TitleBox>
      <Stack sx={{ gap: 2, m: 3, width: 'max-content' }}>
        {projects?.map((item, index) => (
          <OnGoingCard
            {...item}
            key={index}
          />
        ))}
      </Stack>
      {/* <Box
        sx={{
          background: 'linear-gradient(323.96deg, rgba(45, 126, 200, 0.1) 0%, rgba(181, 255, 211, 0.1) 89.18%)',
          boxShadow: 'inset 0px 0px 30px rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(25px)',
          borderRadius: isMobile ? '10px' : '15px',
          padding: isMobile ? '32px' : '64px',
          mt: isMobile ? 5 : 7,
          '& img': { padding: isMobile ? '0 10%' : '0' },
        }}
      >
        <Grid container alignItems={'center'} spacing={5}>
          <Grid
            item
            md={5}
            xs={12}
            sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src={'/images/ino/nft.png'} style={{ width: 'min(400px, 100%)', height: '100%' }} alt="" />
          </Grid>
          <Grid item md={7} xs={12}>
            <Typography textAlign={'center'} fontSize={isMobile ? '24px' : '72px'} fontWeight={'bold'}>
              <ShadowTypography variant="span"> Free </ShadowTypography>
              <GradientShadowTypography variant="span">Minting</GradientShadowTypography>
            </Typography>
            <ShadowTypography variant="h6" fontWeight={'bold'} textAlign={'center'} mb={1}>
              Scheduled: from 10th June 11:00 UTC ( ~ 20:00 UTC+9 )
            </ShadowTypography>
            <ProcessBarBox
              title={
                <>
                  <Typography>Progress</Typography>
                  <Typography>Total amount: {total}</Typography>
                </>
              }
              percent={minted / total ? (minted / total) * 100 : 0}
              sx={{ margin: isMobile ? '24px 0px' : '0px' }}
            />
            <Stack spacing={1.5} alignItems={'center'} sx={{ marginTop: isMobile ? '24px' : '24px' }}>
              <BorderGradientButton onClick={() => navigate('/ino-launchpad/free-minting-nft')} className='animated-bg'>
                JOIN NOW
              </BorderGradientButton>
            </Stack>
          </Grid>
        </Grid>
      </Box> */}
    </Box>
  );
}