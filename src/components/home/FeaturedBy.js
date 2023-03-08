import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import useResponsive from '../../hooks/useResponsive';

export default function Tokenomic() {
    const isDesktop = useResponsive('up', 'md');
    return (
        <Box>
            <Container>
                <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        borderRadius: '4rem',
                        background: 'rgba(20,18,45,.9)',
                        textAlign: 'center',
                        '& .MuiGrid-item': {
                            display: 'flex',
                            justifyContent: 'center',
                        },
                    }}
                >
                    <Grid item sm={4} xs={12}>
                        <Typography
                            variant="h5"
                            color="white"
                            sx={{
                                textAlign: 'center',
                                paddingTop: isDesktop ? '0.5rem' : '0.75rem',
                            }}
                        >
                            Featured By
                        </Typography>
                    </Grid>
                    <Grid item sm={3} xs={6}>
                        <img alt="" src="/images/partners/cointelegraph.png" width={'80%'} />
                    </Grid>
                    <Grid item sm={3} xs={6}>
                        <img alt="" src="/images/partners/MK1.png" width={'60%'} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
