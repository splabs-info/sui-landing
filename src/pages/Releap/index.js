import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container, Grid, InputAdornment, Stack, Tab } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { isValidSuiObjectId } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { IconCircleCheck } from '@tabler/icons-react';
import { IDObackground } from 'assets/background';
import { InputField } from 'components';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { isEmpty } from 'lodash';
import { BuyTokenButton } from 'modules/ido-round/components/RoundStyled';
import { Round } from 'modules/xui/Round';
import { STAKING_STORAGE, XUI_TYPE } from 'onchain/constants';
import { formatEther, handleKeyType } from 'onchain/helpers';
import { subscribe } from 'onchain/hooks/subscribe';
import { useFormatRound } from 'onchain/hooks/use-format-round';
import { SuiContext } from 'provider/SuiProviderV2';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleNameRound } from 'utils/util';
import * as yup from 'yup';
import { useYouSuiStore } from 'zustand-store/yousui_store';
import { TabContext, TabPanel } from '@mui/lab';
import { SpecialTabList } from 'modules/xui/components/TabList';
import {handleUrl} from 'onchain/utils/common'
const ReleapContainer = () => {
    let project = 'Releap';
    const isMobile = useResponsive('down', 'sm');
    const { provider, fetchData } = React.useContext(SuiContext);
    const [hasEvent, setHasEvent] = React.useState(false);
    const [claimInfo, setClaimInfo] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [totalXUILocked, setTotalXUILocked] = React.useState(0);
    const [tabIndex, setTabIndex] = React.useState('0');

    const navigate = useNavigate();

    // const location = useLocation()
    // project = handleUrl(location?.pathname)

    const { round } = useParams();

    const formattedRoundName = React.useMemo(() => handleNameRound(round), [round]);

    const { infoRound, services, formatInfoRound } = useFormatRound();

    const { objectIdOGRoleNft, setObjectId, clearObjectId } = useYouSuiStore();
    const wallet = useWallet();

    const tabToPath = {
        0: '/ido-launchpad/releap/community-sale',
        1: '/ido-launchpad/releap/public-sale',
    };

    const handleChange = (event, newValue) => {
        setTabIndex(newValue.toString());

        let newPath = tabToPath[newValue.toString()];
        if (newPath) {
            navigate(newPath);
        } else {
            console.error('Invalid tab index');
        }
    };

    const SaveNftIdSchema = yup.object().shape({
        objectId: yup
            .string()
            .typeError('Must be string')
            .test('wallet-test', 'Connect your wallet before', () => wallet?.address && wallet?.connected)
            .test('input-check', 'Invalid Sui Object id', (value) => isValidSuiObjectId(value))
            .test('is-owner', 'You are not owner this object', async (value) => {
                if (value && isValidSuiObjectId(value)) {
                    const object = await provider.getObject({
                        id: value,
                        options: { showContent: true, showOwner: true },
                    });
                    return object?.data?.owner?.AddressOwner === wallet?.address;
                } else return;
            })
            .test('true-type', 'Your object id is not YouSUI Tier NFT', async (value) => {
                if (value && isValidSuiObjectId(value)) {
                    const object = await provider.getObject({
                        id: value,
                        options: { showContent: true, showOwner: true },
                    });
                    return (
                        JSON.stringify(object?.data?.content?.fields?.type) === '[53]' ||
                        JSON.stringify(object?.data?.content?.fields?.type) === '[52]'
                    );
                } else return;
            }),
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { isValid },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            objectId: objectIdOGRoleNft,
        },
        resolver: yupResolver(SaveNftIdSchema),
    });

    const handleSave = async ({ objectId }) => {
        setObjectId(objectId);
        toast.success('Save successful');
    };
    React.useEffect(() => {
        if (
            !wallet?.name &&
            !wallet?.address &&
            !wallet?.connected &&
            !wallet?.connecting &&
            wallet?.status === 'disconnected'
        ) {
            clearObjectId('');
            reset({
                objectId: '',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet?.address, wallet?.connected, wallet?.connecting, wallet?.name, wallet?.status]);

    const fetchClaimInfo = React.useCallback(async () => {
        if (isEmpty(infoRound) || !infoRound || !wallet?.address) return;
        try {
            const info = await provider.getDynamicFieldObject({
                parentId: infoRound?.id,
                name: { type: 'address', value: wallet?.address },
            });

            if (!info || isEmpty(info)) return;

            const claimInfo = {
                final_accumulate_token: info?.data?.content?.fields?.value?.fields?.final_accumulate_token,
                total_accumulate_token: info?.data?.content?.fields?.value?.fields?.total_accumulate_token,
                investments: info?.data?.content?.fields?.value?.fields?.investments,
            };

            setClaimInfo(claimInfo);
        } catch (error) {
            console.log('error__fetchClaimInfo', error);
        }
    }, [infoRound, provider, wallet?.address]);

    const fetchUserStakingInfo = React.useCallback(async () => {
        if (!wallet.address || !wallet?.connected) return;
        let totalXUILockedToken;

        const dynamicData = await provider.getObject({
            id: STAKING_STORAGE,
            options: { showContent: true },
        });

        if (!dynamicData) return console.log('Dynamic data invalid');

        const investList = dynamicData?.data?.content?.fields?.invest_list?.fields?.contents.filter(
            (i) => i?.fields.key === wallet?.address
        );
        if (!investList || isEmpty(investList)) return;
        investList.forEach((i) =>
            i?.fields?.value?.fields?.contents.forEach((e) => {
                const formattedKey = handleKeyType(XUI_TYPE);
                if (e?.fields?.key === formattedKey) {
                    totalXUILockedToken = e?.fields?.value;
                } else return;
            })
        );

        const formattedTotalXUILocked = formatEther(totalXUILockedToken, 9);
        setTotalXUILocked(formattedTotalXUILocked);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet.address, wallet?.connected]);

    React.useEffect(() => {
        fetchClaimInfo();
    }, [fetchClaimInfo]);

    React.useEffect(() => {
        fetchUserStakingInfo();
    }, [fetchUserStakingInfo]);

    React.useEffect(() => {
        formatInfoRound(formattedRoundName, project);
    }, [formatInfoRound, formattedRoundName, project]);

    React.useEffect(() => {
        if (hasEvent) {
            fetchData();
            setHasEvent(false)
        }
    }, [fetchData, hasEvent, setHasEvent]);

    React.useEffect(() => {
        try {
            if (!round || isEmpty(infoRound)) {
                setLoading(true);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.log('error__fetchCore', error);
        }
    }, [infoRound, round, loading]);

    React.useEffect(() => {
        const pathToTab = {
            '/ido-launchpad/releap/community-sale': '0',
            '/ido-launchpad/releap/public-sale': '1',
        };

        let path = window.location.pathname;
        let newTabIndex = pathToTab[path];
        if (newTabIndex) {
            setTabIndex(newTabIndex);
        } else {
            console.error('Invalid path');
        }
    }, []);

    React.useEffect(() => {
        subscribe(setHasEvent)
    }, [])

    
    return (
        <Page title="IDO - Reap">
            <SectionBox sx={{ backgroundImage: `url(${IDObackground})` }}>
                <Container maxWidth="xl">
                    <Box mt={isMobile ? 5 : 2} color={'#fff'}>
                        {loading ? (
                            <Box sx={{ margin: '108px auto auto auto', textAlign: 'center' }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <TabContext value={tabIndex}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={4}>
                                            <Stack alignItems={isMobile ? 'center' : 'flex-end'}>
                                                <SpecialTabList indicatorColor="none" onChange={handleChange} sx={{ width: '100%' }}>
                                                    <Tab label="COMMUNITY ROUND" value="0" sx={{ width: '50%', fontSize: 16 }} />
                                                    <Tab label="PUBLIC ROUND" value="1" sx={{ width: '50%', fontSize: 16 }} />
                                                </SpecialTabList>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={8} alignItems={'space-between'}>
                                            <Stack
                                                direction={'row'}
                                                mt={isMobile ? 2 : 0}
                                                gap={2}
                                                sx={{ minHeight: '72px', height: 72, justifyContent: 'flex-end' }}
                                            >
                                                {tabIndex === '0' && (
                                                    <form onSubmit={handleSubmit(handleSave)} style={{ display: 'flex', width: '100%' }}>
                                                        <InputField
                                                            id="objectId"
                                                            name="objectId"
                                                            placeholder="Input Object ID of Tier NFT"
                                                            variant="outlined"
                                                            size="small"
                                                            control={control}
                                                            mr={2}
                                                            sx={{
                                                                color: '#fff',
                                                                minHeight: 72,
                                                                backgroundColor: 'transparent !important',
                                                                '& .MuiInputBase-root': {
                                                                    color: 'white',
                                                                    background: 'transparent',
                                                                    fontSize: 14,
                                                                },
                                                                '& .MuiOutlinedInput-input': {
                                                                    backgroundColor: 'transparent !important',
                                                                },
                                                            }}
                                                            box={{
                                                                width: '100%',
                                                            }}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        {isValid ? <IconCircleCheck color="#21c4a4" /> : ''}
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                        />
                                                        <BuyTokenButton
                                                            type="submit"
                                                            disabled={!isValid}
                                                            sx={{
                                                                borderRadius: '10px',
                                                                width: isMobile ? '100%' : 172,
                                                                marginLeft: 2,
                                                            }}
                                                        >
                                                            Save
                                                        </BuyTokenButton>
                                                    </form>
                                                )}

                                            </Stack>

                                        </Grid>
                                    </Grid>

                                    <TabPanel value={tabIndex} sx={{ padding: { md: '32px 0 0', xs: '32px 8px 0' } }}>
                                        <Round
                                            services={services}
                                            claimInfo={claimInfo}
                                            // whiteList={whiteList}
                                            iconUrl={infoRound?.iconUrl}
                                            totalXUILocked={totalXUILocked}
                                            purchaseType={infoRound?.purchaseType}
                                            decimals={infoRound?.decimals || 9}
                                            endAt={infoRound?.endAt}
                                            telegram={infoRound?.telegram}
                                            twitter={infoRound?.twitter}
                                            discord={infoRound?.discord}
                                            medium={infoRound?.medium}
                                            roundName={formattedRoundName}
                                            projectName={infoRound?.projectName || 'YouSUI'}
                                            maxPurchase={infoRound?.maxPurchase}
                                            minPurchase={infoRound?.minPurchase}
                                            payments={infoRound?.payments}
                                            startAt={infoRound?.startAt}
                                            symbol={infoRound?.symbol}
                                            type={infoRound?.type}
                                            imageUrl={infoRound?.imageUrl}
                                            tokenName={infoRound?.tokenName}
                                            totalSold={infoRound?.totalSold}
                                            totalSupply={infoRound?.totalSupply}
                                            description={infoRound?.description}
                                            fetchClaimInfo={fetchClaimInfo}
                                        />
                                    </TabPanel>
                                </TabContext>
                            </>
                        )}
                    </Box>
                </Container>
            </SectionBox>
        </Page>
    );
};

export default ReleapContainer;
