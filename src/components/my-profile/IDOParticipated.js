import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BorderGradientButton } from 'components/common/CustomButton';
import useResponsive from 'hooks/useResponsive';
import { Link } from 'react-router-dom';
import { TitleSection } from './TitleSection';

const Wrapper = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('xl')]: {
        marginBottom: 32,
    },
}));
const StyledIDOParticipatedCard = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.3) -8.02%, rgba(109, 133, 218, 0.3) 98.69%)',
    border: '1px solid #00C5D3',
    borderRadius: '8px',
    padding: 48,
    [theme.breakpoints.down('lg')]: {
        padding: '40px',
    },
    display: 'flex',
    height: 280,
    alignItems: 'center',
}));
export const IDOParticipated = ({ myIDOs }) => {
    const isTablet = useResponsive('down', 'lg');
    const isDesktop = useResponsive('up', 'xl');
    return (
        <Wrapper sx={{ flexBasis: isTablet ? '100%' : 'auto' }}>
            <TitleSection title="IDO PARTICIPATED" />
            <StyledIDOParticipatedCard>
                <img src={'/images/my-profile/circle.png'} width={169} height={169} alt="" />
                <Box>
                    <Typography sx={{ color: 'white', fontSize: 24 }}>Total Pool</Typography>
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: isDesktop ? 90 : '4rem',
                            fontWeight: 'bold',
                            textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        {myIDOs ? myIDOs.length : '0'}/3
                    </Typography>
                    <Link to={`/claim-tokens`}>
                        <BorderGradientButton sx={{ width: 120 }}>Claim</BorderGradientButton>
                    </Link>
                </Box>
            </StyledIDOParticipatedCard>
        </Wrapper>
    );
};
