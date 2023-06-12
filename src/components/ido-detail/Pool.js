import { TabContext, TabList } from '@mui/lab';
import { Box, Grid, Tab, alpha, styled } from '@mui/material';
import { PoolInformation } from 'components/ido-detail/PoolInfo';
import { ProjectInfo } from 'components/ido-detail/Project';
import { ethers } from 'ethers';
import useResponsive from 'hooks/useResponsive';
import PropTypes from 'prop-types';
import { SuiContext } from 'provider/SuiProvider';
import queryString from 'query-string';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useYouSuiStore } from 'zustand-store/yousui_store';
import { AvatarPool } from './AvatarPool';
import { OGRound } from './round/OGRound';
import { PublicRound } from './round/PublicRound';
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
            background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.3) -8.02%, rgba(109, 133, 218, 0.3) 98.69%)',
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

export const Pool = () => {
    const location = useLocation();

    const tab = parseInt(queryString.parse(location.search).tab) || 0;
    const [value, setValue] = useState(tab);

    const { provider, balances, allRound } = React.useContext(SuiContext);
    const isDesktop = useResponsive('up', 'md');
    const [infoRounds, setInfoRounds] = React.useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fetchPoolData = React.useCallback(
        async (round) => {
            if (!round) return;

            const txn = await provider.getObject({
                id: round?.objectId,
                options: { showContent: true },
            });
            const roundData = txn?.data?.content?.fields;

            if (roundData) {
                const tokenType = await provider.getCoinMetadata({
                    coinType: `0x${roundData?.token_type}`,
                });

                const suiRatio = ethers.utils.formatUnits(
                    roundData?.payments?.fields.contents[0]?.fields?.value?.fields.ratio_per_token,
                    tokenType?.decimals
                );

                const newState = {
                    ...round,
                    tokenAddress: `0x${roundData?.token_type}`,
                    tokenName: tokenType?.name,
                    decimals: tokenType?.decimals,
                    tokenType: roundData?.token_type,
                    tokenDescription: tokenType?.description,
                    symbol: tokenType?.symbol,
                    ratio: suiRatio || null,
                    avatar: roundData?.project?.fields?.image_url,
                    telegram: roundData?.project?.fields?.telegram,
                    discord: roundData?.project?.fields?.discord,
                    participantsWallet: roundData?.participants?.fields?.contents || null,
                    participants: roundData?.participants?.fields?.contents.length,
                    totalSold: roundData?.total_sold || null,
                    totalSupply: roundData?.total_supply || null,
                    minPurchase: roundData?.min_purchase || 0,
                    maxPurchase: roundData?.max_purchase || 0,
                    isOpenClaimVesting: roundData?.is_open_claim_vesting || null,
                    isOpenClaimRefund: roundData?.is_open_claim_refund || null,
                    isPause: roundData?.is_pause || null,
                    name: roundData?.name,
                    payments: roundData?.payments?.fields?.contents || [],
                    startAt: roundData?.start_at || null,
                    endAt: roundData?.end_at || null,
                    type: roundData?.type || null,
                };

                return newState;
            }
        },
        [provider]
    );

    React.useEffect(() => {
        Promise.all(allRound.map(fetchPoolData)).then(setInfoRounds);
    }, [allRound]);

    return (
        <>

            <>
                <Grid container spacing={2} sx={{ marginTop: 12, marginBottom: 10 }}>
                    <Grid xs={12} md={6} item>
                        <AvatarBox>
                            <AvatarPool avatar={infoRounds[value]?.avatar} />
                        </AvatarBox>
                    </Grid>
                    <Grid width="100%" xs={12} md={6} item>
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
                                        {allRound.map((round, index) => {
                                            return <Tab label={round?.name?.value} {...a11yProps(index)} />;
                                        })}
                                    </CustomTabList>
                                </Box>
                                {infoRounds.map((round, index) => (
                                    <TabPanel value={value} index={index}>
                                        {round?.type === 'FCFS' ? (
                                            <OGRound
                                                balances={balances}
                                                name={round?.name}
                                                tokenType={round?.tokenType}
                                                payments={round?.payments}
                                                decimals={round?.decimals}
                                                totalSold={round?.totalSold}
                                                minPurchase={round?.minPurchase}
                                                maxPurchase={round?.maxPurchase}

                                                totalSupply={round?.totalSupply}
                                                ratio={round?.ratio}
                                                symbol={round?.symbol}
                                                participants={round?.participants}
                                                participantsWallet={round?.participantsWallet}
                                            />
                                        ) : (
                                            <PublicRound
                                                balances={balances}
                                                tokenType={round?.tokenType}
                                                payments={round?.payments}
                                                decimals={round?.decimals}
                                                totalSold={round?.totalSold}
                                                minPurchase={round?.minPurchase}
                                                maxPurchase={round?.maxPurchase}
                                                totalSupply={round?.totalSupply}
                                                ratio={round?.ratio}
                                                endAt={round?.endAt}
                                                name={round?.name}
                                                symbol={round?.symbol}
                                                participants={round?.participants}
                                                participantsWallet={round?.participantsWallet}
                                            />
                                        )}
                                    </TabPanel>
                                ))}
                            </TabContext>
                        </Box>
                    </Grid>
                </Grid>

                <PoolInformation
                    tokenAddress={infoRounds[value]?.tokenAddress}
                    tokenName={infoRounds[value]?.tokenName}
                    ratio={infoRounds[value]?.ratio}
                    symbol={infoRounds[value]?.symbol}
                    totalSupply={infoRounds[value]?.totalSupply}
                    decimals={infoRounds[value]?.decimals}
                    description={infoRounds[value]?.tokenDescription}
                    minAllocation={infoRounds[value]?.minAllocation}
                    maxAllocation={infoRounds[value]?.maxAllocation}
                />
                <ProjectInfo description={infoRounds[value]?.tokenDescription} />
            </>
        </>
    );
};
