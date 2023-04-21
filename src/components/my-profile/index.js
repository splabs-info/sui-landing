import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Container, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CreateProfilePopup } from 'components';
import IcPeople from 'components/asset/icon/IcPeople';
import IcSex from 'components/asset/icon/IcSex';
import { SectionBox } from 'components/home-v2/HomeStyles';
import { WalletContext } from 'hooks/use-connect';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { get, post } from 'utils/api';
import { setAccessToken } from 'utils/auth';
import { ClaimAvailable } from './ClaimAvailable';
import { CurrentStakingPool } from './CurrentStakingPool';
import { IDOParticipated } from './IDOParticipated';
import AreaInformation from './Information';
import { MyIDOArea } from './MyIDO';
import { MyINOArea } from './MyINO';
import OverviewTabs from './OverviewTabs';
import { StakingBalance } from './StakingBalance';

const StyledResponsiveStack = styled(Stack)(({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
        flexDirection: 'column',
    },
}));
export default function MyInfo() {
    const [openCreateProfile, setOpenCreateProfile] = React.useState();
    const { address } = useContext(WalletContext);
    const [userData, setUserData] = useState(null);
    const [avatar, setAvatar] = useState('');
    const [defaultInfo, setDefaultInfo] = useState(null); 
    const [tempData, setTempData] = useState(null);
    const [id, setId] = useState(null);


    React.useEffect(() => {
        if (address) {
            post('/login', { address: address }, (data) => {
                const { account } = data;
                console.log('account____', account)
                setDefaultInfo(account)
                setAvatar(account.avatar);
                setAccessToken(data.token);
                get(`/account/profile/${account.ID}`, (data) => {
                    console.log(data, 'data');
                    setTempData(data);
                    setId(account.ID);
                    setUserData([
                        // { titleName: '--', title: data.ID, icon: <IcCopy /> },
                        {
                            titleName: 'Email',
                            title: account.email,
                            icon: <MailOutlineIcon color="inherit" />,
                        },
                        {
                            titleName: 'Day of Birth',
                            title: moment(data.dob).format('YYYY-MM-DD'),
                            icon: <IcPeople />,
                        },
                        {
                            titleName: 'Sex',
                            title: data.gender ? (data.gender === 1 ? 'Male' : 'Female') : 0,
                            icon: <IcSex />,
                        },
                        {
                            titleName: 'Nationality',
                            title: data.nationality,
                            icon: <img src="/images/my-profile/icon-nationality.png" />,
                        },
                    ]);
                });
            });
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
                            {userData && (
                                <AreaInformation onOpen={handleOpen} DATA_DEFAULT={userData} id={id} avatar={avatar} />
                            )}
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
            <CreateProfilePopup
                open={openCreateProfile}
                handleClose={setOpenCreateProfile}
                data={defaultInfo}
                id={id}
                avatar={avatar}
            />
        </>
    );
}
