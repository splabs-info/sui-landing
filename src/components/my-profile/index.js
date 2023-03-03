import styled from '@emotion/styled';
import { Box } from '@mui/system';
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

export default function MyInfo() {
    return (
        <WrapperManagerUser>
            <AreaInformation />
            <ContentManagerUser />
        </WrapperManagerUser>
    );
}
