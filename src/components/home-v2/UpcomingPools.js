
import { Box, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
import { ImgTitleBox, SectionBox, TitleBox, TypographyGradient } from './HomeStyles';
const upComingList = [
    {
        label: 'upcoming',
        src: 'images/home/suitoken-card.svg',
        link: '/ido-launchpad'
    },
    {
        label: 'upcoming',
        src: 'images/home/upcoming-2.svg',
        link: '/ino-launchpad'
    },
    {
        label: 'upcoming',
        src: 'images/home/upcoming-1.svg'
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
                    <Grid item key={index} sm={4} xs={12}>
                        <Link to={item.link}>
                            <img
                                src={item.src}
                                alt={item.label}
                                width={'100%'}
                            />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
