import { yupResolver } from '@hookform/resolvers/yup';
import { TabContext, TabPanel } from '@mui/lab';
import { Box, Container, Stack, Tab } from '@mui/material';
import { isValidSuiObjectId } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { IDObackground } from 'assets/background';
import { InputField } from 'components';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { isEmpty } from 'lodash';
import { BuyTokenButton } from 'modules/ido-round/components/RoundStyled';
import { Round } from 'modules/xui/Round';
import { SpecialTabList } from 'modules/xui/components/TabList';
import { useFormatRound } from 'onchain/hooks/use-format-round';
import { SuiContext } from 'provider/SuiProviderV2';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleNameRound } from 'utils/util';
import * as yup from 'yup';
import { useYouSuiStore } from 'zustand-store/yousui_store';

const XUIIDOContainer = () => {
    const isMobile = useResponsive('down', 'sm');
    const [claimInfo, setClaimInfo] = React.useState({});
    const [tabIndex, setTabIndex] = React.useState('0');
    const { provider } = React.useContext(SuiContext);

    const { objectIdOGRoleNft, setObjectId, clearObjectId } = useYouSuiStore();

    const { roundName } = useParams();
    const navigate = useNavigate();
    const formattedRoundName = handleNameRound(roundName);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue.toString());

        let path = '';
        if (newValue.toString() === '0') {
            path = '/ido-launchpad/og-sale';
        } else if (newValue.toString() === '1') {
            path = '/ido-launchpad/public-sale';
        }
        navigate(path);
    };

    const wallet = useWallet();

    const SaveObjectIdSchema = yup.object().shape({
        objectId: yup
            .string()
            .typeError('Must be string')
            .test('wallet-test', 'Connect your wallet before', () => wallet?.address && wallet?.connected)
            .test('input-check', 'Invalid Sui Object id', (value) => isValidSuiObjectId(value))
            .test('is-owner', 'You are not owner this object', async (value) => {
                if (value && isValidSuiObjectId(value)) {
                    const object = await provider.getObject({
                        id: value,
                        options: { showContent: true, showOwner: true },
                    });
                    return object?.data?.owner?.AddressOwner === wallet?.address;
                } else return;
            })
            .test('true-type', 'Your object id is not OG Role NFT', async (value) => {
                if (value && isValidSuiObjectId(value)) {
                    const object = await provider.getObject({
                        id: value,
                        options: { showContent: true, showOwner: true },
                    });
                    return JSON.stringify(object?.data?.content?.fields?.type) === '[111,103]';
                } else return;
            }),
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { isValid },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            objectId: objectIdOGRoleNft,
        },
        resolver: yupResolver(SaveObjectIdSchema),
    });

    const { infoRound, services, formatInfoRound } = useFormatRound();

    const fetchClaimInfo = React.useCallback(async () => {
        if (isEmpty(infoRound) || !infoRound || !wallet?.address) return;

        const info = await provider.getDynamicFieldObject({
            parentId: infoRound?.id,
            name: { type: 'address', value: wallet?.address },
        });

        if (!info || isEmpty(info)) return;

        const claimInfo = {
            final_accumulate_token: info?.data?.content?.fields?.value?.fields?.final_accumulate_token,
            total_accumulate_token: info?.data?.content?.fields?.value?.fields?.total_accumulate_token,
            investments: info?.data?.content?.fields?.value?.fields?.investments,
        };

        setClaimInfo(claimInfo);
    }, [infoRound, provider, wallet?.address]);

    const handleSave = async ({ objectId }) => {
        setObjectId(objectId);
        toast.success('Save successful');
    };

    React.useEffect(() => {

        if (!wallet?.address && !wallet?.connected && !wallet?.connecting) {
            clearObjectId('');
            reset({
                objectId: '',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet?.address, wallet?.connected, wallet?.status]);

    React.useEffect(() => {
        fetchClaimInfo();
    }, [fetchClaimInfo]);

    React.useEffect(() => {
        formatInfoRound(formattedRoundName);
    }, [formatInfoRound, formattedRoundName]);

    return (
        <Page title="IDO - Round">
            <SectionBox sx={{ backgroundImage: `url(${IDObackground})` }}>
                <Container maxWidth="xl">
                    <Box mt={isMobile ? 5 : 2} color={'#fff'}>
                        <TabContext value={tabIndex}>
                            <Stack
                                direction={isMobile ? 'column-reverse' : 'row'}
                                justifyContent={tabIndex === '0' ? 'space-between' : 'flex-end'}
                                alignItems={isMobile ? 'stretch' : 'center'}
                            >
                                <Stack direction={'row'} mt={isMobile ? 2 : 0} gap={2} sx={{ minHeight: '72px', height: 72 }}>
                                    {tabIndex === '0' && (
                                        <form onSubmit={handleSubmit(handleSave)} style={{ display: 'flex' }}>
                                            <InputField
                                                id="objectId"
                                                name="objectId"
                                                placeholder="Input Object ID of OG ROLE NFT"
                                                variant="outlined"
                                                size="small"
                                                control={control}
                                                mr={2}
                                                sx={{
                                                    width: isMobile ? '100%' : 350,
                                                    color: '#fff',
                                                    minHeight: 72,
                                                    backgroundColor: 'transparent !important',
                                                    '& .MuiInputBase-root': {
                                                        color: 'white',
                                                        background: 'transparent',
                                                        fontSize: 14,

                                                    },
                                                    '& .MuiOutlinedInput-input': {

                                                        backgroundColor: 'transparent !important',
                                                    },
                                                }}
                                            />
                                            <BuyTokenButton type="submit" disabled={!isValid} sx={{
                                                marginLeft: 2
                                            }}>
                                                Save
                                            </BuyTokenButton>
                                        </form>
                                    )}
                                </Stack>
                                <Stack alignItems={isMobile ? 'center' : 'flex-end'}>
                                    <SpecialTabList indicatorColor="none" onChange={handleChange}>
                                        <Tab label="OG Round" value="0" />
                                        <Tab label="Public Round" value="1" />
                                    </SpecialTabList>
                                </Stack>
                            </Stack>
                            <TabPanel value={tabIndex} sx={{ padding: { md: '32px 0 0', xs: '32px 8px 0' } }}>
                                <Round
                                    services={services}
                                    claimInfo={claimInfo}
                                    purchaseType={infoRound?.purchaseType}
                                    decimals={infoRound?.decimals || 9}
                                    endAt={infoRound?.endAt}
                                    roundName={formattedRoundName}
                                    projectName={infoRound?.projectName || 'YouSUI'}
                                    maxPurchase={infoRound?.maxPurchase}
                                    minPurchase={infoRound?.minPurchase}
                                    payments={infoRound?.payments}
                                    startAt={infoRound?.startAt}
                                    type={infoRound?.type}
                                    totalSold={infoRound?.totalSold}
                                    totalSupply={infoRound?.totalSupply}
                                />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Container>
            </SectionBox>
        </Page>
    );
};

export default XUIIDOContainer;
