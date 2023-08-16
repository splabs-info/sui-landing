/* eslint-disable jsx-a11y/alt-text */
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
import { CreateProfilePopup } from 'components';
import { SectionBox } from 'components/home/HomeStyles';
import { isEmpty, isNull } from 'lodash';
import { INVEST_CERTIFICATE, PACKAGE_BASE, STAKING_STORAGE, XUI_TYPE } from 'onchain/constants';
import { formatEther, handleKeyType } from 'onchain/helpers';
import { SuiContext } from 'provider/SuiProviderV2';
import queryString from 'query-string';
import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { findCertificate } from 'utils/util';
import { ClaimAvailable } from './ClaimAvailable';
import { CurrentStakingPool } from './CurrentStakingPool';
import { IDOParticipated } from './IDOParticipated';
import AreaInformation from './Information';
import { MyIDOArea } from './MyIDO';
import { MyINOArea } from './MyINO';
import OverviewTabs from './OverviewTabs';
import { StakingBalance } from './StakingBalance';
import StakingTable from './my-staking/StakingTable';
import { useYouSuiStore } from 'zustand-store/yousui_store';
export default function MyInfo() {
    let actionList = [];
    const [action, setAction] = React.useState([])
    const [openCreateProfile, setOpenCreateProfile] = React.useState();
    const wallet = useWallet();

    const [defaultInfo, setDefaultInfo] = React.useState({
        gender: 'other',
        avatar: '',
        email: '',
    });

    const [totalXUILocked, setTotalXUILocked] = React.useState(0)
    const [id, setId] = useState(null);
    const [myIDOs, setMyIDOs] = React.useState([]);
    const [flag, setFlag] = React.useState(false);
    const { provider, projects, allAssets } = React.useContext(SuiContext);
    // const { mutateAsync: login, isLoading: isLoadingLogin, isSuccess: isLoginSuccess } = useLogin();
    // const { profile, isLoading: isLoadingGetProfile, isSuccess: isGetProfileSuccess } = useGetProfile(id);
    const location = useLocation();
    const { tab: tabIndexFromUrl } = queryString.parse(location.search);
    const initialTabIndex = Number(tabIndexFromUrl) || 0; // Đảm bảo rằng tabIndex là số
    const [tabIndex, setTabIndex] = useState(initialTabIndex);

    const { currentUser } = useYouSuiStore();

    console.log('currentUser__', currentUser)
    const navigate = useNavigate();
    const handleChangeTab = (index) => {
        setTabIndex(index);
        navigate(`my-profile/${index}`);
    };

    const xuiHold = React.useMemo(() => {
        if (!wallet?.address || !wallet?.connected) return;
        if (isEmpty(allAssets)) return;
        const xui = allAssets.find((i) => i.coinType === XUI_TYPE)
        if (!xui || isEmpty(xui)) return;
        const formattedXui = formatEther(xui.balance, 9)
        return formattedXui;
    }, [allAssets, wallet?.address, wallet?.connected])

    React.useEffect(() => {
        setTabIndex(Number(tabIndexFromUrl) || 0);
    }, [tabIndexFromUrl]);

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

    const fetchUserStakingInfo = React.useCallback(async () => {
        if (!wallet.address || !wallet?.connected) return;
        let totalXUILockedToken;

        const dynamicData = await provider.getObject({
            id: STAKING_STORAGE,
            options: { showContent: true },
        });

        if (!dynamicData) return console.log('Dynamic data invalid');

        dynamicData?.data?.content?.fields?.access_list.fields.contents.forEach((a) => {
            if (a?.fields?.key === wallet?.address) {
                if (!isEmpty(a?.fields?.value?.fields?.contents)) {
                    a?.fields?.value?.fields?.contents.forEach((i) => {
                        const formattedAction = {
                            action: i?.fields?.key,
                            time: i?.fields?.value
                        }
                        actionList.push(formattedAction)
                    })
                } else {
                    return actionList;
                }
            }
        });

        const investList = dynamicData?.data?.content?.fields?.invest_list?.fields?.contents.filter(
            (i) => i?.fields.key === wallet?.address
        );
        if (!investList) return;

        if (isEmpty(investList)) {
            return setTotalXUILocked(0)
        }
        investList.forEach((i) =>
            i?.fields?.value?.fields?.contents.forEach((e) => {
                const formattedKey = handleKeyType(XUI_TYPE)
                if (e?.fields?.key === formattedKey) {
                    totalXUILockedToken = e?.fields?.value;
                } else return;
            })
        );

        const formattedTotalXUILocked = formatEther(totalXUILockedToken, 9);

        if (!isEmpty(actionList)) {
            setAction(actionList)
        }
        setTotalXUILocked(formattedTotalXUILocked);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet.address, wallet?.connected]);

    React.useEffect(() => {
        fetchUserStakingInfo();
    }, [fetchUserStakingInfo]);

    React.useEffect(() => {
        if (provider && projects) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData, projects]);



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
                <StakingBalance totalXUILocked={totalXUILocked} xuiHold={xuiHold} />
                <MyIDOArea myIDOs={myIDOs} />
                <MyINOArea />
                <ClaimAvailable />
            </Stack>
        );
    }

    return (
        <>
            <SectionBox
                sx={{
                    backgroundImage: "url('/images/background/bg-ido.png')",
                }}
            >
                <Container maxWidth={'xl'}>
                    <Stack direction="column">
                        {!wallet?.address ? (
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
                                <Grid container mb={3}>
                                    <Grid item xs={12} md={3.5}>
                                        {!isNull(defaultInfo) && (
                                            <AreaInformation onOpen={handleOpen} DATA_DEFAULT={defaultInfo} id={id} />
                                        )}
                                    </Grid>
                                    <Grid item xs={12} md={8.5}>
                                        <OverviewTabs handleChangeTab={handleChangeTab} totalXUILocked={totalXUILocked} />
                                    </Grid>
                                </Grid>
                                {tabIndex === 0 && <OverViewContent />}
                                {tabIndex === 1 && <StakingTable fetchUserStakingInfo={fetchUserStakingInfo} actionList={action} />}
                            </>
                        )}
                    </Stack>
                </Container>
            </SectionBox>
            <CreateProfilePopup
                open={openCreateProfile}
                handleClose={setOpenCreateProfile}
                data={defaultInfo}
                id={currentUser ? currentUser?.account?.ID : null}
                handleRefresh={() => setFlag(!flag)}
                setDefaultInfo={setDefaultInfo}
            />
        </>
    );
}
