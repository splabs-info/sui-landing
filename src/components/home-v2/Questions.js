import { TabContext } from '@mui/lab';
import { Box, Container, Tab } from '@mui/material';
import { useState } from 'react';
import useResponsive from '../../hooks/useResponsive';
import { CenterBox, CustomTabList, CustomTabPanel, SectionBox, TextTypography } from './HomeStyles';

const platforms = [
    {
        label: '1OneGame - IGO Platform',
        description:
            'Connect and distribute quality projects to all blockchain users through pre-designed and ready-to-integrate smart contracts.',
        background: '#1F171F',
    },
    {
        label: 'Oneverse - venture',
        description: 'Surprise for you at the final stage.',
        background: '#04051E',
    },
    {
        label: 'OneMarket - NFT Launchpad',
        description:
            'Build INO and Marketplace create a connected market for projects, Client buy NFT pre-sale or Box NFT with integrated gacha mechanism from projects.',
        background: '#181719',
    },
    {
        label: 'OneFarm - Defi System',
        description: 'Build a Yield Farming and Staking environment to create the best income for Clients.',
        background: '#1D1717',
    },
    {
        label: 'OnePad - IDO Platform',
        description:
            'OnePad selects and distributes quality Defi projects to users through a fully-featured and ready-to-integrate platform.',
        background: '#061D1A',
    },
];

export default function Questions() {
    const isDesktop = useResponsive('up', 'md');

    const [tabIndex, setTabIndex] = useState('0');

    const handleChange = (event, newValue) => {
        setTabIndex(newValue.toString());
    };

    return (
        <SectionBox
            sx={{
                backgroundImage: "url('/images/background/homebg6.png')",
                // padding: '100px 50px',
                backgroundSize: 'cover',
                objectFit: 'cover',
            }}
        >
            <Container maxWidth={'xl'}>
                <TabContext value={tabIndex}>
                    <Box>
                        <CustomTabList
                            onChange={handleChange}
                            indicatorColor="none"
                            variant={isDesktop ? 'fullWidth' : 'scrollable'}
                            scrollButtons="auto"
                        >
                            <Tab
                                value="0"
                                label={
                                    <div>
                                        <TextTypography variant="body1">How to get started ?</TextTypography>
                                        <TextTypography variant="body2">see more</TextTypography>
                                    </div>
                                }
                            />
                            <Tab
                                value="1"
                                label={
                                    <div>
                                        <TextTypography variant="body1">What is Tier System ?</TextTypography>
                                        <TextTypography variant="body2">see more</TextTypography>
                                    </div>
                                }
                            />
                            <Tab
                                value="2"
                                label={
                                    <div>
                                        <TextTypography variant="body1">How to join IDO ?</TextTypography>
                                        <TextTypography variant="body2">see more</TextTypography>
                                    </div>
                                }
                            />
                            <Tab
                                value="3"
                                label={
                                    <div>
                                        <TextTypography variant="body1">What is YouSUI ?</TextTypography>
                                        <TextTypography variant="body2">see more</TextTypography>
                                    </div>
                                }
                            />
                        </CustomTabList>
                    </Box>

                    <CustomTabPanel value={'0'}>
                        <CenterBox>
                            <Box sx={{ width: '100%' }} component={'img'} src="/images/home/video.png" alt="" />
                        </CenterBox>
                    </CustomTabPanel>
                    <CustomTabPanel value={'1'}>
                        <CenterBox>
                            <Box sx={{ width: '100%' }} component={'img'} src="/images/home/video.png" alt="" />
                        </CenterBox>
                    </CustomTabPanel>
                    <CustomTabPanel value={'2'}>
                        <CenterBox>
                            <Box sx={{ width: '100%' }} component={'img'} src="/images/home/video.png" alt="" />
                        </CenterBox>
                    </CustomTabPanel>
                    <CustomTabPanel value={'3'}>
                        <CenterBox>
                            <Box sx={{ width: '100%' }} component={'img'} src="/images/home/video.png" alt="" />
                        </CenterBox>
                    </CustomTabPanel>
                </TabContext>
            </Container>
        </SectionBox>
    );
}
