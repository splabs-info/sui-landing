import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Stack, Tab, styled } from '@mui/material';
import { parseStructTag } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home/HomeStyles';
import { isEmpty, toNumber } from 'lodash';
import { STAKING_STORAGE, XUI_TYPE } from 'onchain/constants';
import { formatEther, handleKeyType } from 'onchain/helpers';
import { SuiContext } from 'provider/SuiProviderV2';
import React, { useState } from 'react';
import Staking from './Stacking';
// import { useYouSuiStore } from 'zustand-store/yousui_store';
// import { useGetObject } from 'onchain/hooks/use-get-object';
const SpecialTabList = styled(TabList)(({ theme }) => ({
    transition: '1s',
    background: 'linear-gradient(360deg, rgba(40, 140, 197, 0.15) 50%, rgba(93, 213, 230, 0.15) 100.31%)',
    borderRadius: '16px',
    padding: 5,
    '& button': {
        padding: '8px 24px',
        color: '#AAA',
        borderRadius: '12px',
        zIndex: '1',
        minWidth: 180,
        '& span': {
            transition: '1s',
            background: 'transparent',
            borderRadius: '12px',
        },
        position: 'relative',
    },
    '& button.Mui-selected': {
        color: '#fff',
        transition: '1s',
        borderColor: 'white',
        boxShadow: 'inset 3px 5px 20px rgba(0, 0, 0, 0.5)',
        '& span': {
            transition: '1s',
            background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.3) -8.02%, rgba(109, 133, 218, 0.3) 98.69%)',
            opacity: '0.9',
            zIndex: '-1',
            borderRadius: '12px',
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '100%',
            background: 'linear-gradient(0deg, #00C5D3 0%, #42EECF 94.62%)',
            borderRadius: '12px',
            inset: '0px',
            padding: '1px',
            WebkitMask:
                'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
            WebkitMaskComposite: 'xor',
            zIndex: 0,
        },
    },
}));
export default function StakingFarming() {
    let actionList = [];
    const [action, setAction] = React.useState([]);

    const [tabIndex, setTabIndex] = useState('0');
    const [totalXUILocked, setTotalXUILocked] = React.useState(0);

    const [staking, setStaking] = React.useState([])

    const wallet = useWallet()

    const handleChange = (event, newValue) => {
        setTabIndex(newValue.toString());
    };

    const { provider } = React.useContext(SuiContext)

    const fetchStakingInfo = React.useCallback(async () => {
        if (!provider) return;
        try {
            let stakingName = [];
            const dynamicStakingFields = await provider.getDynamicFields({
                parentId: STAKING_STORAGE
            })

            dynamicStakingFields?.data?.forEach((item) => {
                stakingName.push(item?.name)
            })

            if (isEmpty(stakingName)) return;

            const promiseDynamic = stakingName.map(async (item) => {
                const dynamicFieldObjects = await provider.getDynamicFieldObject(({
                    parentId: STAKING_STORAGE,
                    name: item,
                }))

                const tag = parseStructTag(dynamicFieldObjects?.data?.content?.fields?.value?.type)

                const stakingInfoState = {
                    object_owner: dynamicFieldObjects?.data?.owner?.ObjectOwner,
                    id: dynamicFieldObjects?.data?.content?.fields?.id?.id,
                    key: dynamicFieldObjects?.data?.content?.fields?.value?.fields?.key,
                    name: dynamicFieldObjects?.data?.content?.fields?.value?.fields?.name,
                    apr: formatEther(dynamicFieldObjects?.data?.content?.fields?.value?.fields?.apr, 9),
                    days: toNumber(dynamicFieldObjects?.data?.content?.fields?.value?.fields?.days),
                    description: dynamicFieldObjects?.data?.content?.fields?.value?.fields?.description,
                    image: dynamicFieldObjects?.data?.content?.fields?.value?.fields?.image,
                    is_open: dynamicFieldObjects?.data?.content?.fields?.value?.fields?.is_open,
                    is_pause: dynamicFieldObjects?.data?.content?.fields?.value?.fields?.is_pause,
                    link: dynamicFieldObjects?.data?.content?.fields?.value?.fields?.link,
                    min_stake_amount: formatEther(dynamicFieldObjects?.data?.content?.fields?.value?.fields?.min_stake_amount, 9),
                    unstake_soon_fee: formatEther(dynamicFieldObjects?.data?.content?.fields?.value?.fields?.unstake_soon_fee, 9),
                    website: dynamicFieldObjects?.data?.content?.fields?.value?.fields?.website,
                    current_token_staking_symbol: tag?.typeParams[0]?.name,
                    current_token_staking_address: tag?.typeParams[0]?.address
                }

                return stakingInfoState;
            })

            const result = (await Promise.all(promiseDynamic)).filter(item => item !== null);

            if (isEmpty(result)) return;

            setStaking(result)
        } catch (error) {
            console.error('Fetch staking error', error)
        }
    }, [provider])


    const fetchCanStaking = React.useCallback(async () => {
        if (!wallet?.address || !wallet?.connected) return;

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

        if (!isEmpty(actionList)) {
            setAction(actionList)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet?.address, wallet?.connected])

    const fetchUserStakingInfo = React.useCallback(async () => {
        let totalXUILockedToken = 0;
        const formattedKey = handleKeyType(XUI_TYPE)
        const investList = await provider.getObject({
            id: STAKING_STORAGE,
            options: { showContent: true }
        })

        if (!investList) return console.log('Invest list invalid')

        const investContents = investList?.data?.content?.fields?.invest_list?.fields?.contents;
        if (investContents && investContents.length > 0) {
            investContents.forEach((e) => {
                const valueContents = e.fields.value.fields.contents;
                if (valueContents && valueContents.length > 0) {
                    valueContents.forEach((i) => {
                        if (i?.fields?.key === formattedKey) {
                            totalXUILockedToken += toNumber(formatEther(i.fields.value, 9));
                        }
                    });
                }
            });
        }
        setTotalXUILocked(totalXUILockedToken)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        fetchUserStakingInfo()
    }, [fetchUserStakingInfo])

    React.useEffect(() => {
        if (!wallet?.address || !wallet?.connected) return;
        fetchCanStaking()
    }, [fetchCanStaking, wallet?.address, wallet?.connected])

    React.useEffect(() => {
        fetchStakingInfo()
    }, [fetchStakingInfo])

    return (
        <Page title="Staking/Farming">
            <SectionBox
                sx={{
                    backgroundImage: "url('/images/background/homebg56.png')",
                }}
            >
                <Container maxWidth={'xl'}>
                    <Box mt={3} color={'#fff'}>
                        <TabContext value={tabIndex}>
                            <Stack alignItems={'center'}>
                                <SpecialTabList indicatorColor="none" onChange={handleChange}>
                                    <Tab label="Staking" value="0" />
                                    <Tab label="Farming" value="1" />
                                </SpecialTabList>
                            </Stack>
                            <TabPanel value={'0'} sx={{ padding: { md: '40px 0 0', xs: '32px 8px 0' } }}>
                                <Staking staking={staking} fetchUserStakingInfo={fetchUserStakingInfo} fetchCanStaking={fetchCanStaking} totalXUILocked={totalXUILocked} actionList={action} />
                            </TabPanel>
                            <TabPanel value={'1'} sx={{ padding: { md: '40px 0 0', xs: '32px 8px 0' } }}>
                                {/* <Farming /> */}
                                <Box mt={5}>
                                    <img src="/images/comingsoon/coming-soon.png" alt="" style={{ width: '35%', margin: '0 auto' }} />
                                </Box>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Container>
            </SectionBox>
        </Page>
    );
}
