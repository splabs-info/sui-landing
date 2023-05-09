import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const HowToJoinCardWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: '24px',
    marginBottom: 16,
}));
const Caption = styled(Typography)(({ theme }) => ({
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: '20px',
    marginBottom: 24,
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    background:
        'linear-gradient(90deg, rgba(129, 236, 197, 0.7) 0%, rgba(148, 203, 255, 0.7) 50%, rgba(133, 150, 255, 0.7) 96.35%)',
    borderRadius: '50px',
    boxShadow: 'inset 0px 0px 30px rgba(255, 255, 255, 0.3)',
    fontWeight: 'bold',
    fontSize: 13,
    color: 'rgba(255, 255, 255, 1)',
    width: 100,
    height: 42,
}));

export const HowToJoinCard = ({ icon, title, caption, direction, btnDirection }) => {
    const navigate = useNavigate();

    const handleDirect = () => {
        if (btnDirection === 'Start Now') {
            navigate('/staking');
        }
        if (btnDirection === 'Apply Now') {
            navigate('/coming-son');
        }
    };
    return (
        <HowToJoinCardWrapper>
            <img
                src={icon}
                alt="wallet icon"
                style={{
                    width: 56,
                    height: 56,
                    marginBottom: 32,
                }}
            />
            <Title>{title}</Title>

            <Caption>{caption}</Caption>
            {direction ? (
                <SubmitButton sx={{ marginBottom: 5 }} onClick={handleDirect}>
                    {btnDirection}
                </SubmitButton>
            ) : (
                <></>
            )}
        </HowToJoinCardWrapper>
    );
};
