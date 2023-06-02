import { SuiContext } from 'provider/SuiProvider';
import React from 'react';
const Vesting = () => {
    const [nameRound, setNameRound] = React.useState();
    const [vesting, setVesting] = React.useState();
    const [allVestingDetail, setAllVestingDetail] = React.useState();

    const { provider, projects } = React.useContext(SuiContext);

    React.useEffect(() => {
        const fetchData = async () => {
            if (!projects || projects.length <= 0) return;

            for (const project of projects) {
                const allOfProjectDetail = await provider.getDynamicFields({
                    parentId: project,
                    options: { showContent: true },
                });

                if (!allOfProjectDetail || allOfProjectDetail.data.length <= 0) continue;

                const vestingElement = allOfProjectDetail.data.filter((element) => {
                    const found = element.name?.value.split(' <> ');
                    return found && found.includes('Vesting');
                });

                if (vestingElement.length > 0) {
                    setVesting([...vestingElement]);
                    break; // Stop the loop once a match is found
                }
            }
        };

        fetchData();
    }, [projects, provider, vesting]);



    React.useEffect(() => {
        if(!vesting || vesting?.length <= 0) return;
        vesting.forEach(async (element) => {
            const vestingDetail = await provider.getObject({
                id: element.objectId,
                options: { showContent: true },
            })

            console.log('vestingDetail__', vestingDetail)
        })
    }, [provider, vesting])


    return <div>Test</div>;
};

export default Vesting;
