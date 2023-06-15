
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Stack, Tab, styled } from '@mui/material';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home/HomeStyles';
import { useState } from 'react';
import Staking from './Stacking';
import Farming from './Farming';

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
    const handleChange = (event, newValue) => {
        setTabIndex(newValue.toString());
    };

    return (
        <Page title="Staking/Farming">
            <SectionBox
                sx={{
                    backgroundImage: "url('/images/background/homebg56.png')",
                }}
            >
                <Container maxWidth={'xl'}>
                    <Box mt={5} color={'#fff'}>
                        <TabContext value={tabIndex}>
                            <Stack alignItems={'center'}>
                                <SpecialTabList
                                    indicatorColor='none'
                                    onChange={handleChange}
                                >
                                    <Tab label="Staking" value="0" />
                                    <Tab label="Farming" value="1" />
                                </SpecialTabList>
                            </Stack>
                            <TabPanel value={'0'} sx={{ padding: { md: '40px 0 0', xs: '32px 8px 0' } }}>
                                <Staking />
                            </TabPanel>
                            <TabPanel value={'1'} sx={{ padding: { md: '40px 0 0', xs: '32px 8px 0' } }}>
                                <Farming />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Container>
            </SectionBox>
        </Page>
    );
}
