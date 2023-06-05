import { Box, Container } from '@mui/material';
import VestingTokens from 'components/claims/VestingTokens';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import React from 'react';
import { useWallet } from '@suiet/wallet-kit';
import { SuiContext } from 'provider/SuiProvider';
import {flattenDeep} from 'lodash'
export default function ClaimsDetail() {
    const isMobile = useResponsive('down', 'sm');
    const [vesting, setVesting] = React.useState();
    const [periodList, setPeriodList] = React.useState();
    const [totalLockMount, setLockMount] = React.useState();
    const [totalUnlockAmount, setUnLockMount] = React.useState();
    const [allVestingDetail, setAllVestingDetail] = React.useState();

    const wallet = useWallet();
    const { provider, projects } = React.useContext(SuiContext);

    React.useEffect(() => {
        const fetchData = async () => {
            if (!projects || projects.length <= 0) return;

            const promises = projects.map(async (project) => {
                const allOfProjectDetail = await provider.getDynamicFields({
                    // Get parent id by url
                    parentId: project,
                    options: { showContent: true },
                });

                if (!allOfProjectDetail || allOfProjectDetail.data.length <= 0) return null;

                const vestingElement = allOfProjectDetail.data.filter((element) => {
                    const found = element.name?.value.split(' <> ');
                    return found && found.includes('Vesting');
                });

                if (vestingElement.length > 0) {
                    return vestingElement;
                }
            });

            const vestingElements = await Promise.all(promises);

            const filteredVestingElements = vestingElements.filter((element) => element !== null);

            setVesting(filteredVestingElements[0]);
        };

        fetchData();
    }, [projects, provider]);

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

            if(!filteredVestings || filteredVestings.length <= 0) return;

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
