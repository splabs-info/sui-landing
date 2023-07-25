
import { Box, Grid, Typography, styled } from '@mui/material';
import { Stack } from '@mui/system';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { useNavigate } from 'react-router-dom';
import CustomSlider from './CustomSlider';
import { useEffect, useState } from 'react';
const dataSUA =
{
  avatar: '/images/ido/sua-sale.jpg',
  title: 'SUA (Test IDO)',
  description:
    'SUA is a token of Meta version. It has no intrinsic value or expectation of financial return. There is no official team or roadmap.',
  time: '10th June 2023',
  total: 1011,
  link: '/ido-launchpad/sua-sale',
  token: "SUA"
}

const dataXUIOG =
{
  avatar: '/images/staking/water-seek.jpg',
  title: 'XUI - OG ROUND',
  description:
    '$XUI is a utility token of the YouSUI platform that can be used in Launchpad, DEX, Cross Chain Swap, Bridge, and NFT Marketplace. ',
  time: '20th July 2023',
  total: 280000,
  link: '/ido-launchpad/og-sale',
  token: 'XUI',
}
const dataXUIPublic =
{
  avatar: '/images/staking/water-seek.jpg',
  title: 'XUI - PUBLIC ROUND',
  description:
    '$XUI is a utility token of the YouSUI platform that can be used in Launchpad, DEX, Cross Chain Swap, Bridge, and NFT Marketplace. ',
  time: '20th July 2023',
  total: 720000,
  link: '/ido-launchpad/public-sale',
  token: 'XUI',
}

const ContentBox = styled(Box)(({ theme }) => ({
  background: '#142436',
  borderRadius: '10px',
  display: 'flex',
  gap: '32px',
  alignItems: 'center',
  flexDirection: 'row',
  padding: '16px',
  '& .avatar-ino-previous': {
    width: '35%',
    borderRadius: '10px',
    boxShadow: '0px 0px 15.0429px rgba(159, 241, 236, 0.5), inset 1.50429px 2.25643px 7.52145px rgba(0, 0, 0, 0.3)',
  },
  '& .content-ino-previous': {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '24px',
    '& .avatar-ino-previous': {
      width: '100%',
    },
    '& .content-ino-previous': {
      width: '100%',
    },
  },
}));



export default function PreviousPools({ hasOutTimeIDOXUI = false }) {
  const isMobile = useResponsive('down', 'sm');
  const navigate = useNavigate();
  const [list, setList] = useState([dataSUA]);
  useEffect(() => {
    if (hasOutTimeIDOXUI) {
      setList([dataXUIOG, dataXUIPublic, dataSUA]);
    }
  }, [hasOutTimeIDOXUI])
  return (
    <Box mt={20} pb={20} position="relative">
      <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
      <TitleBox>
        <Typography>Previous</Typography>
        <TypographyGradient>Pools</TypographyGradient>
      </TitleBox>
      <Grid container spacing={5} mt={1}>
        {list.map((item, index) => (
          <Grid item md={6} xs={12} key={index}>
            <Box
              sx={{
                p: '1px',
                border: '1px solid #42EECF',
                background: 'linear-gradient(323.96deg, #5394CF 0%, #8CE9C7 89.18%)',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
              onClick={() => {
                navigate(item.link)
              }}
            >
              <ContentBox>
                <Box component={'img'} src={item.avatar} alt={item.title} className='avatar-ino-previous' />
                <Box className='content-ino-previous'>
                  <Typography variant="h3" fontWeight={700}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" >Time: {item.time}</Typography>
                  <Typography variant="body1" mt={1}>{item.description}</Typography>
                </Box>
              </ContentBox>
              <Box p={3}>
              </Box>
            </Box>
            <Box mt={3}>
              <CustomSlider
                color="linear-gradient(10deg, rgba(91, 210, 218, 0.8) 17.27%, rgba(128, 255, 217, 0.8) 59.07%, rgba(255, 255, 255, 0.8) 100%)"
                disabledBorder={true}
                disabledMark={true}
                value={Number(100)}
                max={Number(100)}
                height={12}
                sx={{
                  border: '2px solid #B9E3E7',
                  boxShadow: '0 0 10px 2px rgb(255,255,255,0.7)',
                }}
                title={
                  <Stack direction="row" justifyContent="space-between" mb={1.5}>
                    <Typography variant="body1">Progress</Typography>
                    {/* <Typography variant="body1">Max Participants: {item.total}</Typography> */}
                  </Stack>
                }
              />
              <Stack direction="row" justifyContent="space-between" mt={1.5}>
                <Typography variant="body1">100%</Typography>
                <Typography variant="body1">{item.total}/{item.total} {item.token}</Typography>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
