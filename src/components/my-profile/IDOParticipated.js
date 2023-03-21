import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { TitleSection } from './TitleSection';
const StyledIDOParticipatedCard = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.3) -8.02%, rgba(109, 133, 218, 0.3) 98.69%)',
    border: '1px solid #00C5D3',
    borderRadius: '8px',
    padding: 48,
    display: 'flex',
    height: 280,
    alignItems: 'center',
    flexWrap: 'wrap',
}));
export const IDOParticipated = () => {
    return (
        <Box>
            <TitleSection title="IDO PARTICIPATED" />
            <StyledIDOParticipatedCard>
                <img src={'/circle.png'} width={169} height={169} />
                <Box>
                    <Typography sx={{ color: 'white', fontSize: 24 }}>Total Part</Typography>
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: 90,
                            fontWeight: 'bold',
                            textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        10/15
                    </Typography>
                </Box>
            </StyledIDOParticipatedCard>
        </Box>
    );
};
