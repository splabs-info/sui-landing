import { Box, Divider, Grid, Link, Stack, Typography } from '@mui/material';
import { toNumber } from 'lodash';
import * as moment from 'moment';
import { RELEAP_PROJECT_NAME, RELEAP_ROUND_NAME } from 'onchain/constants';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { fAddress, fCurrency } from 'utils/format';
import { TokenBox, UtilityBox } from './RoundStyled';
const utilities = [
    'Stake XUI-X LP Token to obtain Swap fee Shares',
    'Stake XUI and Get Tier',
    'Stake XUI and have the right to join IDO / INO Launchpad',
    'Pay XUI to make your own NFT collection',
    'Governance',
    'Pay XUI to Mint your own NFTs on SUI Network',
    'Stake XUI and Get the discount of Swap Fee',
    'Stake XUI and Get the discount of NFT Trade fee',
    'Pay XUI to use of Non-EVM Bridge',
    'Donate XUI on YouSUI Social Platform',
];

const info = {
    name: 'YouSUI',
    ticker: 'XUI',
    totalSupply: 100000000,
    standard: 'SUI',
    communityTraction: 'Excellent',
    initialMarketcap: '440000',
};

const fields = [
    {
        key: 'name',
        label: 'Name',
    },
    {
        key: 'ticker',
        label: 'Ticker',
    },
    {
        key: 'totalSupply',
        label: 'Total Supply',
        format: (e) => `${fCurrency(e, 0)}`,
    },
    {
        key: 'standard',
        label: 'Standard',
    },
    {
        key: 'communityTraction',
        label: 'Community Traction',
    },
    {
        key: 'initialMarketcap',
        label: 'Initial Marketcap',
        format: (e) => `${fCurrency(e, 0)} USDT`,
    },
];
export const RoundInfo = ({ startTime, endTime, type, symbol, projectName }) => {
    const renderInfo = React.useCallback(() => {
        if (projectName === RELEAP_PROJECT_NAME) {
            return (
                <>
                    <Typography variant="body1" mb={3} sx={{ fontWeight: 'bold', fontSize: 18 }}>
                        What is Releap Protocol ?
                    </Typography>
                    <ul>
                        <li style={{ marginBottom: 32, fontSize: 16 }}>
                            Releap Protocol strives to create a fully composable social graph, enabling true ownership of content and
                            fostering a vibrant decentralized social network for creators and users alike.
                        </li>
                        <li style={{ marginBottom: 32, fontSize: 16 }}>
                            Releap App serves as a cutting-edge social networking platform, prioritising content quality and creator
                            ownership. Collaborations with prominent creators are underway to diversify the content on the platform,
                            while incentives are being developed to encourage community-generated content and reward high-quality
                            contributions.
                        </li>
                        <li style={{ fontSize: 16 }}>
                            Releap Protocol is an innovative solution targeting Web3 projects and users, aiming to revolutionise
                            social networking and content ownership in the decentralized space. By leveraging strategic partnerships
                            and integrating with the Sui ecosystem, Releap Protocol provides a platform for Web3 projects to build
                            applications, store data on-chain and receive rewards.
                        </li>
                    </ul>
                </>
            );
        } else {
            return (
                <>
                    <Typography variant="body1" mb={2}>
                        Token Utility
                    </Typography>
                    <ul>
                        {utilities.map((item, index) => (
                            <li key={index}>
                                <img src="/images/staking/staking.svg" alt="" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </>
            );
        }
    }, [projectName]);

    const handleCopy = React.useCallback(() => {
        toast.success('Copied');
    }, []);

    const renderTokenType = React.useCallback(() => {
        if (projectName === RELEAP_PROJECT_NAME) {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Link
                        href="https://suiexplorer.com/object/0x4602dc7bd60d623c57424af5480fe9c104d30bbbb051af18e0a283b3dd7a5367?network=mainnet"
                        target="_blank"
                        variant="body2"
                        underline="hover"
                        sx={{ color: 'white' }}
                    >
                        {type ? `0x${fAddress(type)}` : '--'}
                    </Link>
                    <CopyToClipboard text={`0x${type}`} onCopy={(value, e) => handleCopy()}>
                        <img
                            src="/images/icon/copy.svg"
                            alt=""
                            style={{
                                marginLeft: 8,
                                width: 16,
                                height: 16,
                                cursor: 'pointer',
                            }}
                        />
                    </CopyToClipboard>
                </Box>
            );
        } else {
            return (
                <Link
                    href="https://suiexplorer.com/object/0x5b6851a16da9e44c137c95527ba1233601dbca0ef5f7f89ca3d184ace27d744c?network=mainnet"
                    target="_blank"
                    variant="body2"
                    underline="hover"
                    sx={{ color: 'white' }}
                >
                    {fAddress('0x3cbae4efb916a6ff23eb4724f6fb5d37c5a342b689a6f308fa10acc944799f84::xui::XUI')}
                </Link>
            );
        }
    }, [handleCopy, projectName, type]);

    const renderEndTime = React.useCallback(() => {
        if (!endTime) return '--';
        return moment(toNumber(endTime)).format('LLL');
    }, [endTime]);

    const renderStartTime = React.useCallback(() => {
        if (!startTime) return '--';
        return moment(toNumber(startTime)).format('LLL');
    }, [startTime]);

    const renderTableInfo = React.useCallback(() => {
        if (projectName === RELEAP_PROJECT_NAME) {
            return (
                <>
                    <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className="border">
                        <Typography variant="body2" fontWeight={600}>
                            Name
                        </Typography>
                        <Typography variant="body2">Releap Protocol</Typography>
                    </Stack>
                    <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className="border">
                        <Typography variant="body2" fontWeight={600}>
                            Ticker
                        </Typography>
                        <Typography variant="body2">{symbol}</Typography>
                    </Stack>
                    <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className="border">
                        <Typography variant="body2" fontWeight={600}>
                            Total Supply
                        </Typography>
                        <Typography variant="body2">800,000,000</Typography>
                    </Stack>
                    <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className="border">
                        <Typography variant="body2" fontWeight={600}>
                            Standard
                        </Typography>
                        <Typography variant="body2">SUI</Typography>
                    </Stack>
                    <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className="border">
                        <Typography variant="body2" fontWeight={600}>
                            Community Traction
                        </Typography>
                        <Typography variant="body2">Excellent</Typography>
                    </Stack>
                    <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className="border">
                        <Typography variant="body2" fontWeight={600}>
                            Initial Marketcap
                        </Typography>
                        <Typography variant="body2">491,400 USD</Typography>
                    </Stack>
                </>
            );
        } else {
            return (
                <>
                    {fields.map((field) => (
                        <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className="border">
                            <Typography variant="body2" fontWeight={600}>
                                {field.label}
                            </Typography>
                            <Typography variant="body2">{field.format ? field.format(info[field.key]) : info[field.key]}</Typography>
                        </Stack>
                    ))}
                </>
            );
        }
    }, [projectName, symbol]);

    return (
        <>
            <Box my={4}>
                <Typography variant="h5" color="white" fontWeight="700">
                    Information
                </Typography>
                <Divider sx={{ borderColor: 'white', borderWidth: '1px', width: '36px', mt: 1 }} />
            </Box>
            <Grid container spacing={4} justifyContent="space-between" sx={{ marginBottom: 10 }}>
                <Grid item md={6} xs={12}>
                    <Stack spacing={2} justifyContent={'space-between'} height={'100%'}>
                        <TokenBox>
                            <Box>
                                <Typography variant="body1" mb={0.5}>
                                    Token Type
                                </Typography>
                                {renderTokenType()}
                            </Box>
                            <Box>
                                <Typography variant="body1" mb={0.5}>
                                    Pool Start Time
                                </Typography>
                                <Typography variant="body2">{renderStartTime()}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" mb={0.5}>
                                    Pool End Time
                                </Typography>
                                <Typography variant="body2">{renderEndTime()}</Typography>
                            </Box>
                        </TokenBox>
                        <UtilityBox>{renderTableInfo()}</UtilityBox>
                    </Stack>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Stack alignItems={'stretch'} height={'100%'}>
                        <UtilityBox>{renderInfo()}</UtilityBox>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};
