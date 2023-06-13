
import { Box, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
import { ImgTitleBox, SectionBox, TitleBox, TypographyGradient } from './HomeStyles';
const upComingList = [
    {
        label: 'Go to Launchpad ››',
        src: 'images/home/upcoming-ido.png',
        link: '/ido-launchpad'
    },
    {
        label: 'Go to Launchpad ››',
        src: 'images/home/upcoming-ino.png',
        link: '/ino-launchpad'
    },

];
export default function UpcomingPools() {
    const isDesktop = useResponsive('up', 'md');
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
                        <Box position={'relative'}

                            sx={{
                                '& a': {
                                    background: 'linear-gradient(100deg, #68E6B8 -10%, #6D85DA 100%)',
                                    boxShadow: 'inset 0px 0px 20px rgba(255, 255, 255, 0.5)',
                                    borderRadius: '10px',
                                    padding: '10px 20px',
                                    margin: '10%',
                                    width: '80%',
                                    position: 'absolute',
                                    textAlign: 'center',
                                    bottom: '2%',
                                    '&:hover': {
                                        background: 'linear-gradient(160deg, #68E6B8 0%, #6D85DA 100%)',
                                        boxShadow: ' 0px 5px 20px rgba(0, 0, 0, 0.5)',
                                    }
                                }
                            }}>

                            <img
                                src={item.src}
                                alt={item.label}
                                width={'100%'}
                            />
                            <Link to={item.link}>
                                <Typography fontWeight='700'> {item.label}</Typography>
                            </Link>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
