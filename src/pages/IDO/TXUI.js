import { Container } from '@mui/material';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home-v2/HomeStyles';
import { Pool } from 'components/ido-detail/Pool';
import { PoolInformation } from 'components/ido-detail/PoolInfo';
import { ProjectInfo } from 'components/ido-detail/Project';
import { ethers } from 'ethers';
import { SuiContext } from 'provider/SuiProvider';
import React from 'react';

export default function TXUI() {
    const titleTab = 'TXUI IDO TEST';

    const [infoRound, setInfoRound] = React.useState({
        ratio: '',
        avatar: '',
        tokenName: '',
        symbol: '',
        tokenAddress: '',
        decimals: '',
        telegram: '',
        discord: '',
        tokenDescription: '',
        participants: 0,
        participantsWallet: [],
        totalSold: '',
        totalSupply: '',
        minPurchase: '',
        maxPerUser: ''
    })

    const { provider, balances, allRound } = React.useContext(SuiContext);

    const currentRound = React.useMemo(() => allRound?.find((round) => round?.name?.value === 'OG_ROUND'), [allRound]);

    
    React.useEffect(() => {
        const fetchPoolData = async () => {
            if (!currentRound) return;

            const txn = await provider.getObject({
                id: currentRound?.objectId,
                options: { showContent: true },
            });

            const round = txn?.data?.content?.fields;

            if (round) {
                const tokenType = await provider.getCoinMetadata({
                    coinType: `0x${round?.token_type}`,
                });

                const suiRatio = ethers.utils.formatUnits(
                    round?.payments?.fields.contents[0]?.fields?.value?.fields.ratio_per_token,
                    tokenType?.decimals
                );

                const newState = {
                    ...infoRound,
                    tokenAddress: `0x${round?.token_type}`,
                    tokenName: tokenType?.name,
                    decimals: tokenType?.decimals,
                    tokenDescription: tokenType?.description,
                    symbol: tokenType?.symbol,
                    ratio: suiRatio,
                    avatar: round?.project?.fields?.image_url,
                    telegram: round?.project?.fields?.telegram,
                    discord: round?.project?.fields?.discord,
                    participantsWallet: round?.participants?.fields?.contents,
                    participants: round?.participants?.fields?.contents.length,
                    totalSold: round?.total_sold,
                    totalSupply: round?.total_supply,
                    minPurchase: round?.min_purchase,
                    maxPerUser: round?.max_per_user
                };

                setInfoRound(newState);
            }
        };

        fetchPoolData();
    }, [currentRound]);

    console.log('maxPerUser__', infoRound)
    return (
        <Page title="TXUI">
            <SectionBox
                sx={{
                    backgroundImage: "url('/images/background/homebg6.png')",
                }}
            >
                <Container maxWidth="xl">
                    <Pool
                        avatar={infoRound?.avatar}
                        balances={balances}
                        decimals={infoRound?.decimals}
                        titleTab={titleTab}
                        maxPerUser={infoRound?.maxPerUser}
                        totalSold={infoRound?.totalSold}
                        totalSupply={infoRound?.totalSupply}
                        ratio={infoRound?.ratio}
                        symbol={infoRound?.symbol}
                        participants={infoRound?.participants}
                        participantsWallet={infoRound?.participantsWallet}
                    />
                    <PoolInformation
                        tokenAddress={infoRound?.tokenAddress}
                        tokenName={infoRound?.tokenName}
                        ratio={infoRound?.ratio}
                        symbol={infoRound?.symbol}
                        totalSupply={infoRound?.totalSupply}
                        decimals={infoRound?.decimals}
                        description={infoRound?.tokenDescription}
                        minPurchase={infoRound?.minPurchase}
                        maxPerUser={infoRound?.maxPerUser}
                    />
                    <ProjectInfo description={infoRound?.tokenDescription} />
                </Container>
            </SectionBox>
        </Page>
    );
}
