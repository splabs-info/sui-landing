import { useWallet } from '@suiet/wallet-kit';
import { SuiContext } from 'provider/SuiProvider';
import React from 'react';

const Vesting = () => {
    const [nameRound, setNameRound] = React.useState();

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

            setPeriodList(filteredVestings.map((vesting) => vesting.data?.content?.fields?.value?.fields?.period_list));

            filteredVestings.forEach((vesting) => {
                const lockMount = vesting.data?.content?.fields?.value?.fields?.total_lock_mount;
                const unLockAmount = vesting.data?.content?.fields?.value?.fields?.total_unlock_amount;
                setLockMount(lockMount)
                setUnLockMount(unLockAmount)
            })
        };

        fetchData();
    }, [provider, vesting, wallet?.address]);


    return <div>Test</div>;
};

export default Vesting;
