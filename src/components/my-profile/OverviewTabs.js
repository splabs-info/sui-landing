import * as React from 'react';
import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { alpha, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AssetCard } from './AssetCard';
import { TierInformation } from './TierInformation';
import useResponsive from 'hooks/useResponsive';
import { TabContext, TabList } from '@mui/lab';
import { Color } from 'constant/styled';
import { TitleSection } from './TitleSection';
import { SuiContext } from 'provider/SuiProviderV2';
import { ethers } from 'ethers';
import MyStaking from './my-staking/MyStaking';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
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
            background: 'linear-gradient(0deg, #8CCCC8 0%, rgba(41, 31, 65, 0) 15%)',
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
            background:
                'linear-gradient(0deg, #75E0C6 0.57%, rgba(52, 89, 129, 0.494792) 39.59%, rgba(41, 31, 65, 0) 77.81%)',
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
            fontSize: '16px',
        },

        '& .MuiTabs-scrollButtons': {
            color: Color.primary,
        },
        '& .MuiTabs-scrollButtons.Mui-disabled ': {
            opacity: '0.3',
        },
    },
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
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

export default function OverviewTabs({ handleChangeTab = () => { }, totalXUILocked }) {
    const [sui, setSui] = React.useState();
    const { assets } = React.useContext(SuiContext);
    const currentTier = React.useRef(null);

    const isDesktop = useResponsive('up', 'md');

    const navigate = useNavigate();
    const location = useLocation();
    const tabMap = ['0', '1', '2']; // map tab value to tab string
    const { tab: tabFromUrl } = queryString.parse(location.search); // get tab from URL params
    const initialTabValue = tabMap.indexOf(tabFromUrl);
    const [value, setValue] = React.useState(initialTabValue === -1 ? 0 : initialTabValue);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        handleChangeTab(newValue);
        // Update URL param when tab changes
        navigate(`?tab=${tabMap[newValue]}`);
    };

    React.useEffect(() => {
        if (!assets || assets.length <= 0) return;
        assets.forEach((item) => {
            if (item?.symbol === 'SUI') setSui(ethers.utils.formatUnits(item?.balance, item?.decimals));
        });
    }, [assets]);

    const renderTier = React.useCallback(() => {
        if (totalXUILocked >= 40000) {
            currentTier.current = 'tier_1';
            return (
                <TierInformation
                    tierMedal="/images/sui-tier/tier1.png"
                    level="TIER 1"
                    allocation="35%"
                    xuiReq="40,000"
                    ino="FCFS"
                    freeAir="2% of Total Pool"
                    discount="-20%"
                />
            );
        }
        if (totalXUILocked >= 20000) {
            currentTier.current = 'tier_2';
            return (
                <TierInformation
                    tierMedal="/images/sui-tier/tier2.png"
                    level="TIER 2"
                    freeAir="1.5% of Total Pool"
                    allocation="20%"
                    xuiReq="20,000"
                    ino="FCFS"
                    discount="-10%"
                />
            );
        }
        if (totalXUILocked >= 7500) {
            currentTier.current = 'tier_3';
            return (
                <TierInformation
                    tierMedal="/images/sui-tier/tier3.png"
                    level="TIER 3"
                    freeAir="1.5% of Total Pool"
                    allocation="15%"
                    xuiReq="7,500"
                    ino="FCFS"
                    discount="-5%"
                />
            );
        }
        if (totalXUILocked >= 5000) {
            currentTier.current = 'tier_4';
            return (
                <TierInformation
                    tierMedal="/images/sui-tier/tier4.png"
                    level="TIER 4"
                    freeAir="-"
                    allocation="15%"
                    xuiReq="5,000"
                    ino="FCFS"
                    discount="-3%"
                />
            );
        }
        if (totalXUILocked >= 3000) {
            currentTier.current = 'tier_5';
            return (
                <TierInformation
                    tierMedal="/images/sui-tier/tier5.png"
                    level="TIER 5"
                    freeAir="-"
                    allocation="15%"
                    xuiReq="3,000"
                    ino="FCFS"
                    discount="-2%"
                />
            );
        } else {
            currentTier.current = 'non_tier';
            return <TierInformation
                tierMedal="/images/home/YouSUI-token.png"
                level="--"
                freeAir="--"
                allocation="--"
                xuiReq="--"
                ino="--"
                discount="--"
            />;
        }
    }, [totalXUILocked]);

    return (
        <Box sx={{ width: '100%' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <CustomTabList
                        onChange={handleChange}
                        indicatorColor="none"
                        variant={isDesktop ? 'fullWidth' : 'scrollable'}
                        scrollButtons="auto"
                    >
                        <Tab label="OVERVIEW" {...a11yProps('0')} />
                        <Tab label="MY STAKING" {...a11yProps('1')} />
                        <Tab label="MY ITEM" {...a11yProps('2')} />
                    </CustomTabList>
                </Box>
                <TabPanel value={value} index={0}>
                    <TitleSection title="MY WALLETS BALANCES" />
                    <Stack
                        direction={isDesktop ? 'row' : 'column'}
                        justifyContent="space-between"
                        sx={{ marginBottom: 4, flexWrap: 'wrap' }}
                    >
                        <AssetCard balance={'0'} currency="USDT" />
                        <AssetCard balance={'0'} currency="USDC" />
                        <AssetCard balance={sui ? Number(sui).toFixed(2) : 0} currency="SUI" />
                    </Stack>

                    <TitleSection title="TIER INFORMATION" />
                    {renderTier()}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <MyStaking totalXUILocked={totalXUILocked} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <TitleSection title="COMING SOON" />
                </TabPanel>
            </TabContext>
        </Box>
    );
}
