import { Box, Button, Divider, Grid, Typography, styled } from '@mui/material';
import { Stack } from '@mui/system';
import { ProcessBarBox } from 'components/common/ProcessBarBox';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home-v2/HomeStyles';
import { ethers } from 'ethers';
import useResponsive from 'hooks/useResponsive';
import { SuiContext } from 'provider/SuiProvider';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { SUA_PRESALE_OG } from 'constant/sui-chain';
import * as moment from 'moment';
const img = '/images/ido/sua-sale.jpg';

const AvatarBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: 24,
  padding: 24,
  background: 'linear-gradient(0deg, rgba(0, 197, 211, 0.12) 38.68%, rgba(66, 238, 207, 0.12) 94.62%)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: 'inset 0px 0px 20px rgba(255, 255, 255, 0.3)',
}));

const StyledProcessBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(178.73deg, rgba(104, 229, 184, 0.2) 0%, rgba(109, 133, 218, 0.2) 100%)',
  padding: '56px 40px',
  color: 'white',
  borderRadius: 10,
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
  position: 'relative',
  marginTop: 32,
}));

export default function OnGoingPools() {
  const navigate = useNavigate();

  const isMobile = useResponsive('down', 'sm');
  const isDesktop = useResponsive('up', 'md');
  const [ratio, setRadio] = React.useState();
  const [participants, setParticipants] = React.useState();
  const [totalSold, setTotalSold] = React.useState();
  const [totalSupply, setTotalSupply] = React.useState();
  const [minPurchase, setMinPurchase] = React.useState();
  const [maxPerUser, setMaxPerUser] = React.useState();

  const { provider, balances } = React.useContext(SuiContext);

  console.log('tiemmmmm',  moment(1685340000000).format('Do MMMM YYYY, h:mm:ss a'))
 
  React.useEffect(() => {
    const fetchPoolData = async () => {
      const txn = await provider.getObject({
        id: '0xc299f92f7f460165a31a87630ee71ce1386deeaf65bf72da3eb4c572b3a1142c',
        options: { showContent: true },
      });

      const round = txn?.data?.content?.fields;

      if (round) {
        const suiRatio = ethers.utils.formatUnits(
          round?.payments?.fields.contents[0]?.fields?.value?.fields.ratio_per_token,
          9
        );
        setRadio(suiRatio);
      }

      const participants = round?.participants?.fields?.contents.length;

      setParticipants(participants);
      setTotalSold(round?.total_sold);
      setTotalSupply(round?.total_supply);
      setMinPurchase(round?.min_purchase);
      setMaxPerUser(round?.max_per_user);
    };

    fetchPoolData();
  }, [provider]);

  const progress = React.useMemo(() => {
    if (totalSold && totalSupply) {
      return ethers.utils.formatUnits(totalSold, 9) / ethers.utils.formatUnits(totalSupply, 9);
    }
  }, [totalSold, totalSupply]);

  return (
    <Box mb={20} mt={10} position="relative">
      {/* <Link to="/"> */}
      <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
      <TitleBox>
        <Typography>On-going</Typography>
        <TypographyGradient>Pools</TypographyGradient>
      </TitleBox>
      <Box
        sx={{
          background: 'linear-gradient(128.67deg, rgba(104, 230, 184, 0.2) 10.81%, rgba(109, 133, 218, 0.2) 75.48%)',
          boxShadow: 'inset 0px 0px 20px rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(25px)',
          borderRadius: isMobile ? '20px' : '30px',
          p: 4,
          mt: 5,
          '&:hover': {
            background: 'linear-gradient(128.67deg, rgba(104, 230, 184, 0.5) 10.81%, rgba(109, 133, 218, 0.5) 75.48%)',
          },
        }}
      >
        <Grid container alignItems={'center'} spacing={5}>
          <Grid item md={4} xs={12} sx={{ position: 'relative' }}>
            <AvatarBox>
              <img src={img} style={{ width: '100%', height: '100%' }} alt="" />
            </AvatarBox>
          </Grid>
          <Grid item md={8} xs={12}>
            <Typography variant="h4">IDO TEST ROUND (SUA TOKEN)</Typography>
            <ProcessBarBox
              title={
                <>
                  <Typography>Progress</Typography>
                  <Typography>Participants: {participants}</Typography>
                </>
              }
              percent={progress}
              subtitle={
                <>
                  <Typography>{progress ? progress.toFixed(7) : 'Loading'} %</Typography>
                  <Typography>
                    {(totalSold && totalSupply) || totalSold === 0 ? (
                      <>
                        {`${ethers.utils.formatUnits(totalSold, 9)} / ${ethers.utils.formatUnits(totalSupply, 9)}`} SUA
                      </>
                    ) : (
                      'Loading'
                    )}{' '}
                  </Typography>
                </>
              }
              sx={{ margin: isMobile ? '24px 0px' : '0px' }}
            />
            <Box
              sx={{
                background:
                  'linear-gradient(98.21deg, rgba(104, 230, 184, 0.1) -9.15%, rgba(109, 133, 218, 0.1) 102.32%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '15px',
                p: 2,
                mt: 2,
              }}
            >
              <Grid container justifyContent="space-between" alignItems={'center'}>
                <Grid item xs={12} sm={8}>
                  <Stack spacing={1.5} sx={{ '& .MuiTypography-body1': { fontSize: isMobile ? '13px' : '16px' } }}>
                    <Stack direction="row" justifyContent={'space-between'}>
                      <Typography>Condition:</Typography>
                      <Typography>--</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent={'space-between'}>
                      <Typography>Minimum Purchase:</Typography>
                      <Typography fontWeight={'bold'}>1,000 SUA</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent={'space-between'}>
                      <Typography>Start at:</Typography>
                      <Typography fontWeight={'bold'}>{moment(1685340000000).format('LLL')}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent={'space-between'}>
                      <Typography>End at:</Typography>
                      <Typography fontWeight={'bold'}>{moment(1686441600000).format('LLL')}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Divider flexItem orientation={isMobile ? 'horizontal' : 'vertical'} />
                <Grid item xs={12} sm={3}>
                  <Stack spacing={1.5} alignItems={'center'} sx={{ marginTop: isMobile ? '24px' : '0px' }}>
                    {/* <Typography fontWeight={'bold'}>07D 12:31:12</Typography> */}
                    <Button
                      onClick={() => navigate('/ido-launchpad/sua')}
                      sx={{
                        background: 'linear-gradient(255.34deg, #207BBF 21.95%, #4A94CB 39.94%, #5CBAF2 79.27%)',
                        borderRadius: '50px',
                        color: 'white',
                        padding: '12px 36px',
                      }}
                    >
                      JOIN NOW
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* </Link> */}
    </Box>
  );
}
