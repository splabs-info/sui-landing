import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import FooterSection from './FooterSection';
import HeaderSection from './HeaderSection';

const RootStyle = styled('div')({
    background: 'linear-gradient(150deg, #0C202D 0%, #050C13 100%)',
});
const MainStyle = styled('div')(({ theme }) => ({
    paddingTop: '3rem',
    minHeight: '80vh',
    [theme.breakpoints.down('md')]: {
        paddingTop: 0
    }
}));

export default function ClientLayout() {
    return (
        <RootStyle>
            <HeaderSection />
            <MainStyle>
                <Outlet />
            </MainStyle>
            <FooterSection />
        </RootStyle>
    );
}
