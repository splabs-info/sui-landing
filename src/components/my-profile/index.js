import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ContentManagerUser from './ContentManagerUser';
import AreaInformation from './Information';
import { StakingBalance } from './StakingBalance';

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

export default function MyInfo() {
    return (
        <>
            <WrapperManagerUser>
                <AreaInformation />
                <ContentManagerUser />
            </WrapperManagerUser>
            <Box sx={{ width: '100%', padding: 10, display: 'flex' }}></Box>
            <StakingBalance />
            {/* <Box sx={{ padding: 10 }}>
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
            </Box> */}
        </>
    );
}
