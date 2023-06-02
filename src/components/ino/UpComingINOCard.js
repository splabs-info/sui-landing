import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const UpComingINOBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(128.67deg, rgba(104, 230, 184, 0.15) 10.81%, rgba(109, 133, 218, 0.15) 75.48%)',
    borderRadius: '20px',
    boxShadow: 'inset 0px 0px 15.0429px rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(15px)',
    padding: 24,

    [theme.breakpoints.down('sm')]: {
    },
}));

const AvatarBox = styled(Box)(({ theme }) => ({
    borderRadius: '10px',
    boxShadow: '0px 0px 15.0429px rgba(159, 241, 236, 0.5), inset 1.50429px 2.25643px 7.52145px rgba(0, 0, 0, 0.3)',
    [theme.breakpoints.down('sm')]: {
    },
}));

const ReleaseBox = styled(Box)(({ theme }) => ({
    borderRadius: '50px',
    background: 'linear-gradient(178.73deg, rgba(204, 204, 204, 0.3) -8.02%, rgba(255, 255, 255, 0.3) 98.69%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #e4e4e4',
    padding: '14px 28px',
    margin: '24px 24px 16px 24px',
    [theme.breakpoints.down('sm')]: {
    },
}));

export const UpComingINOCard = ({ avatar, releaseTime, hardCap, access, title, ...props }) => {
    return (
        <UpComingINOBox>
            <AvatarBox component={'img'} src={avatar} alt={title} />
            <Typography variant={'h4'} mt={3}>{title}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography> Hardcap: {hardCap}</Typography>
                {access !== '' && <Typography>Access: {access}</Typography>}</Box>
            <ReleaseBox>{releaseTime}</ReleaseBox>
        </UpComingINOBox>
    );
};
