import { Box, Grid, Typography } from '@mui/material';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home/HomeStyles';
import React from 'react';
import { OnGoingCard } from './OnGoingCard';
import { isEmpty } from 'lodash';
const infoRounds = [
  {
    title: '$XUI IDO - OG ROUND',
    link: '/ido-launchpad/og-sale',
    avatar: '/images/staking/water-seek.jpg',
    participants: '--',
    token: 'XUI',
    total: 280000,
    description:
      '$XUI is a utility token of the YouSUI platform that can be used in Launchpad, DEX, Cross Chain Swap, Bridge, and NFT Marketplace.',
    sold: 35000,
    startTime: '2023-07-20T12:00:00Z',
    endTime: '2023-07-23T12:00:00Z',
    vesting: '',
  },
  {
    title: '$XUI IDO - PUBLIC ROUND',
    link: '/ido-launchpad/public-sale',
    avatar: '/images/staking/water-seek.jpg',
    participants: '--',
    token: 'XUI',
    description:
      '$XUI is a utility token of the YouSUI platform that can be used in Launchpad, DEX, Cross Chain Swap, Bridge, and NFT Marketplace. ',
    total: 720000,
    sold: 120000,
    startTime: '2023-07-20T12:00:00Z',
    endTime: '2023-07-23T12:00:00Z',
    vesting: '',
  },
  {
    title: 'RELEAP - COMMUNITY ROUND',
    link: '/ido-launchpad/releap/public-sale',
    avatar: '/images/staking/water-seek.jpg',
    participants: '--',
    token: 'XUI',
    description:
      '$XUI is a utility token of the YouSUI platform that can be used in Launchpad, DEX, Cross Chain Swap, Bridge, and NFT Marketplace. ',
    total: 720000,
    sold: 120000,
    startTime: '2023-08-05T11:00:00Z',
    endTime: '2023-08-08T11:00:00Z',
    vesting: '',
  },
];

export default function OnGoingPools({ releapRound }) {
  const renderOnGoingPool = React.useCallback(() => {
    if (isEmpty(releapRound)) {
      return (
        <>
          {infoRounds?.map((item, index) => (
            <Grid item md={6} xs={12} key={index}>
              <OnGoingCard {...item} key={index} />
            </Grid>
          ))}
        </>
      );
    } else {
      return (
        <>
          {releapRound?.map((item, index) => (
            <Grid item md={6} xs={12} key={index}>
              <OnGoingCard
                link={item?.link}
                roundName={item?.name}
                projectName={item?.projectName}
                imageUrl={item?.imageUrl}
                endAt={item?.endAt}
                totalSupply={item?.totalSupply}
                totalSold={item?.totalSold}
                key={index}
              />
            </Grid>
          ))}
        </>
      );
    }
  }, [releapRound]);

  return (
    <Box mb={20} mt={10} position="relative">
      <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
      <TitleBox>
        <Typography>On-going</Typography>
        <TypographyGradient>Pools</TypographyGradient>
      </TitleBox>
      <Grid container spacing={5} mt={2}>
        {renderOnGoingPool()}
      </Grid>

      {/* {infoRounds.map((round, index) => (
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
                {round?.avatar ? (
                  <img src={round?.avatar} style={{ width: '100%', height: '100%' }} alt="" />
                ) : (
                  <CircularProgress
                    sx={{
                      textAlign: 'center',
                      margin: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                      '& .MuiCircularProgress-root': {
                        margin: 'auto',
                      },
                    }}
                  />
                )}
              </AvatarBox>
            </Grid>
            <Grid item md={8} xs={12}>
              <Typography variant="h4">{round?.projectName} - {replace(round?.name, '_', ' ')}</Typography>
              <ProcessBarBox
                title={
                  <>
                    <Typography>Progress</Typography>
                    <Typography>Participants: {round?.participants}</Typography>
                  </>
                }
                percent={(round?.totalSold / round?.totalSupply) * 100}
                subtitle={
                  <>
                    <Typography>{round?.totalSold && round?.totalSupply ? (round?.totalSold / round?.totalSupply).toFixed(3) * 100 : 'TBA'} %</Typography>
                    <Typography>
                      {(round?.totalSold && round?.totalSupply) || round?.totalSold === 0 ? (
                        <>
                          {`${ethers.utils.formatUnits(round?.totalSold, round?.decimals)} / ${Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(
                            ethers.utils.formatUnits(round?.totalSupply, round?.decimals)
                          )}`}{' '}
                          {round?.symbol}
                        </>
                      ) : (
                        'TBA'
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
                        <Typography fontWeight={'bold'}>
                          {round?.minPurchase ? Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(
                            ethers.utils.formatUnits(round?.minPurchase, round?.decimals)
                          ) : 'TBA'}
                          {' '}{round?.symbol}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent={'space-between'}>
                        <Typography>Start at:</Typography>
                        <Typography fontWeight={'bold'}>{moment(toNumber(round?.startAt)).format('LLLL')}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent={'space-between'}>
                        <Typography>End at:</Typography>
                        <Typography fontWeight={'bold'}>{moment(toNumber(round?.endAt)).format('LLLL')}</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Divider flexItem orientation={isMobile ? 'horizontal' : 'vertical'} />
                  <Grid item xs={12} sm={3}>
                    <Stack spacing={1.5} alignItems={'center'} sx={{ marginTop: isMobile ? '24px' : '0px' }}>
                      <Button
                        onClick={() => handleNavigate(round?.projectId, round?.name, index)}
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
      ))} */}
    </Box>
  );
}
