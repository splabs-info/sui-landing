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
      background: 'linear-gradient(0deg, #75E0C6 0.57%, rgba(52, 89, 129, 0.494792) 39.59%, rgba(41, 31, 65, 0) 77.81%)',
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

export default function OverviewTabs() {
  const [value, setValue] = React.useState(0);
  const [sui, setSui] = React.useState();
  const [sua, setSua] = React.useState();
  const { assets } = React.useContext(SuiContext);

  const isDesktop = useResponsive('up', 'md');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (!assets || assets.length <= 0) return;

    assets.forEach((item) => {
      if (item?.symbol === 'SUI') setSui(ethers.utils.formatUnits(item?.balance, item?.decimals));
      // if (item?.symbol === 'SUA') setSua(ethers.utils.formatUnits(item?.balance, item?.decimals));
    });
  }, [assets]);

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
            <Tab label="OVERVIEW" {...a11yProps("0")} />
            <Tab label="MY STAKING" {...a11yProps("1")} />
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
          <TierInformation tierMedal="/images/sui-tier/tier5.png" level="TIER 5" idoApp="2% of Total Pool" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TitleSection title="COMING SOON" />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
