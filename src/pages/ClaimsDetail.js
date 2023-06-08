import { Box, Container } from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
import VestingTokens from 'components/claims/VestingTokens';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { flattenDeep } from 'lodash';
import { SuiContext } from 'provider/SuiProvider';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
export default function ClaimsDetail() {
    const isMobile = useResponsive('down', 'sm');
    const [vesting, setVesting] = React.useState();

    const [vestingDetails, setVestingDetails] = React.useState({
        periodList: [],
        totalLockMount: '0',
        totalUnlockAmount: '0',
        numberOfCliffMonths: 0,
        numberOfLinearMonth: 0,
        tokenType: '',
    });

    const location = useLocation();
    const event = location.state?.eventName;

    const { projectId } = useParams();
    const decodedProjectId = decodeURIComponent(projectId);
    const wallet = useWallet();
    const { provider } = React.useContext(SuiContext);

    React.useEffect(() => {
        const fetchData = async () => {
            const allOfProjectDetail = await provider.getDynamicFields({
                parentId: decodedProjectId,
                options: { showContent: true },
            });

            if (!allOfProjectDetail || allOfProjectDetail.data.length <= 0) return;

            const vestingElement = allOfProjectDetail?.data.filter((element) => {
                const found = element.name?.value.split(' <> ');
                return found && found.includes('Vesting') && found.includes(event);
            });

            if (vestingElement.length > 0) {
                setVesting(vestingElement);
            }
        };

        fetchData();
    }, [provider, decodedProjectId, event]);

    React.useEffect(() => {
        if (!vesting || vesting.length <= 0) return;

        const fetchData = async () => {
            const promises = vesting.map(async (element) => {

                const vestingDetail = await provider.getObject({
                    id: element.objectId,
                    options: { showContent: true },
                });

                const dynamicFiledVesting = await provider.getDynamicFields({
                    parentId: element.objectId,
                    options: { showContent: true },
                });

                setVestingDetails(prev => ({
                    ...prev,
                    tokenType: vestingDetail?.data?.content?.fields?.info?.fields?.token_type,
                    numberOfCliffMonths: vestingDetail?.data?.content?.fields?.info?.fields?.number_of_cliff_months,
                    numberOfLinearMonth: vestingDetail?.data?.content?.fields?.info?.fields?.number_of_linear_months,
                }))

                if (!dynamicFiledVesting || dynamicFiledVesting.data.length <= 0) return null;

                const foundUserVesting = dynamicFiledVesting.data.find((item) => item?.name?.value === wallet?.address);
                if (!foundUserVesting) return null;

                const yourVesting = await provider.getObject({
                    id: foundUserVesting?.objectId,
                    options: { showContent: true },
                });

                if(!yourVesting) return null;

                return yourVesting;
            });

            const yourVestings = await Promise.allSettled(promises);

            if (!yourVestings || yourVestings.length <= 0) return;

            const periodList = flattenDeep(yourVestings.map(vesting => vesting?.value.data?.content?.fields?.value?.fields?.period_list));

            yourVestings.forEach((vesting) => {
                setVestingDetails(prev => ({
                    ...prev,
                    periodList,
                    totalLockMount: vesting.data?.content?.fields?.value?.fields?.total_lock_mount,
                    totalUnlockAmount: vesting.data?.content?.fields?.value?.fields?.total_unlock_amount,
                }));
            });
        };

        fetchData();
    }, [provider, vesting, wallet?.address]);


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
                    <VestingTokens
                        tokenType={vestingDetails?.tokenType}
                        periodList={vestingDetails?.periodList}
                        totalLockMount={vestingDetails?.totalLockMount}
                        totalUnlockAmount={vestingDetails?.totalUnlockAmount}
                    />
                </Container>
            </SectionBox>
        </Page>
    );
}
