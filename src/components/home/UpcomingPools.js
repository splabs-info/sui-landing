
import { Box, Container, Grid, Stack, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { ImgTitleBox, TitleBox, TypographyGradient } from './HomeStyles';


const PoolBox = styled(Box)(({ theme }) => ({
    padding: 30,
    borderRadius: '16px',
    background: 'linear-gradient(180deg, #41F1D3 0%, #5974BB 100%)',
    position: 'relative',
    boxShadow: ' inset 3px 5px 20px rgba(0, 0, 0, 0.5)',
    '&:before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        background: 'linear-gradient(0deg, #00C5D3 0%, #42EECF 94.62%)',
        borderRadius: '16px',
        inset: '0px',
        padding: '4px',
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
    marginTop: 16,
    zIndex: 2,
    '&:hover': {
        background: 'linear-gradient(160deg, #68E6B8 0%, #6D85DA 100%)',
        boxShadow: ' 0px 5px 20px rgba(0, 0, 0, 0.5)',
    }
}));
const ImageBox = styled(Box)(({ theme }) => ({
    borderRadius: '16px',
    position: 'relative',
    filter: 'drop-shadow(0px 0px 25px #000000)',
    background: 'linear-gradient(0deg, #00C5D3 0%, #42EECF 94.62%)',
    marginBottom: 24,
    padding: 2,
    '& img': {
        borderRadius: '16px',
    }
}));
const TimeBox = styled(Box)(({ theme }) => ({
    borderRadius: '8px',
    background: 'linear-gradient(178.73deg, rgba(0, 189, 228, 0.3) -8.02%, rgba(255, 255, 255, 0.3) 98.69%)',
    padding: '8px 16px',
    color: '#fff',
    border: '1px solid #fff9',
}));

const upComingList = [
    {
        label: 'Go to Launchpad ››',
        src: 'images/home/yousui-ido.jpg',
        title: 'YouSUI',
        description: 'Launchpad, DEX, NFT Marketplace,...',
        openDate: 'June 21st',
        link: '/ido-launchpad'
    },
    {
        label: 'Go to Launchpad ››',
        src: 'images/home/hood-ino.jpg',
        title: 'HooD',
        description: 'M2E, NFT, Metaverse',
        openDate: 'July 25th',
        link: '/ino-launchpad'
    },

];


export default function UpcomingPools() {
    return (
        <Container maxWidth={'xl'}>
            <Box mb={5} sx={{ position: 'relative' }}>
                <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
                <TitleBox>
                    <Typography> Upcoming</Typography>
                    <TypographyGradient>Pools</TypographyGradient>
                </TitleBox>
            </Box>
            <Grid container spacing={3} mt={4}>
                {upComingList.map((item, index) => (
                    <Grid item key={index} sm={3.5} xs={12}>
                        <PoolBox>
                            <ImageBox>
                                <img src={item.src}
                                    alt={item.label}
                                    width={'100%'} />
                            </ImageBox>
                            <Stack direction={'row'} justifyContent={'space-between'}>
                                <Typography variant='h4' color={'#fff'}>{item.title}</Typography>
                                <TimeBox>{item.openDate}</TimeBox>
                            </Stack>

                            <Typography variant='body1' mt={1.5} fontWeight={600} color={'#E7E1E1'}>{item.description}</Typography>
                            <Link to={item.link} >
                                <LinkBox> {item.label}</LinkBox>
                            </Link>
                        </PoolBox>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
