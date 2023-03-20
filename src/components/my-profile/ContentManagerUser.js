import styled from '@emotion/styled';
import { Box } from '@mui/system';
import Tabs from './Tabs';

const WrapperContentManagerUser = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(270deg, rgba(234, 204, 248, 0.2) 0%, rgba(150, 224, 218, 0.2) 100%)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(25px)',
    borderRadius: '15px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export default function ContentManagerUser() {
    return <Tabs />;
}
