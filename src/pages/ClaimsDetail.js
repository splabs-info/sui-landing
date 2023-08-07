import { Box, Container } from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
import VestingTokens from 'components/claims/VestingTokens';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { SuiContext } from 'provider/SuiProviderV2';
import React from 'react';
import { useParams } from 'react-router-dom';
export default function ClaimsDetail() {
    const isMobile = useResponsive('down', 'sm');

    const [vestingDetails, setVestingDetails] = React.useState({});

    const { vestingId } = useParams();
    const decodedProjectId = decodeURIComponent(vestingId);
    const wallet = useWallet();
    const { provider } = React.useContext(SuiContext);


    const fetchData = React.useCallback(async() => {
        if (!wallet?.address || !wallet.connected) return;
        const allOfProjectDetail = await provider.getDynamicFields({
            parentId: decodedProjectId,
            options: { showContent: true },
        });

        if (!allOfProjectDetail || allOfProjectDetail.data.length <= 0) return;

        const vestingElement = await provider.getObject({
            id: decodedProjectId,
            options: { showContent: true }
        })

        const vestingDetail = await provider.getDynamicFieldObject({
            parentId: decodedProjectId,
            name: { type: 'address', value: wallet?.address },
        })



        const vestingState = {
            projectName: vestingElement?.data?.content?.fields?.project?.fields?.name,
            tokenType: vestingElement?.data?.content?.fields?.info?.fields?.token_type,
            isOpenClaimVesting: vestingElement?.data?.content?.fields?.is_open_claim_vesting,
            periodList: vestingDetail?.data?.content?.fields?.value?.fields?.period_list,
            totalLockMount: vestingDetail?.data?.content?.fields?.value?.fields?.total_lock_mount,
            totalUnlockAmount: vestingDetail?.data?.content?.fields?.value?.fields?.total_unlock_amount,
        };

        setVestingDetails(vestingState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [decodedProjectId, wallet?.address, wallet.connected])

    React.useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <Page title="Vesting Token">
            <SectionBox
                sx={{
                    backgroundImage: "url('/images/background/homebg6.png')",
                }}
            >
                <Box
                    component={'img'}
                    src="/images/background/bg-claim-detail.png"
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        mixBlendMode: 'lighten',
                        top: isMobile ? 120 : 40,
                    }}
                />
                <Container maxWidth={'xl'}>
                    {vestingDetails?.periodList?.length === 0 ? (
                        <></>
                    ) : (
                        <>
                            <VestingTokens
                                fetchData={fetchData}
                                projectName={vestingDetails?.projectName}
                                tokenType={vestingDetails?.tokenType}
                                periodList={vestingDetails?.periodList}
                                totalLockMount={vestingDetails?.totalLockMount}
                                totalUnlockAmount={vestingDetails?.totalUnlockAmount}
                            />
                        </>
                    )}
                </Container>
            </SectionBox>
        </Page>
    );
}
