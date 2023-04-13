import { Container, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CreateProfilePopup } from 'components';
import { SectionBox } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import React, { useContext, useState } from 'react';
import { ClaimAvailable } from './ClaimAvailable';
import { CurrentStakingPool } from './CurrentStakingPool';
import { IDOParticipated } from './IDOParticipated';
import AreaInformation from './Information';
import { MyIDOArea } from './MyIDO';
import { MyINOArea } from './MyINO';
import OverviewTabs from './OverviewTabs';
import { StakingBalance } from './StakingBalance';
import { useDispatch, useSelector } from 'react-redux';
import { useWallet } from '@suiet/wallet-kit';
import { get, post } from 'utils/api';
import { WalletContext } from 'hooks/use-connect';
import { setAccessToken } from 'utils/auth';
import { UserConstant } from 'store/user/userConstants';
import IcCopy from 'components/asset/icon/IcCopy';
import IcNationality from 'components/asset/icon/IcNationality';
import IcPeople from 'components/asset/icon/IcPeople';
import IcSex from 'components/asset/icon/IcSex';
import IcVerify from 'components/asset/icon/IcVerify';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

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
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);

    React.useEffect(() => {
        if (address) {
            post('/login', { address: address }, (data) => {
                console.log(data);
                const { account } = data;
                setAccessToken(data.token);
                console.log(data.account);
                get(`/account/profile/${account.ID}`, (data) => {
                    console.log(data);
                    setUserData([
                        { titleName: '--', icon: <IcCopy /> },
                        {
                            titleName: 'Email',
                            title: 'john_br.son@gmail.com',
                            icon: <MailOutlineIcon color="inherit" />,
                        },
                        {
                            titleName: 'Day of Birth',
                            title: '20.05.1998',
                            icon: <IcPeople />,
                        },
                        { titleName: 'Sex', title: '--', icon: <IcSex /> },
                        {
                            titleName: 'Nationality',
                            title: '==',
                            icon: <img src="/images/my-profile/icon-nationality.png" />,
                        },
                    ]);
                });
            });
        }
    }, [address]);

    console.log(userData);

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
                            {userData && <AreaInformation onOpen={handleOpen} DATA_DEFAULT={userData} /> }
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
