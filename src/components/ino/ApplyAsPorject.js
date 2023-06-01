import { Box, Button, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import useResponsive from 'hooks/useResponsive';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled(Box)(({ theme }) => ({
    boxShadow: 'inset 3px 5px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '16px',
    padding: '48px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    background: `url('/apply-as-project.svg')`,
    backgroundRepeat: 'no-repeat',
    objectFit: 'contain',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('sm')]: {
        padding: '32px 24px',
    }
}));

const Title = styled(Typography)(({ theme }) => ({
    textShadow: '2px 3px 5px rgb(0,0,0,0.2)',
    fontWeight: 'bold',
    fontSize: 32,
    [theme.breakpoints.down('sm')]: {
        fontSize: 28,
    }
}));

const Caption = styled(Typography)(({ theme }) => ({
    fontWeight: 'normal',
}));

const ApplyButton = styled(Button)(({ theme }) => ({
    background: '#142436',
    fontWeight: 'bold',
    color: 'white',
    padding: '18px 32px',
    borderRadius: '50px',
    '&:hover': {
        background: '#1f2830',
    },
    [theme.breakpoints.down('sm')]: {
        marginTop: '16px',
        padding: '12px 24px',
        borderRadius: '50px',
    }
}));

const ApplyAsProject = () => {
    const isMobile = useResponsive('down', 'sm');
    return (
        <Wrapper>
            <Stack direction={isMobile ? 'column' : "row"} justifyContent="space-between" alignItems={isMobile ? 'flex-end' : "center"} sx={{ width: '100%' }}>
                <Box>
                    <Title>Apply as a Project</Title>
                    <Caption>
                        Do you have an amazing collection that you would love to launch with YouSUI? Apply today!
                    </Caption>
                </Box>
                <a href="https://1wcod92hu2t.typeform.com/to/yrmuPiG6" target="_blank" rel="noreferrer">
                    <ApplyButton
                        startIcon={<img src="/arrow.svg" alt="" style={{ width: 24, height: 24 }} />}
                    // onClick={() => navigate('/')}
                    >
                        Apply Now
                    </ApplyButton>
                </a>
            </Stack>
        </Wrapper>
    );
};

export default ApplyAsProject;
