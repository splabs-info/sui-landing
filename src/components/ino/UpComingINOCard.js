import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const UpComingINOCardWrapper = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.3) -8.02%, rgba(109, 133, 218, 0.3) 98.69%)',
    borderRadius: '10px',
    border: '1px solid #00C5D3',
    width: 340,
    paddingTop: 18,
    paddingRight: 8,
    paddingLeft: 8,
    marginBottom: 24,
    [theme.breakpoints.down('sm')]: {
        width: 280,
    },
}));

const ComingSoonCard = styled(Typography)(({ theme }) => ({
    fontSize: 24,
    textShadow: '0px 0px 5px rgba(255, 255, 255, 0.5)',
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 40,
    textAlign: 'center',
}));

export const UpComingINOCard = ({ avatar }) => {
    return (
        <UpComingINOCardWrapper>
            <img src={avatar} alt="ino-coming" />
            <ComingSoonCard>Coming Soon</ComingSoonCard>
        </UpComingINOCardWrapper>
    );
};
