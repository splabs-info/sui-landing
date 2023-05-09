import { Box, Button, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
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
}));

const Title = styled(Typography)(({ theme }) => ({
    textShadow: '2px 3px 5px rgb(0,0,0,0.2)',
    fontWeight: 'bold',
    fontSize: 32,
}));

const Caption = styled(Typography)(({ theme }) => ({
    fontWeight: 'normal',
}));

const ApplyButton = styled(Button)(({ theme }) => ({
    background: '#142436',
    fontWeight: 'bold',
    color: 'white',
    paddingTop: '18px',
    paddingBottom: '18px',
    paddingLeft: '32px',
    paddingRight: '32px',
    borderRadius: '50px',
    '&:hover': {
        background: '#1f2830',
    },
}));

const ApplyAsProject = () => {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                <Box>
                    <Title>Apply as a Project</Title>
                    <Caption>
                        Do you have an amazing collection that you would love to launch with YouSUI? Apply today!
                    </Caption>
                </Box>
                <ApplyButton
                    startIcon={<img src="/arrow.svg" alt="" style={{ width: 24, height: 24 }} />}
                    onClick={() => navigate('/coming-soon')}
                >
                    Apply Now
                </ApplyButton>
            </Stack>
        </Wrapper>
    );
};

export default ApplyAsProject;
