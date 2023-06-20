import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Stack, Tab, TextField, styled, useRadioGroup } from '@mui/material';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home/HomeStyles';
import { useState } from 'react';
import { Round } from './components/Round';
import { SaveButton } from './components/RoundStyled';
import useResponsive from 'hooks/useResponsive';

const SpecialTabList = styled(TabList)(({ theme }) => ({
    transition: '1s',
    background: 'linear-gradient(360deg, rgba(40, 140, 197, 0.15) 50%, rgba(93, 213, 230, 0.15) 100.31%)',
    borderRadius: '15px',
    position: 'relative',
    '&:before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        background: 'linear-gradient(178.73deg, #68E6B8 -8.02%, #6D85DA 98.69%)',
        borderRadius: 15,
        padding: '2px',
        inset: '0px',
        WebkitMask:
            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
        WebkitMaskComposite: 'xor',
        zIndex: 0,
    },
    '& button': {
        padding: '8px 24px',
        color: '#AAA',
        borderRadius: '15px',
        zIndex: '1',
        minWidth: 180,
        '& span': {
            transition: '0.5s',
            background: 'transparent',
            borderRadius: '12px',
        },
        position: 'relative',
    },
    '& button.Mui-selected': {
        color: '#fff',
        transition: '1s',
        borderColor: 'white',
        boxShadow: ' 0px 0px 8px #4191C9',
        '& span': {
            transition: '0.5s',
            background: 'linear-gradient(178.73deg, #68E6B8 -8.02%, #6D85DA 98.69%)',
            opacity: '0.9',
            zIndex: '-1',
            borderRadius: '15px',
        },
        position: 'relative',
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '100%',
            background: 'linear-gradient(178.73deg, #68E6B8 -8.02%, #6D85DA 98.69%)',
            borderRadius: 15,
            padding: '2px',
            inset: '0px',
            WebkitMask:
                'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
            WebkitMaskComposite: 'xor',
            zIndex: 0,
        },
    },
    [theme.breakpoints.down('sm')]: {
        '& button': {
            padding: '4px 16px',
            minWidth: 150,
        },
    }
}));
export default function IDORound() {
    const isMobile = useResponsive('down', 'sm');
    const [tabIndex, setTabIndex] = useState('0');
    const handleChange = (event, newValue) => {
        setTabIndex(newValue.toString());
    };
    return (
        <Page title="IDO - Round">
            <SectionBox sx={{ backgroundImage: "url('/images/background/homebg56.png')" }} >
                <Container maxWidth="xl">
                    <Box mt={isMobile ? 5 : 2} color={'#fff'}>
                        <TabContext value={tabIndex}>
                            <Stack direction={isMobile ? 'column-reverse' : 'row'}
                                justifyContent={tabIndex === '0' ? 'space-between' : 'flex-end'}
                                alignItems={isMobile ? 'stretch' : 'center'}
                            >
                                {tabIndex === '0' &&
                                    <Stack direction={'row'}
                                        mt={isMobile ? 2 : 0}
                                        gap={2}>
                                        <TextField
                                            label="Input Object ID of OG ROLE NFT"
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                width: isMobile ? '100%' : 300,

                                                color: '#fff',
                                                '& .MuiInputBase-root': {
                                                    color: 'white',
                                                    fontSize: 14,
                                                },
                                            }}

                                        />
                                        <SaveButton>Save</SaveButton>
                                    </Stack>}
                                <Stack alignItems={isMobile ? 'center' : 'flex-end'}>
                                    <SpecialTabList
                                        indicatorColor='none'
                                        onChange={handleChange}
                                    >
                                        <Tab label="OG Round" value="0" />
                                        <Tab label="Public Round" value="1" />
                                    </SpecialTabList>
                                </Stack>
                            </Stack>
                            <TabPanel value={tabIndex} sx={{ padding: { md: '32px 0 0', xs: '32px 8px 0' } }}>
                                <Round round={tabIndex} />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Container>
            </SectionBox>
        </Page >
    );
}
