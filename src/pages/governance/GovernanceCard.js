import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TextTypography } from 'components/home/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { useNavigate } from 'react-router-dom';

const CardBox = styled(Box)(({ theme }) => ({
    p: '1px',
    border: '1px solid #42EECF',
    background: 'linear-gradient(323.96deg, #5394CF 0%, #8CE9C7 89.18%)',
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
    },
}));

const ContentBox = styled(Box)(({ theme }) => ({
    background: '#142436',
    borderRadius: '10px',
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '16px',
    '& .avatar-gov': {
        width: '40%',
        borderRadius: '10px',
        border: '1px solid #21DAD1',
    },
    '& .content-gov': {
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        gap: '24px',
        '& .avatar-gov': {
            width: '100%',
        },
        '& .content-gov': {
            width: '100%',
        },
    },
}));

const ReleaseBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 40,
    '& .MuiTypography-root': {
        borderRadius: '12px',
        background: 'linear-gradient(180deg, rgba(104, 229, 184, 0.30) 0%, rgba(109, 133, 218, 0.30) 100%)',
        border: '1px solid #21DAD1',
        padding: '12px 32px',
        boxShadow: '0px 0px 50px 0px rgba(165, 255, 250, 0.35) inset',
        backdropFilter: 'blur(25px)',
        '&:hover': {
            background: 'linear-gradient(98.21deg, #68E6B8 -9.15%, #6D85DA 102.32%)'
        },
        '&.active': {
            background: 'linear-gradient(98.21deg, #68E6B8 -9.15%, #6D85DA 102.32%)'
        },
    },
    [theme.breakpoints.down('sm')]: {
        marginTop: 0,
    },
}));

export const GovernanceCard = ({ avatar, title, description, status, link, linkName, ...props }) => {
    const navigate = useNavigate();
    const isMobile = useResponsive('down', 'sm');
    return (
        <CardBox
            sx={{ cursor: link && 'pointer' }}
            onClick={() => {
                if (link)
                    navigate(link)
            }}>
            <ContentBox>
                <Box component={'img'} src={avatar} alt={title} className='avatar-gov' />
                <Box className='content-gov'>
                    <Typography color={'#21DAD1'} variant="h5" fontWeight={700}>
                        {title}
                    </Typography>
                    <TextTypography variant='body2'>
                        {description}
                    </TextTypography>

                    <ReleaseBox>
                        <TextTypography fontWeight={700} variant={'body2'}>
                            {linkName}
                        </TextTypography>
                    </ReleaseBox>

                </Box>
            </ContentBox>
            <Box p={2.5} />
        </CardBox>

    );
};
