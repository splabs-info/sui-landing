import { Container, Stack } from '@mui/material';
import { SectionBox } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import ContentManagerUser from './ContentManagerUser';
import { CurrentStakingPool } from './CurrentStakingPool';
import { IDOParticipated } from './IDOParticipated';
import AreaInformation from './Information';
import { MyIDOArea } from './MyIDO';
import { MyINOArea } from './MyINO';
import { StakingBalance } from './StakingBalance';

export default function MyInfo() {
    const isDesktop = useResponsive('up', 'sm');
    return (
        <>
            <SectionBox
                sx={{
                    backgroundImage: "url('/images/background/homebg2.png')",
                    minHeight: '100vh',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    paddingTop: !isDesktop && 5,
                }}
            >
                <Container maxWidth={'xl'} sx={{ display: 'flex' }}>
                    <AreaInformation />
                    <ContentManagerUser />
                </Container>
            </SectionBox>
            <SectionBox
                sx={{
                    backgroundImage: "url('/images/background/homebg3.png')",
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                }}
            >
                <Container maxWidth={'xl'} sx={{ display: 'flex' }}>
                    <Stack direction="row" spacing={10}>
                        <IDOParticipated />
                        <CurrentStakingPool />
                    </Stack>
                </Container>
            </SectionBox>
            <SectionBox sx={{ backgroundImage: "url('/images/background/homebg4.png')", backgroundSize: 'cover' }}>
                <Container maxWidth={'xl'}>
                    <StakingBalance />
                </Container>
            </SectionBox>
            <SectionBox sx={{ backgroundImage: "url('/images/background/homebg5.png')", backgroundSize: 'cover' }}>
                <Container maxWidth={'xl'}>
                    <MyIDOArea />
                </Container>
            </SectionBox>
            <SectionBox sx={{ backgroundImage: "url('/images/background/homebg6.png')", backgroundSize: 'cover' }}>
                <Container maxWidth={'xl'}>
                    <MyINOArea />
                </Container>
            </SectionBox>
        </>
    );
}
