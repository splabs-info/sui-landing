// import { Container } from '@mui/material';
// import Page from 'components/common/Page';
// import {  SectionBox } from 'components/home-v2/HomeStyles';
// import { Pool } from 'components/ido-detail/Pool';
// import { PoolInformation } from 'components/ido-detail/PoolInfo';
// import { ProjectInfo } from 'components/ido-detail/Project';
// import { ethers } from 'ethers';
// import { SuiContext } from 'provider/SuiProvider';
// import React from 'react';
// import { SUA_PRESALE_OG } from 'constant/sui-chain';

// export default function IDODetail() {
//     const titleTab="IDO TEST ROUND (SUA TOKEN)"

//    const [ratio, setRadio] = React.useState();
//     const [avatar, setAvatar] = React.useState();
//     const [tokenName, setTokenName] = React.useState();
//     const [symbol, setSymbol] = React.useState();
//     const [tokenAddress, setTokenAddress] = React.useState();
//     const [decimals, setDecimals] = React.useState();
//     const [telegram, setTelegram] = React.useState();
//     const [discord, setDiscord] = React.useState();
//     const [tokenDescription, setTokenDescription] = React.useState();

//     const [participants, setParticipants] = React.useState(0);
//     const [participantsWallet, setParticipantsWallet] = React.useState([]);
//     const [totalSold, setTotalSold] = React.useState();
//     const [totalSupply, setTotalSupply] = React.useState();
//     const [minPurchase, setMinPurchase] = React.useState();
//     const [maxPerUser, setMaxPerUser] = React.useState();
//     const { provider, balances } = React.useContext(SuiContext);

//     React.useEffect(() => {
//         const fetchPoolData = async () => {
//             const txn = await provider.getObject({
//                 id: SUA_PRESALE_OG,
//                 options: { showContent: true },
//             });

//             const round = txn?.data?.content?.fields;

//             if (round) {
//                 const suiRatio = ethers.utils.formatUnits(
//                     round?.payments?.fields.contents[0]?.fields?.value?.fields.ratio_per_token,
//                     9
//                 );

//                 console.log('round__', round)
//                 setTokenAddress(`0x${round?.token_type}`);

//                 const tokenType = await provider.getCoinMetadata({
//                     coinType: `0x${round?.token_type}`,
//                 });

//                 setTokenName(tokenType?.name);
//                 setDecimals(tokenType?.decimals);
//                 setTokenDescription(tokenType?.description);
//                 setSymbol(tokenType?.symbol);
//                 setRadio(suiRatio);
//             }

//             const participants = round?.participants?.fields?.contents.length;
//             const participantsWallet = round?.participants?.fields?.contents;

//             setAvatar(round?.project?.fields?.image_url);
//             setTelegram(round?.project?.fields?.telegram);
//             setDiscord(round?.project?.fields?.discord);
//             setParticipantsWallet(participantsWallet);
//             setParticipants(participants);
//             setTotalSold(round?.total_sold);
//             setTotalSupply(round?.total_supply);
//             setMinPurchase(round?.min_purchase);
//             setMaxPerUser(round?.max_per_user);
//         };

//         fetchPoolData();
//     }, [provider]);


//     return (
//         <Page title="IDO - Detail">
//             <SectionBox
//                 sx={{
//                     backgroundImage: "url('/images/background/homebg6.png')",
//                 }}
//             >
//                 <Container maxWidth="xl">
//                     <Pool
//                         avatar={avatar}
//                         balances={balances}
//                         decimals={decimals}
//                         titleTab={titleTab}
//                         maxPerUser={maxPerUser}
//                         totalSold={totalSold}
//                         totalSupply={totalSupply}
//                         ratio={ratio}
//                         symbol={symbol}
//                         participants={participants}
//                         participantsWallet={participantsWallet}
//                     />
//                     <PoolInformation
//                         tokenAddress={tokenAddress}
//                         tokenName={tokenName}
//                         ratio={ratio}
//                         symbol={symbol}
//                         totalSupply={totalSupply}
//                         decimals={decimals}
//                         description={tokenDescription}
//                         minPurchase={minPurchase}
//                         maxPerUser={maxPerUser}
//                     />
//                     <ProjectInfo description={tokenDescription} />
//                 </Container>
//             </SectionBox>
//         </Page>
//     );
// }


export {}
