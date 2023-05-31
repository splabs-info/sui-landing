import { Container } from '@mui/material';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home-v2/HomeStyles';
import { Pool } from 'components/ido-detail/Pool';
import { PoolInformation } from 'components/ido-detail/PoolInfo';
import { ProjectInfo } from 'components/ido-detail/Project';
import { ethers } from 'ethers';
import { SuiContext } from 'provider/SuiProvider';
import React from 'react';

export default function IDODetail() {
    const [ratio, setRadio] = React.useState();
    const [participants, setParticipants] = React.useState(0);
    const [participantsWallet, setParticipantsWallet] = React.useState([]);
    const [totalSold, setTotalSold] = React.useState();
    const [totalSupply, setTotalSupply] = React.useState();
    const [minPurchase, setMinPurchase] = React.useState();
    const [maxPerUser, setMaxPerUser] = React.useState();
    const { provider, balances } = React.useContext(SuiContext);

    React.useEffect(() => {
        const fetchPoolData = async () => {
            const txn = await provider.getObject({
                id: '0xc299f92f7f460165a31a87630ee71ce1386deeaf65bf72da3eb4c572b3a1142c',
                options: { showContent: true },
            });

            const round = txn?.data?.content?.fields;

            if (round) {
                const suiRatio = ethers.utils.formatUnits(
                    round?.payments?.fields.contents[0]?.fields?.value?.fields.ratio_per_token,
                    9
                );
                setRadio(suiRatio);
            }

            const participants = round?.participants?.fields?.contents.length;
            const participantsWallet = round?.participants?.fields?.contents;
            setParticipantsWallet(participantsWallet);
            setParticipants(participants);
            setTotalSold(round?.total_sold);
            setTotalSupply(round?.total_supply);
            setMinPurchase(round?.min_purchase);
            setMaxPerUser(round?.max_per_user);
        };

        fetchPoolData();
    }, [provider]);

    return (
        <Page title="IDO - Detail">
            <SectionBox
                sx={{
                    backgroundImage: "url('/images/background/homebg6.png')",
                }}
            >
                <Container maxWidth="xl">
                    <Pool
                        balances={balances}
                        totalSold={totalSold}
                        totalSupply={totalSupply}
                        ratio={ratio}
                        participants={participants}
                        participantsWallet={participantsWallet}
                    />
                    <PoolInformation ratio={ratio} minPurchase={minPurchase} maxPerUser={maxPerUser} />
                    <ProjectInfo />
                </Container>
            </SectionBox>
        </Page>
    );
}
