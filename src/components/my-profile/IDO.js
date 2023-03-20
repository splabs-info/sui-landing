import { Box, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TitleSection } from './TitleSection';

const StyledWrapperBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(0deg, rgba(40, 140, 197, 0.3) 49.84%, rgba(93, 213, 230, 0.3) 100.31%)',
    borderRadius: '8px',
    padding: 24,
    border: '1px solid #00C5D3',
}));

export const IDOArea = () => {
    return (
        <Box sx={{ width: '100%', padding: 10, display: 'flex' }}>
            <Box>
                <TitleSection title="IDO PARTICIPATED" />
                <StyledWrapperBox>
                    <img src={'/circle.png'} style={{ width: 169, height: 169 }} />
                    <Box>
                        <Typography sx={{ color: 'white', fontSize: 24, lineHeight: '35px' }}>Total Part</Typography>
                        <Typography sx={{ color: 'white', fontSize: 90, lineHeight: '35px', fontWeight: 'bold' }}>
                            10/15
                        </Typography>
                    </Box>
                </StyledWrapperBox>
            </Box>

            <StyledWrapperBox>
                <TitleSection title="CURRENT STAKING POOL" />
                <Box sx={{ margin: 'auto' }}>
                    <Typography sx={{ fontSize: 24, lineHeight: '35px', color: 'white' }}>$XUI Staked</Typography>
                    <Typography sx={{ fontSize: 90, color: 'white', fontWeight: 'bold' }}>150.000</Typography>
                </Box>
                <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{ height: 240, margin: '0 160px', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                />
            </StyledWrapperBox>
        </Box>
    );
};
