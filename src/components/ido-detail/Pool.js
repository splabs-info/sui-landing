import { TabContext, TabList } from '@mui/lab';
import { Box, Grid, Tab, Typography, alpha, styled } from '@mui/material';
import useResponsive from 'hooks/useResponsive';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { AvatarPool } from './AvatarPool';
import { OGRound } from './round/OGRound';
import { PublicRound } from './round/PublicRound';
import { SocialFooter } from 'layouts/FooterSection';

const CustomTabList = styled(TabList)(({ theme }) => ({
    transition: '1s',
    position: 'relative',
    borderRadius: '12px',
    '&::before': {
        content: "''",
        position: 'absolute',
        inset: '0px',
        borderRadius: '12px',
        padding: ' 2px',
        background: 'linear-gradient(178.73deg, #68E6B8 -8.02%, #6D85DA 98.69%)',
        WebkitMask:
            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
        WebkitMaskComposite: 'xor',
        zIndex: '1',
    },
    '& button': {
        padding: '0.75rem 1rem',
        zIndex: '1',
        textShadow: '0 0 10px rgb(255,255,255,0.7)',
        color: alpha('#fff', 0.5),
        opacity: 1,
        fontSize: '1rem',
        '& span': {
            background:
                'linear-gradient(178.73deg, rgba(104, 230, 184, 0.3) -8.02%, rgba(109, 133, 218, 0.3) 98.69%)',
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
        fontWeight: 700,
        '& span': {
            background: 'linear-gradient(178.73deg, #68E6B8 -8.02%, #6D85DA 98.69%)',
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

const AvatarBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    background: 'linear-gradient(0deg, rgba(0, 197, 211, 0.12) 38.68%, rgba(66, 238, 207, 0.12) 94.62%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: 'inset 0px 0px 20px rgba(255, 255, 255, 0.3)',
}));
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ mt: 2 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export const Pool = ({ balances, totalSold, totalSupply, ratio, participants, participantsWallet }) => {
    const isMobile = useResponsive('down', 'sm');

    const [value, setValue] = useState(0);
    const isDesktop = useResponsive('up', 'md');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Grid container spacing={4} sx={{ marginTop: 12, marginBottom: 10 }}>
            <Grid xs={12} md={5} item>
                <AvatarBox>
                    <AvatarPool />
                </AvatarBox>
                <Typography variant="h3" color={'white'} mb={1} mt={2}>
                    YOUSUI PJT
                </Typography>
                <Typography variant='body1' color={'white'} mb={2}>
                    SUA is a token of Meta version. It has no intrinsic value or expectation of financial return.
                    There is no official team or roadmap.
                </Typography>
                <SocialFooter />
            </Grid>
            <Grid width="100%" xs={12} md={7} item>
                <Box sx={{ width: '100%' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <CustomTabList
                                onChange={handleChange}
                                indicatorColor="transparent"
                                indicator={false}
                                variant={isDesktop ? 'fullWidth' : 'scrollable'}
                                scrollButtons="auto"
                            >
                                <Tab label="IDO TEST ROUND (SUA TOKEN)" {...a11yProps(0)} />
                                <Tab label="PUBLIC ROUND 1" {...a11yProps(1)} />
                                {/* <Tab label="PUBLIC ROUND 2" disabled {...a11yProps(2)} /> */}
                            </CustomTabList>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <OGRound
                                balances={balances}
                                totalSold={totalSold}
                                totalSupply={totalSupply}
                                ratio={ratio}
                                participants={participants}
                                participantsWallet={participantsWallet}
                            />
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
