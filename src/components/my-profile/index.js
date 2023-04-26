import { CircularProgress, Container, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CreateProfilePopup } from 'components';
import { SectionBox } from 'components/home-v2/HomeStyles';
import { WalletContext } from 'hooks/use-connect';
import { isNil, isNull } from 'lodash';
import React, { useContext, useState } from 'react';
import { useGetProfile, useLogin } from 'services/auth';
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
    const [defaultInfo, setDefaultInfo] = useState(null);
    const [id, setId] = useState(null);
    const [flag, setFlag] = React.useState(false);

    const { mutateAsync: login, isLoading: isLoadingLogin, isSuccess: isLoginSuccess } = useLogin();
    const { profile, isLoading: isLoadingGetProfile, isSuccess: isGetProfileSuccess } = useGetProfile(id);

    const fetchData = React.useCallback(() => {
        login({ address: address }).then((result) => {
            setId(result?.account.ID);
            setAccessToken(result?.token);
            setDefaultInfo(result?.account);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    React.useEffect(() => {
        if (!isNil(address)) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    React.useEffect(() => {
        if (!isNull(id) && isGetProfileSuccess && !isNull(defaultInfo)) {
            setDefaultInfo((prev) => ({ ...prev, ...profile }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile]);

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
                        {isLoadingLogin || isLoadingGetProfile || !isLoginSuccess ? (
                            <CircularProgress sx={{ margin: '128px auto auto auto' }} />
                        ) : (
                            <>
                                <StyledResponsiveStack direction="row" sx={{ marginBottom: 12 }}>
                                    {!isNull(defaultInfo) && (
                                        <AreaInformation onOpen={handleOpen} DATA_DEFAULT={defaultInfo} id={id} />
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
                            </>
                        )}
                    </Stack>
                </Container>
            </SectionBox>
            {!isNull(defaultInfo) && defaultInfo?.email && (
                <CreateProfilePopup
                    open={openCreateProfile}
                    handleClose={setOpenCreateProfile}
                    data={defaultInfo}
                    id={id}
                    handleRefresh={() => setFlag(!flag)}
                    setDefaultInfo={setDefaultInfo}
                />
            )}
        </>
    );
}
