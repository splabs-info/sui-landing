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

    const [periodList, setPeriodList] = React.useState();
    const [totalLockMount, setLockMount] = React.useState();
    const [totalUnlockAmount, setUnLockMount] = React.useState();
    const [allVestingDetail, setAllVestingDetail] = React.useState();


    const { projectId } = useParams();
    const decodedProjectId = decodeURIComponent(projectId);

    const location = useLocation();

    const event = location.state?.eventName;

    const wallet = useWallet();
    const { provider } = React.useContext(SuiContext);

    React.useEffect(() => {
        const fetchData = async () => {
            const allOfProjectDetail = await provider.getDynamicFields({
                parentId: decodedProjectId,
                options: { showContent: true },
            });

            console.log('allOfProjectDetail___', allOfProjectDetail)
            if (!allOfProjectDetail || allOfProjectDetail.data.length <= 0) return;

            const vestingElement = allOfProjectDetail?.data.filter((element) => {
                const found = element.name?.value.split(' <> ');
                return found && found.includes('Vesting');
            });

            console.log('vestingElement___', vestingElement)
            if (vestingElement.length > 0) {
                setVesting(vestingElement);
            }
        };

        fetchData();
    }, [provider, decodedProjectId]);

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

                // console.log('dynamicFiledVesting__', dynamicFiledVesting)

                if (!dynamicFiledVesting || dynamicFiledVesting.data.length <= 0) return null;

                const foundUserVesting = dynamicFiledVesting.data.find((item) => item?.name?.value === wallet?.address);

                if (!foundUserVesting) return null;

                const yourVesting = await provider.getObject({
                    id: foundUserVesting.objectId,
                    options: { showContent: true },
                });

                return yourVesting;
            });

            const yourVestings = await Promise.all(promises);
            const filteredVestings = yourVestings.filter((vesting) => vesting !== null);

        
            if (!filteredVestings || filteredVestings.length <= 0) return;

            setPeriodList(flattenDeep(filteredVestings.map((vesting) => vesting.data?.content?.fields?.value?.fields?.period_list)));

            filteredVestings.forEach((vesting) => {
                const lockMount = vesting.data?.content?.fields?.value?.fields?.total_lock_mount;
                const unLockAmount = vesting.data?.content?.fields?.value?.fields?.total_unlock_amount;
                setLockMount(lockMount);
                setUnLockMount(unLockAmount);
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
                        periodList={periodList}
                        totalLockMount={totalLockMount}
                        totalUnlockAmount={totalUnlockAmount}
                    />
                </Container>
            </SectionBox>
        </Page>
    );
}
