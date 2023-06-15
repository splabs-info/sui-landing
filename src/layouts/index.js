import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import Footer from './FooterSection';
import HeaderHome from './HeaderSection';

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
            <HeaderHome />
            <MainStyle>
                <Outlet />
            </MainStyle>
            <Footer />
        </RootStyle>
    );
}
