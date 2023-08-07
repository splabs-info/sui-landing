import { Box, Container, Grid, Stack, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { ImgTitleBox, TitleBox, TypographyGradient } from './HomeStyles';
import { IDOCountdown } from 'components/countdown/IDOCountdown';

const PoolBox = styled(Box)(({ theme }) => ({
  padding: 30,
  borderRadius: '16px',
  background: 'linear-gradient(173deg, rgba(104, 229, 184, 0.30) 0%, rgba(109, 133, 218, 0.30) 100%)',
  position: 'relative',
  // boxShadow: ' inset 3px 5px 20px rgba(0, 0, 0, 0.5)',
  boxShadow: '0px 0px 15px 0px rgba(255, 255, 255, 0.30) inset',
  backdropFilter: 'blur(20px)',
  '&:before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    background: 'linear-gradient(320deg,  rgb(109,133,218,0.30) ,rgb(104,229,184,0.30))',
    borderRadius: '16px',
    inset: '0px',
    padding: '1px',
    WebkitMask:
      'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
    WebkitMaskComposite: 'xor',
    zIndex: 0,
  },
}));
const LinkBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  background: 'linear-gradient(100deg, #68E6B8 -10%, #6D85DA 100%)',
  boxShadow: 'inset 0px 0px 20px rgba(255, 255, 255, 0.5)',
  borderRadius: '10px',
  padding: '10px 20px',
  textAlign: 'center',
  fontWeight: 600,
  marginTop: 40,
  zIndex: 2,
  '&:hover': {
    background: 'linear-gradient(160deg, #68E6B8 0%, #6D85DA 100%)',
    boxShadow: ' 0px 5px 20px rgba(0, 0, 0, 0.5)',
  },
}));
const ImageBox = styled(Box)(({ theme }) => ({
  borderRadius: '16px',
  position: 'relative',
  // filter: 'drop-shadow(0px 0px 25px #000000)',
  background: 'linear-gradient(320deg,  rgb(109,133,218,0.30) ,rgb(104,229,184,0.30))',
  marginBottom: 24,
  padding: 1,
  '& img': {
    borderRadius: '16px',
  },
}));
const TimeBox = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  background: 'linear-gradient(178.73deg, rgba(0, 189, 228, 0.3) -8.02%, rgba(255, 255, 255, 0.3) 98.69%)',
  padding: '6px 12px',
  color: '#fff',
  border: '1px solid #fff9',
}));
const CountDownBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '0px 16px',
}));

const upComingList = [
  // {
  //   label: 'Go to Launchpad ››',
  //   src: 'images/home/releap.jpg',
  //   title: 'Releap Protocol Community Round',
  //   description: 'Social-Fi, NFT',
  //   openDate: 'Aug 7th, 12:00 UTC',
  //   link: '/ido-launchpad/releap/community-sale',
  //   startTime: '2023-08-08T12:30:00',
  //   endTime: '',
  // },
  {
    label: 'Go to Launchpad ››',
    src: 'images/home/releap.jpg',
    title: 'Releap Protocol Public Round',
    description: 'Social-Fi, NFT',
    openDate: 'Aug 8th, 12:30 UTC',
    link: '/ido-launchpad/releap/public-sale',
    startTime: '2023-08-08T12:30:00',
    endTime: '',
  },
  {
    label: 'Go to Launchpad ››',
    src: 'images/home/hood-ino.jpg',
    title: 'HooD',
    description: 'M2E, NFT',
    openDate: 'Aug 25th, 11:00 UTC',
    link: '/ino-launchpad',
    startTime: '',
    endTime: '',
  },
];

export default function UpcomingPools() {
  return (
    <Container maxWidth={'xl'}>
      <Box mb={5} sx={{ position: 'relative' }}>
        <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
        <TitleBox>
          <Typography>Upcoming</Typography>
          <TypographyGradient>Pools</TypographyGradient>
        </TitleBox>
      </Box>
      <Grid container spacing={3} mt={4}>
        {upComingList.map((item, index) => (
          <Grid item key={index} md={3.5} sm={5} xs={12}>
            <PoolBox>
              <ImageBox>
                <img src={item.src} alt={item.label} width={'100%'} />
                {item.startTime && (
                  <CountDownBox>
                    <IDOCountdown endTime={item.startTime} />
                  </CountDownBox>
                )}
              </ImageBox>

              <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography variant="h4" color={'#fff'}>
                  {item.title}
                </Typography>
              </Stack>

              <Typography variant="body1" mt={2} mb={2} fontWeight={600} color={'#E7E1E1'}>
                Time: {item.openDate}
              </Typography>
              <Typography variant="body1" mt={2} mb={2} fontWeight={600} color={'#E7E1E1'}>
                {item.description}
              </Typography>
              <Link to={item.link}>
                <LinkBox> {item.label}</LinkBox>
              </Link>
            </PoolBox>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
