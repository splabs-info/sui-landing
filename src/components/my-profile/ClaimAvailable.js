import { Box, Typography } from '@mui/material';
import { TitleSection } from './TitleSection';
export const ClaimAvailable = () => {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <TitleSection title="CLAIM AVAILABLE" />
                <Box>
                    <Typography
                        sx={{
                            fontSize: 18,
                            fontWeight: 400,
                            lineHeight: '26px',
                            color: 'white',
                            display: 'inline-block',
                        }}
                    >
                        Select network: --
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    background: 'linear-gradient(178.73deg, #68E6B8 -8.02%, #6D85DA 98.69%)',
                    boxShadow: 'inset 3px 5px 10px rgba(0, 0, 0, 0.2)',
                    borderRadius: '15px',
                    padding: '30px 75px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            />
        </Box>
    );
};
