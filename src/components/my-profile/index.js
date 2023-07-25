/* eslint-disable jsx-a11y/alt-text */
import { Box, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useWallet } from '@suiet/wallet-kit';
import { CreateProfilePopup } from 'components';
import { SectionBox } from 'components/home/HomeStyles';
import { WalletContext } from 'hooks/use-connect';
import { isNull } from 'lodash';
import { INVEST_CERTIFICATE, PACKAGE_BASE } from 'onchain/constants';
import { SuiContext } from 'provider/SuiProviderV2';
import React, { useContext, useState } from 'react';
import { useGetProfile, useLogin } from 'services/auth';
import { setAccessToken } from 'utils/auth';
import { findCertificate } from 'utils/util';
import { ClaimAvailable } from './ClaimAvailable';
import { CurrentStakingPool } from './CurrentStakingPool';
import { IDOParticipated } from './IDOParticipated';
import AreaInformation from './Information';
import { MyIDOArea } from './MyIDO';
import { MyINOArea } from './MyINO';
import OverviewTabs from './OverviewTabs';
import { StakingBalance } from './StakingBalance';
<<<<<<< HEAD
import StakingTable from './my-staking/StakingTable';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import queryString from 'query-string';
=======

>>>>>>> origin/master
const StyledResponsiveStack = styled(Stack)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    },
}));
export default function MyInfo() {
    const [openCreateProfile, setOpenCreateProfile] = React.useState();
    const { address, active } = useContext(WalletContext);
    const wallet = useWallet();
    const [defaultInfo, setDefaultInfo] = useState(null);
    const [id, setId] = useState(null);
    const [myIDOs, setMyIDOs] = React.useState([]);
    const [flag, setFlag] = React.useState(false);
    const { provider, projects } = React.useContext(SuiContext);
    const { mutateAsync: login, isLoading: isLoadingLogin, isSuccess: isLoginSuccess } = useLogin();
    const { profile, isLoading: isLoadingGetProfile, isSuccess: isGetProfileSuccess } = useGetProfile(id);

    const location = useLocation();
    const { tab: tabIndexFromUrl } = queryString.parse(location.search);

    console.log('location.search__', queryString.parse(location.search))
    const initialTabIndex = Number(tabIndexFromUrl) || 0; // Đảm bảo rằng tabIndex là số
    const [tabIndex, setTabIndex] = useState(initialTabIndex);


    const fetchDataInfo = React.useCallback(async () => {
        const targetAddress = wallet?.address || address;
        if (targetAddress) {
            try {
                const result = await login({ address: targetAddress });
                const { account, token } = result || {};
                setId(account?.ID);
                setAccessToken(token);
                setDefaultInfo(account);
            } catch (error) {
                console.log('error___fetchDataInfo', error)
            }
        }
    }, [address, login, wallet?.address]);

    const navigate = useNavigate();
    const handleChangeTab = (index) => {
        setTabIndex(index);
        navigate(`my-profile/${index}`);
    };

    React.useEffect(() => {
        if (address || wallet?.address) {
            fetchDataInfo();
        }
    }, [address, fetchDataInfo, wallet?.address, tabIndexFromUrl]);

    React.useEffect(() => {
        setTabIndex(Number(tabIndexFromUrl) || 0);
    }, [tabIndexFromUrl]);

    React.useEffect(() => {
        if (!isNull(id) && isGetProfileSuccess && !isNull(defaultInfo)) {
            setDefaultInfo((prev) => ({ ...prev, ...profile }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile]);

    const handleOpen = () => {
        setOpenCreateProfile(true);
    };

    const fetchData = React.useCallback(async () => {
        if (!wallet?.address || !wallet?.connected) return;

        const owner = wallet?.address;

        const filter = {
            MatchAll: [
                {
                    StructType: `${PACKAGE_BASE}::certificate::InvestmentCertificate`,
                },
                {
                    AddressOwner: owner,
                },
            ],
        };

        const otherObjects = await provider.getOwnedObjects({
            owner,
            filter: filter,
            options: { showContent: true },
        });


        if (otherObjects?.data?.length === 0) return;

        const certificateObjects = findCertificate(otherObjects?.data, INVEST_CERTIFICATE);

        // console.log('certificateObjects___111', certificateObjects)
        if (!certificateObjects) return;

        const promises = certificateObjects.map(async (item) => {
            const certificate = await provider.getObject({
                id: item.data.objectId,
                options: { showContent: true },
            });

            const projectFields = certificate?.data?.content?.fields?.project?.fields;

            return {
                eventName: certificate?.data?.content?.fields?.event_name,
                issue_date: certificate?.data?.content?.fields?.issue_date || '',
                description: projectFields?.description || '',
                discord: projectFields?.discord || '',
                image_url: projectFields?.image_url || '',
                link_url: projectFields?.link_url || '',
                medium: projectFields?.medium || '',
                name: projectFields?.name || '',
                vesting_id: certificate?.data?.content?.fields?.vesting_id,
                project_id: certificate?.data?.content?.fields.id.id || '',
                telegram: projectFields?.telegram || '',
                twitter: projectFields?.twitter || '',
                website: projectFields?.website || '',
            };
        });
        const formattedMyIdo = await Promise.all(promises);

        setMyIDOs([...formattedMyIdo]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet?.address, wallet?.connected]);

    React.useEffect(() => {
        if (provider && projects) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData, projects]);

<<<<<<< HEAD
    const OverViewContent = () => {
        return (
            <Stack direction="column">
                <Stack
                    direction="row"
                    sx={{
                        marginBottom: 12,
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                    }}
                >
                    <IDOParticipated myIDOs={myIDOs} />
                    <CurrentStakingPool />
                </Stack>

                <StakingBalance />
                <MyIDOArea myIDOs={myIDOs} />
                <MyINOArea />
                <ClaimAvailable />
            </Stack>
        );
    }

=======
>>>>>>> origin/master
    return (
        <>
            <SectionBox
                sx={{
                    backgroundImage: "url('/images/background/bg-ido.png')",
                }}
            >
                <Container maxWidth={'xl'}>
                    <Stack direction="column">
                        {!address && !wallet?.address ? (
                            <Box sx={{ display: 'flex', position: 'relative' }}>
                                <img
                                    src="images/my-profile/empty-state.svg"
                                    style={{
                                        opacity: 0.25,
                                        width: 500,
                                        height: 500,
                                        position: 'absolute',
                                        top: '5%',
                                        left: '32%',
                                    }}
                                    atl="token"
                                />
                                <Typography
                                    sx={{
                                        margin: '240px auto 190px auto',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: 28,
                                    }}
                                >
                                    PLEASE CONNECT WALLET BEFORE
                                </Typography>
                            </Box>
                        ) : (
                            <>
                                {isLoadingLogin || isLoadingGetProfile || !isLoginSuccess ? (
                                    <CircularProgress sx={{ margin: '128px auto 128px auto' }} />
                                ) : (
                                    <>
                                        <Grid container mb={3}>
                                            <Grid item xs={12} md={3.5}>
                                                {!isNull(defaultInfo) && (
                                                    <AreaInformation onOpen={handleOpen} DATA_DEFAULT={defaultInfo} id={id} />
                                                )}
                                            </Grid>
                                            <Grid item xs={12} md={8.5}>
                                                <OverviewTabs handleChangeTab={handleChangeTab} />
                                            </Grid>
                                        </Grid>
                                        {tabIndex === 0 && <OverViewContent />}
                                        {tabIndex === 1 && <StakingTable />}
                                    </>
                                )}
                            </>
                        )}
                    </Stack>
                </Container>
            </SectionBox>
            <CreateProfilePopup
                open={openCreateProfile}
                handleClose={setOpenCreateProfile}
                data={defaultInfo}
                id={id}
                handleRefresh={() => setFlag(!flag)}
                setDefaultInfo={setDefaultInfo}
            />
        </>
    );
}
