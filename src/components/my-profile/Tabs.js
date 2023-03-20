import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AssetCard } from './AssetCard';
import { TierInformation } from './TierInformation';
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
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
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

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Overview" {...a11yProps(0)} />
                    <Tab label="My staking" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Typography
                    sx={{ fontSize: 18, fontWeight: 'bold', lineHeight: '26px', color: 'white', marginBottom: 3 }}
                >
                    MY WALLETS BALANCES
                    <span></span>
                </Typography>
                <Stack direction="row" spacing={2}>
                    <AssetCard balance={200000} currency="XUI" />
                    <AssetCard balance={200000} currency="XUI" />
                    <AssetCard balance={200000} currency="XUI" />
                </Stack>

                <Typography
                    sx={{ fontSize: 18, fontWeight: 'bold', lineHeight: '26px', color: 'white', marginBottom: 3 }}
                >
                    TIER INFORMATION
                    <span></span>
                </Typography>
                <TierInformation tierMedal="/tier-1.png" level="TIER 1" idoApp="2% of Total Pool" />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
        </Box>
    );
}
