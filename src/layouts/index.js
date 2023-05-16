import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import FooterV2 from './Footer-v2';
import HeaderHome from './HeaderHome';

const RootStyle = styled('div')({
    background: '#121A27',
    // background: 'transparent',
});
const MainStyle = styled('div')(({ theme }) => ({
    paddingTop: { md: '4rem', xs: 0 },
}));

export default function ClientLayout() {
    return (
        <RootStyle>
            <HeaderHome />
            <MainStyle>
                <Outlet />
            </MainStyle>
            {/* <FooterHome /> */}
            <FooterV2 />
        </RootStyle>
    );
}
