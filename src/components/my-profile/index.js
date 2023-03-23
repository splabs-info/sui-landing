import { Container, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SectionBox } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import React from 'react';
import { ClaimAvailable } from './ClaimAvailable';
import ContentManagerUser from './ContentManagerUser';
import { CurrentStakingPool } from './CurrentStakingPool';
import { IDOParticipated } from './IDOParticipated';
import AreaInformation from './Information';
import { MyIDOArea } from './MyIDO';
import { MyINOArea } from './MyINO';
import { CreateProfilePopup } from 'components';
import { StakingBalance } from './StakingBalance';

const StyledResponsiveStack = styled(Stack)(({ theme }) => ({
    [theme.breakpoints.down('xl')]: {
        flexDirection: 'column',
    },
}));
export default function MyInfo() {
    const [openCreateProfile, setOpenCreateProfile] = React.useState();
    const isDesktop = useResponsive('up', 'sm');

    const handleOpen = () => {
        setOpenCreateProfile(true);
    };

    return (
        <>
            <SectionBox
                sx={{
                    backgroundImage: "url('/MyPage.png')",
                    minHeight: '100vh',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    paddingTop: !isDesktop && 5,
                }}
            >
                <Container maxWidth={'xl'}>
                    <Stack direction="column">
                        <StyledResponsiveStack direction="row" sx={{ marginBottom: 12 }}>
                            <AreaInformation onOpen={handleOpen} />
                            <ContentManagerUser />
                        </StyledResponsiveStack>

                        <Stack direction="column">
                            <Stack
                                direction="row"
                                sx={{ marginBottom: 12, flexWrap: 'wrap', justifyContent: 'space-between' }}
                            >
                                <IDOParticipated />
                                <CurrentStakingPool />
                            </Stack>

                            <StakingBalance />
                            <MyIDOArea />
                            <MyINOArea />
                            <ClaimAvailable />
                        </Stack>
                    </Stack>
                </Container>
            </SectionBox>
            {/* <SectionBox
                sx={{
                    backgroundImage: "url('/images/background/homebg3.png')",
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                }}
            >
                <Container maxWidth={'xl'} sx={{ display: 'flex' }}>
                    <Stack direction="row" sx={{ flexWrap: 'wrap' }} alignItems="center" justifyContent="flex-start">
                        <IDOParticipated />
                        <CurrentStakingPool />
                    </Stack>
                </Container>
            </SectionBox> */}
            {/* <SectionBox sx={{ backgroundImage: "url('/images/background/homebg4.png')", backgroundSize: 'cover' }}>
                <Container maxWidth={'xl'}>
                    <StakingBalance />
                </Container>
            </SectionBox> */}
            {/* <SectionBox sx={{ backgroundImage: "url('/images/background/homebg5.png')", backgroundSize: 'cover' }}>
                <Container maxWidth={'xl'}>
                    <MyIDOArea />
                </Container>
            </SectionBox>
            <SectionBox sx={{ backgroundImage: "url('/images/background/homebg6.png')", backgroundSize: 'cover' }}>
                <Container maxWidth={'xl'}>
                    <MyINOArea />
                </Container>
            </SectionBox>
            <SectionBox>
                <Container maxWidth={'xl'}>
                    <ClaimAvailable />
                </Container>
            </SectionBox> */}
            <CreateProfilePopup open={openCreateProfile} handleClose={setOpenCreateProfile} />
        </>
    );
}
