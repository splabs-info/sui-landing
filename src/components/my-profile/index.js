import { styled } from '@mui/material/styles';
import { Box, Typography, Divider } from '@mui/material';
import ContentManagerUser from './ContentManagerUser';
import AreaInformation from './Information';

const WrapperManagerUser = styled(Box)(({ theme }) => ({
    height: '90vh',
    width: '100%',
    display: 'flex',
    gap: '34px',
    padding: '70px',
    paddingTop: '90px',
    '> div:nth-child(1)': {
        overflow: 'auto',
        flexBasis: 'min-content',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        '> div:nth-child(3)': {
            marginTop: '20px',
        },
    },
    '> div:nth-child(2)': {
        flexBasis: '70%',
    },
}));

const StakingBalanceCard = styled(Box)(({ theme }) => ({
    width: '100%',
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
    borderRadius: 10,
    padding: '24px 48px 24px 48px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
}));

export default function MyInfo() {
    return (
        <>
            <WrapperManagerUser>
                <AreaInformation />
                <ContentManagerUser />
            </WrapperManagerUser>
            <Box sx={{ padding: 10 }}>
                <Box>
                    <Typography
                        sx={{ fontSize: 18, fontWeight: 'bold', lineHeight: '26px', color: 'white', marginBottom: 3 }}
                    >
                        IDO PARTICIPATED
                        <span></span>
                    </Typography>
                    <Box
                        sx={{
                            cursor: 'pointer',
                            background:
                                'linear-gradient(0deg, rgba(40, 140, 197, 0.3) 49.84%, rgba(93, 213, 230, 0.3) 100.31%)',
                            borderRadius: '20px',
                            padding: '30px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px',
                            '&:hover': {
                                background:
                                    'linear-gradient(230.44deg, rgba(129, 236, 197, 0.5) 3.99%, rgba(148, 203, 255, 0.5) 48.45%, rgba(133, 150, 255, 0.5) 89.66%)',
                                boxShadow: '0px 0px 20px rgba(56, 232, 208, 0.5)',
                            },
                        }}
                    >
                        <Box>Hinh</Box>
                        <Box>
                            <Typography sx={{ color: 'white', fontSize: 24, lineHeight: '35px' }}>
                                Total Part
                            </Typography>
                            <Typography sx={{ color: 'white', fontSize: 90, lineHeight: '35px', fontWeight: 'bold' }}>
                                10/15
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box>
                    <Typography
                        sx={{ fontSize: 18, fontWeight: 'bold', lineHeight: '26px', color: 'white', marginBottom: 3 }}
                    >
                        CURRENT STAKING POOL
                        <span></span>
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ padding: 10 }}>
                <Typography
                    sx={{ fontSize: 18, fontWeight: 'bold', lineHeight: '26px', color: 'white', marginBottom: 3 }}
                >
                    STAKING BALANCE
                    <span></span>
                </Typography>
                <StakingBalanceCard>
                    <Box sx={{ margin: 'auto' }}>
                        <Typography sx={{ fontSize: 24, lineHeight: '35px', color: 'white' }}>$XUI Staked</Typography>
                        <Typography sx={{ fontSize: 90, color: 'white', fontWeight: 'bold' }}>150.000</Typography>
                    </Box>
                    <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                        sx={{ height: 240, margin: '0 160px', borderColor: 'rgba(0, 0, 0, 0.3)' }}
                    />
                    <Box sx={{ margin: 'auto' }}>
                        <Typography sx={{ fontSize: 24, lineHeight: '35px', color: 'white' }}>Holding $XUI</Typography>
                        <Typography sx={{ fontSize: 90, color: 'white', fontWeight: 'bold' }}>80.000</Typography>
                    </Box>
                </StakingBalanceCard>
            </Box>
            <Box sx={{ padding: 10 }}>
                <Typography
                    sx={{ fontSize: 18, fontWeight: 'bold', lineHeight: '26px', color: 'white', marginBottom: 3 }}
                >
                    My IDO Participated
                    <span></span>
                </Typography>
                <Box></Box>
                <Box></Box>
            </Box>
            <Box sx={{ padding: 10 }}>
                <Typography
                    sx={{ fontSize: 18, fontWeight: 'bold', lineHeight: '26px', color: 'white', marginBottom: 3 }}
                >
                    My INO Participated
                    <span></span>
                </Typography>
                <Box></Box>
                <Box></Box>
            </Box>
        </>
    );
}
