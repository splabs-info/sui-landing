import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Stack, Tab, styled } from '@mui/material';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home/HomeStyles';
import { useState } from 'react';
import Staking from './Stacking';
import Farming from './Farming';
import ComingSoon from 'pages/ComingSoon';
import { SuiContext } from 'provider/SuiProviderV2';
import React from 'react';
import { isEmpty } from 'lodash'
import { useWallet } from '@suiet/wallet-kit';
import { STAKING_PACKAGE_BASE, STAKING_STORAGE } from 'onchain/constants'
import { formatEther } from 'onchain/helpers'
import { toNumber } from 'lodash'
import { parseStructTag } from '@mysten/sui.js'
import * as moment from 'moment'

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
    const [tabIndex, setTabIndex] = useState('0');
    const [staking, setStaking] = React.useState([])

    const wallet = useWallet();
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

                // console.log('dynamicFieldObjects__', dynamicFieldObjects)
                const tag = parseStructTag(dynamicFieldObjects?.data?.content?.fields?.value?.type)
                const stakingInfoState = {
                    object_owner: dynamicFieldObjects?.data?.owner?.ObjectOwner,
                    id: dynamicFieldObjects?.data?.content?.fields?.id?.id,
                    name: dynamicFieldObjects?.data?.content?.fields?.name,
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


    const fetchStakingCer = React.useCallback(async () => {
        if (!wallet?.address || !wallet.connected) return;

        const filter = {
            MatchAll: [
                {
                    StructType: `${STAKING_PACKAGE_BASE}::certificate::InvestmentCertificate`,
                },
                {
                    AddressOwner: wallet?.address,
                },
            ],
        };

        const myStakingCer = await provider.getOwnedObjects({
            owner: wallet?.address,
            filter: filter,
            options: { showContent: true },
        })

        const infoStakingPromise = myStakingCer?.data.map(async (cer) => {
            const info = await provider.getDynamicFieldObject(({
                parentId: cer?.data?.objectId,
                name: { type: "0x1::string::String", value: 'info' }
            }))
            console.log('cerr', cer?.data?.content?.fields)
            console.log('info__', info?.data?.content?.fields)

            const formatInfo = {
                ...cer?.data?.content?.fields,
                ...info?.data?.content?.fields?.value?.fields,
                issue_date: moment(toNumber(cer?.data?.content?.fields?.issue_date)).format('LLLL'),
                stake_date: moment(toNumber(info?.data?.content?.fields?.value?.fields?.stake_date)).format("LLLL"),
                stake_amount: formatEther(info?.data?.content?.fields?.value?.fields?.stake_amount, 9),
                profit_claimed_amount: formatEther(info?.data?.content?.fields?.value?.fields?.profit_claimed_amount, 9),
                id: cer?.data?.content?.fields?.id?.id,
            }

            return formatInfo
        })

        // tx.moveCall({
        //     ...
        // })

        // cer avai => {

        // }
        // array [tx.moveCall. tx.mo]
        // tx.moveCall({

        // })



        const info = await Promise.all(infoStakingPromise)


        console.log('info___', info)
        if (!myStakingCer || isEmpty(myStakingCer)) return;

        console.log('')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet?.address, wallet.connected])

    React.useEffect(() => {
        fetchStakingInfo()
    }, [fetchStakingInfo])

    React.useEffect(() => {
        fetchStakingCer()
    }, [fetchStakingCer])

    // apr: 0.0456
    // days: "60"
    // description: "YouSUI is an All-in-One platform that runs on the Sui Blockchain, including DEX, Launchpad, NFT Marketplace and Bridge. It has plans for cross-chain compatibility and scalability beyond Sui. In addition, YouSUI will provide incubation and technical support for game and blockchain projects that are planning or oriented to transition to the Sui ecosystem."
    // id: "0x511acb5a323a5fc00bf8f565e8ff53084522ffc0965bfe0b4188f82f3b1ca2e1"
    // image: "https://yousui.io/images/staking/water-seek.jpg"
    // is_open: true
    // is_pause: true
    // link: "https://yousui.io/staking"
    // min_stake_amount: 300
    // name: "KT_TEST_PACKAGE_2"
    // object_owner: "0xdd6377910c05537982c2cb78bd388a9c79a3bf9efde76880a3bddd83b8c3abac"
    // unstake_soon_fee: 0.054
    // website: "https://yousui.io"
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
                                <Staking staking={staking} />
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
