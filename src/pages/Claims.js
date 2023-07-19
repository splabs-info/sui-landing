import { Box, Container, Typography } from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
import ClaimTokens from 'components/claims/ClaimTokens';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { find, get, isEmpty } from 'lodash';
import { useFormatRound } from 'onchain/hooks/use-format-round';
import { SuiContext } from 'provider/SuiProviderV2';
import { INVEST_CERTIFICATE } from 'onchain/constants';
import { findCertificate } from 'utils/util';
import React from 'react';

export default function Claims() {
    const [loading, setLoading] = React.useState();

    const isMobile = useResponsive('down', 'sm');

    const [vestingDetails, setVestingDetails] = React.useState({
        periodList: [],
        totalLockMount: '0',
        totalUnlockAmount: '0',
        numberOfCliffMonths: 0,
        numberOfLinearMonth: 0,
        tokenType: '',
    });

    const wallet = useWallet();
    const { provider, projects } = React.useContext(SuiContext);
    const { services } = useFormatRound();


    const findServiceVesting = (services) => {
        return find(services, (service) => get(service, 'name.value') === 'service_vesting');
    };

    const servicesVesting = React.useMemo(() => findServiceVesting(services), [services]);


    const fetchData = React.useCallback(async () => {
        if (!wallet?.address || !wallet?.connected) return;

        const owner = wallet?.address;

        const otherObjects = await provider.getOwnedObjects({
            owner,
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

            console.log('projectFields__', certificate?.data?.content?.fields)
            return {
                eventName: certificate?.data?.content?.fields?.event_name,
                issue_date: certificate?.data?.content?.fields?.issue_date || '',
                description: projectFields?.description || '',
                discord: projectFields?.discord || '',
                image_url: projectFields?.image_url || '',
                link_url: projectFields?.link_url || '',
                medium: projectFields?.medium || '',
                name: projectFields?.name || '',
                project_id: certificate?.data?.content?.fields.id.id || '',
                telegram: projectFields?.telegram || '',
                twitter: projectFields?.twitter || '',
                website: projectFields?.website || '',
            };
        });

        const formattedMyIdo = await Promise.all(promises);


        console.log('formattedMyIdo__', formattedMyIdo)
        // console.log('formattedMyIdo__', formattedMyIdo)
        // setMyIdo([...formattedMyIdo]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet?.address, wallet?.connected]);



    console.log('services__', services)
    const fetchVestingData = React.useCallback(async () => {
        try {
            if (!provider || isEmpty(services) || !wallet?.address) return;

            setLoading(true);

            const projectsDetail = await provider.getDynamicFieldObject({
                parentId: servicesVesting?.objectId,
                name: { type: 'address', value: wallet?.address },
            });

            console.log('projectsDetail__', projectsDetail)
            const projectInfo = await provider.getObject({
                id: servicesVesting?.objectId,
                options: { showContent: true },
            });

            const vestingState = {
                token_type: projectInfo?.data?.content?.fields?.info?.fields?.token_type,
                period_list: projectsDetail?.data?.content?.fields?.value?.fields?.period_list,
                total_lock_mount: projectsDetail?.data?.content?.fields?.value?.fields?.total_lock_mount,
                total_unlock_amount: projectsDetail?.data?.content?.fields?.value?.fields?.total_unlock_amount,
            };

            console.log('vestingState__', vestingState)
            setVestingDetails(vestingState);
            setLoading(false);
        } catch (error) {
            console.error('error', error);
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [services, servicesVesting?.objectId, wallet?.address]);

    const renderVestingState = React.useCallback(() => {
        if (!wallet?.address || (!wallet?.connected && !isEmpty(vestingDetails))) {
            return (
                <SectionBox
                    sx={{
                        backgroundImage: "url('/images/background/homebg6.png')",
                    }}
                >
                    <Box
                        component={'img'}
                        src="/images/background/bg-claim.png"
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            mixBlendMode: 'lighten',
                            top: 0,
                        }}
                    />
                    <Container maxWidth={'lg'}>
                        <Box position="relative">
                            <Typography variant="h5" textAlign={'center'} sx={{ fontFamily: 'Be Vietnam Bold', fontSize: 24 }}>
                                Please connect wallet
                            </Typography>
                        </Box>
                    </Container>
                </SectionBox>
            );
        } else {
            return (
                <SectionBox
                    sx={{
                        backgroundImage: isMobile
                            ? "url('/images/background/homebg3456.jpg')"
                            : "url('/images/background/homebg6.png')",
                    }}
                >
                    <Box
                        component={'img'}
                        src="/images/background/bg-claim.png"
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            mixBlendMode: 'lighten',
                            top: 0,
                        }}
                    />
                    <Container maxWidth={'lg'}>
                        {!isEmpty(vestingDetails) ? (
                            // <ClaimTokens
                            //     tokenType={vestingDetails?.token_type}
                            //     periodList={vestingDetails?.period_list}
                            //     totalLockAmount={vestingDetails?.total_lock_mount}
                            //     totalUnlockAmount={vestingDetails?.total_unlock_amount}
                            // />
                            <div />
                        ) : (
                            // <VestingContainer
                            //     tokenType={vestingDetails?.token_type}
                            //     periodList={vestingDetails?.period_list}
                            //     totalLockAmount={vestingDetails?.total_lock_mount}
                            //     totalUnlockAmount={vestingDetails?.total_unlock_amount}
                            // />
                            <div />
                        )}
                    </Container>
                </SectionBox>
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet?.address]);

    React.useEffect(() => {
        if (provider && projects) {
            fetchData();
            fetchVestingData();
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData, fetchVestingData, projects]);

    return (
        <Page title="Claim Tokens">
            {/* <SectionBox
                sx={{
                    backgroundImage: "url('/images/background/homebg6.png')",
                    paddingTop: isMobile && 5,
                }}
            >
                <Box
                    component={'img'}
                    src="/images/background/bg-claim.png"
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        mixBlendMode: 'lighten',
                        top: isMobile ? 120 : 40,
                    }}
                />
                <Container maxWidth={'xl'}>
                    {!wallet?.address || !wallet?.connected ? (
                        <Typography
                            sx={{
                                margin: '240px auto 190px auto',
                                fontWeight: 'bold',
                                fontSize: 32,
                                color: 'white',
                                width: '100%',
                                textAlign: 'center',
                            }}
                        >
                            Please Connect Your Wallet Before
                        </Typography>
                    ) : (
                        <>
                            <ClaimTokens myIDOs={myIdo} />
                        </>
                    )}
                </Container>
            </SectionBox> */}
            {renderVestingState()}
        </Page>
    );
}
