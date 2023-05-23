import { Box, Grid, Stack, Tab, alpha, styled } from '@mui/material';
import useResponsive from 'hooks/useResponsive';
import { AvatarPool } from './AvatarPool';
import { OGRound } from './round/OGRound';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react';
import { PublicRound } from './round/PublicRound';

const CustomTabList = styled(TabList)(({ theme }) => ({
    transition: '1s',
    '& button': {
        padding: '1.75rem',
        zIndex: '1',
        textShadow: '0 0 10px rgb(255,255,255,0.7)',
        color: alpha('#fff', 0.5),
        fontWeight: 700,
        opacity: 1,
        fontSize: '1.25rem',
        '& span': {
            background: 'linear-gradient(0deg, #8CC0CC 0%, rgb(41,31,65,0) 20%);',
        },
    },
    '& .MuiTabs-flexContainer': {
        justifyContent: { md: 'center', xs: 'flex-start' },
        overflowX: { md: 'hidden', xs: 'auto' },
        '::-webkit-scrollbar': {
            display: 'none',
        },
    },
    '& button.Mui-selected': {
        color: alpha('#fff', 1),
        '& span': {
            background: 'linear-gradient(0deg, #8CC0CC 0%, rgb(90,111,134,0.5) 50%, transparent 100%);',
            zIndex: -1,
        },
    },
    '& .MuiTypography-body1': {
        fontSize: '0.95rem',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
    },
    '& .MuiTypography-body2': {
        fontSize: '0.8rem',
    },
    [theme.breakpoints.down('md')]: {
        '& button': {
            padding: '0.5rem 1rem',
        },

        '& .MuiTabs-scrollButtons.Mui-disabled ': {
            opacity: '0.3',
        },
    },
}));
export const Pool = () => {
    const isMobile = useResponsive('down', 'sm');

    const [value, setValue] = useState(0);
    const isDesktop = useResponsive('up', 'md');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Grid container spacing={2} sx={{ marginTop: 12, marginBottom: 10 }}>
            <Grid xs={12} md={6} item>
                <AvatarPool />
            </Grid>
            <Grid width="100%" xs={12} md={6} item>
                <Box sx={{ width: '100%' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <CustomTabList
                                onChange={handleChange}
                                indicatorColor="none"
                                variant={isDesktop ? 'fullWidth' : 'scrollable'}
                                scrollButtons="auto"
                            >
                                <Tab label="OG ROUND" />
                                <Tab label="PUBLIC ROUND 1" />
                                <Tab label="PUBLIC ROUND 2" />
                            </CustomTabList>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <OGRound />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <PublicRound />
                        </TabPanel>
                    </TabContext>
                </Box>
            </Grid>
        </Grid>
    );
};
