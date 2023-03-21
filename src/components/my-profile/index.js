import { Box, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ContentManagerUser from './ContentManagerUser';
import AreaInformation from './Information';
import { MyIDOArea } from './MyIDO';
import { MyINOArea } from './MyINO';
import { StakingBalance } from './StakingBalance';
const WrapperManagerUser = styled(Box)(({ theme }) => ({
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
            <MyIDOArea />
            <MyINOArea />
        </>
    );
}
