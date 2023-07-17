import { TabContext, TabPanel } from '@mui/lab';
import { Box, Container, Stack, Tab, TextField } from '@mui/material';
import { IDObackground } from 'assets/background';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home/HomeStyles';
import { SaveButton } from 'components/sua/RoundStyled';
import useResponsive from 'hooks/useResponsive';
import { Round } from 'modules/xui/Round';
import { SpecialTabList } from 'modules/xui/components/TabList';
import { useFormatRound } from 'onchain/hooks/use-format-round';
import React from 'react';
const XUIIDOContainer = () => {
    const isMobile = useResponsive('down', 'sm');
    const [tabIndex, setTabIndex] = React.useState('0');

    const handleChange = (event, newValue) => {
        setTabIndex(newValue.toString());
    };

    const { infoRound, formatInfoRound } = useFormatRound();

    React.useEffect(() => {
        formatInfoRound('Public_Sale_1');
    }, [formatInfoRound]);

    console.log('infoRound___', infoRound);
    return (
        <Page title="IDO - Round">
            <SectionBox sx={{ backgroundImage: `"url(${IDObackground})"` }}>
                <Container maxWidth="xl">
                    <Box mt={isMobile ? 5 : 2} color={'#fff'}>
                        <TabContext value={tabIndex}>
                            <Stack
                                direction={isMobile ? 'column-reverse' : 'row'}
                                justifyContent={tabIndex === '0' ? 'space-between' : 'flex-end'}
                                alignItems={isMobile ? 'stretch' : 'center'}
                            >
                                {tabIndex === '0' && (
                                    <Stack direction={'row'} mt={isMobile ? 2 : 0} gap={2}>
                                        <TextField
                                            placeholder="Input Object ID of OG ROLE NFT"
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                width: isMobile ? '100%' : 350,

                                                color: '#fff',
                                                '& .MuiInputBase-root': {
                                                    color: 'white',
                                                    fontSize: 14,
                                                },
                                            }}
                                        />
                                        <SaveButton>Save</SaveButton>
                                    </Stack>
                                )}
                                <Stack alignItems={isMobile ? 'center' : 'flex-end'}>
                                    <SpecialTabList indicatorColor="none" onChange={handleChange}>
                                        <Tab label="OG Round" value="0" />
                                        <Tab label="Public Round" value="1" />
                                    </SpecialTabList>
                                </Stack>
                            </Stack>
                            <TabPanel value={tabIndex} sx={{ padding: { md: '32px 0 0', xs: '32px 8px 0' } }}>
                                <Round
                                    decimals={infoRound?.decimals}
                                    endAt={infoRound?.endAt}
                                    roundName={'Public_Sale_1'}
                                    projectName={infoRound?.projectName}
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
