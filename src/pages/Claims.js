import { Box, Container, Typography } from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
import ClaimTokens from 'components/claims/ClaimTokens';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { isEmpty } from 'lodash';
import { INVEST_CERTIFICATE } from 'onchain/constants';
import { SuiContext } from 'provider/SuiProviderV2';
import React from 'react';
import { findCertificate } from 'utils/util';

export default function Claims() {
    // const [loading, setLoading] = React.useState();
    const [myIDOs, setMyIDOs] = React.useState();

    const isMobile = useResponsive('down', 'sm');
    const wallet = useWallet();
    const { provider, projects } = React.useContext(SuiContext);

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



    const renderVestingState = React.useCallback(() => {
        if (!wallet?.address || (!wallet?.connected)) {
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
                        {console.log('myIDOs__', myIDOs)}
                        {!isEmpty(myIDOs) ? (
                            <ClaimTokens
                                myIDOs={myIDOs}
                            />
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
    }, [wallet?.address, myIDOs]);

    React.useEffect(() => {
        if (provider && projects) {
            fetchData();
            // fetchVestingData();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData, projects]);

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
