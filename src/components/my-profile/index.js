import { Container, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CreateProfilePopup } from 'components';
import { SectionBox } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import React, { useContext } from 'react';
import { ClaimAvailable } from './ClaimAvailable';
import { CurrentStakingPool } from './CurrentStakingPool';
import { IDOParticipated } from './IDOParticipated';
import AreaInformation from './Information';
import { MyIDOArea } from './MyIDO';
import { MyINOArea } from './MyINO';
import OverviewTabs from './OverviewTabs';
import { StakingBalance } from './StakingBalance';
import { useSelector } from 'react-redux';
import { useWallet } from '@suiet/wallet-kit';
import { post } from 'utils/api';
import { WalletContext } from 'hooks/use-connect';

const StyledResponsiveStack = styled(Stack)(({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
        flexDirection: 'column',
    },
}));
export default function MyInfo() {
    const [openCreateProfile, setOpenCreateProfile] = React.useState();
    const isDesktop = useResponsive('up', 'sm');
    const { userStore } = useSelector((state) => state);
    const wallet = useWallet();
    const { address } = useContext(WalletContext);

    console.log(address);

    React.useEffect(() => {
        if (address) {
            post('/login', { address: address }, (data) => console.log(data));
        }
    }, [address]);

    const handleOpen = () => {
        setOpenCreateProfile(true);
    };

    return (
        <>
            <SectionBox
                sx={{
                    backgroundImage: "url('/images/background/bg-ido.png')",
                }}
            >
                <Container maxWidth={'xl'}>
                    <Stack direction="column">
                        <StyledResponsiveStack direction="row" sx={{ marginBottom: 12 }}>
                            <AreaInformation onOpen={handleOpen} />
                            <OverviewTabs />
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
            <CreateProfilePopup open={openCreateProfile} handleClose={setOpenCreateProfile} />
        </>
    );
}
