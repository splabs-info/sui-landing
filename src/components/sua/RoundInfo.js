// import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
// import CopyComponent from 'components/common/CopyComponent';
// import * as moment from 'moment';
// import { fAddress, fCurrency } from 'utils/format';
// import { TokenBox, UtilityBox } from './RoundStyled';
// const utilities = [
//     'Stake XUI-X LP Token to obtain Swap fee Shares',
//     'Stake XUI and Get Tier',
//     'Stake XUI and have the right to join IDO / INO Launchpad',
//     'Pay XUI to make your own NFT collection',
//     'Governance',
//     'Pay XUI to Mint your own NFTs on SUI Network',
//     'Stake XUI and Get the discount of Swap Fee',
//     'Stake XUI and Get the discount of NFT Trade fee',
//     'Pay XUI to use of Non-EVM Bridge',
//     'Donate XUI on YouSUI Social Platform',
// ]

// const info = {
//     name: 'SUA',
//     ticker: 'SUA',
//     totalSupply: 100000000,
//     standard: 'SUI',
//     communityTraction: 'Excellent',
//     initialMarketcap: '560000',
// }


// const fields = [
//     {
//         key: 'name',
//         label: 'Name',
//     },
//     {
//         key: 'ticker',
//         label: 'Ticker',
//     },
//     {
//         key: 'totalSupply',
//         label: 'Total Supply',
//         format: (e) => `${fCurrency(1011, 0)}`,
//     },
//     {
//         key: 'standard',
//         label: 'Standard',
//     },
//     {
//         key: 'communityTraction',
//         label: 'Community Traction',
//     },
//     // {
//     //     key: 'initialMarketcap',
//     //     label: 'Initial Marketcap',
//     //     format: (e) => `${'-'} USD`,
//     // },
// ];
// export const RoundInfo = ({
//     address = '0xaa78b4427f08521031c38536be04bb8c905e75227689937c085676ae0d8b0326',
//     startTime = null,
//     endTime = null
// }) => {
//     return (
//         <>
//             <Box my={4}>
//                 <Typography variant="h5" color="white" fontWeight='700'>Information</Typography>
//                 <Divider sx={{ borderColor: 'white', borderWidth: '1px', width: '36px', mt: 1 }} />
//             </Box>
//             <Grid container spacing={4} justifyContent="space-between" sx={{ marginBottom: 10 }}>
//                 <Grid item md={12} xs={12}>
//                     <Stack spacing={2} justifyContent={'space-between'} height={'100%'}>
//                         <TokenBox>
//                             <Box>
//                                 <Typography variant="body1" mb={0.5}>Token Type</Typography>
//                                 <Typography variant="body2" display={'inline-flex'} gap={2}>
//                                     {fAddress('0x3cbae4efb916a6ff23eb4724f6fb5d37c5a342b689a6f308fa10acc944799f84')}
//                                     <CopyComponent content={address} />
//                                 </Typography>
//                             </Box>
//                             {startTime && <Box>
//                                 <Typography variant="body1" mb={0.5}>Pool Start Time</Typography>
//                                 <Typography variant="body2">{moment(1685340000000).format('LLLL')}</Typography>
//                             </Box>}
//                             {endTime && <Box>
//                                 <Typography variant="body1" mb={0.5}>Pool End Time</Typography>
//                                 <Typography variant="body2"> {moment(1686441600000).format('LLLL')}</Typography>
//                             </Box>}
//                         </TokenBox>
//                         <UtilityBox>
//                             {fields.map((field) => (
//                                 <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className='border'>
//                                     <Typography variant="body2" fontWeight={600}>{field.label}</Typography>
//                                     <Typography variant="body2">
//                                         {field.format ? field.format(info[field.key]) : info[field.key]}
//                                     </Typography>
//                                 </Stack>
//                             ))}
//                         </UtilityBox>
//                     </Stack>
//                 </Grid>

//                 {/* <UtilityBox>
//                             <Typography variant="body1" mb={2}>Token Utility</Typography>
//                             <ul>
//                                 {utilities.map((item, index) => (
//                                     <li key={index}>
//                                         <img src='/images/staking/icon-staking.png' alt='' />
//                                         {item}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </UtilityBox> */}
//             </Grid>
//         </>
//     );
// };

export {}