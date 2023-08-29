import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import { formatUnits } from 'ethers/lib/utils.js';
import useResponsive from 'hooks/useResponsive';
import React from 'react';
import TradingView from './TradingView';

const connection = new EvmPriceServiceConnection('https://xc-mainnet.pyth.network', { logger: console });

export default function Statistic() {
  const isMobile = useResponsive('down', 'sm');
  const [prices, setPrices] = React.useState(
    new Map([
      ['BTC', '0'],
      ['ETH', '0'],
      ['SUI', '0'],
      ['USDT', '0'],
      ['USDC', '0'],
      ['BNB', '0'],
    ])
  );

  React.useEffect(() => {
    (async () => {
      // // See Price Service endpoints section below for other endpoints
      const priceIds = [
        '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43', //BTC
        '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace', //ETH
        '0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744', //SUI
        '0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b', //USDT
        '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a', //USDC
        '0x2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f', //BNB
      ];

      const priceName = {
        '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43': 'BTC',
        '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace': 'ETH',
        '0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744': 'SUI',
        '0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b': 'USDT',
        '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a': 'USDC',
        '0x2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f': 'BNB',
      };

      await connection.subscribePriceFeedUpdates(priceIds, (priceFeed) => {
        const temp = new Map(prices);
        temp.set(
          priceName[`0x${priceFeed.id}`],
          parseFloat(
            formatUnits(priceFeed.getPriceNoOlderThan(60).price, priceFeed.getPriceNoOlderThan(60).expo * -1)
          ).toFixed(2)
        );
        setPrices(temp);
        // console.log(`Current price for ${priceName[`0x${priceFeed.id}`]}: ${priceFeed.getPriceNoOlderThan(60).price}.`);
      });

      // return async () => {
      //   await connection.unsubscribePriceFeedUpdates(priceIds);
      // };
    })();
  }, [prices]);

  return (
    <Box overflow={'clip'}>
      <Grid container alignItems={'center'} spacing={2}>
        <Grid item xs={3}>
          <Typography variant="body2" fontWeight={600} color="white">
            SYMBOL
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2" fontWeight={600} color="white" textAlign={'center'}>
            PRICE
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" fontWeight={600} color="white" textAlign={'center'}>
            LAST 7 DAYS
          </Typography>
        </Grid>
      </Grid>
      <Box mt={2} />
      {[...prices.entries()].map(([key, value]) => (
        <Grid container alignItems={'center'} spacing={2}>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={3}>
            <Stack direction={'row'} alignItems={'center'}>
              <img src={`/images/coins/${key}.png`} style={{ height: 30, width: 30 }} alt="" />
              <Typography color="white" ml={1}>
                {key}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Typography color="white" textAlign={'center'}>
              <small>$</small>
              {value}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box position={'relative'} width={300} height={65} overflow={'hidden'}>
              <Box
                position={'absolute'}
                top={-70}
                // left={isMobile ? '17%' : '10%'}
                left={'10%'}
                sx={{
                  transform: 'scaleY(0.3)',
                }}
                overflow={'hidden'}
              >
                <TradingView coin={key} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Box>
    // <TableContainer>
    //   <Table aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell sx={{ color: 'white' }} align="left">
    //           Symbol
    //         </TableCell>
    //         <TableCell sx={{ color: 'white' }} align="right" width={120}>
    //           Price
    //         </TableCell>
    //         <TableCell sx={{ color: 'white' }} align="right"></TableCell>
    //         <TableCell sx={{ color: 'white' }} align="right"></TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {[...prices.entries()].map(([key, value]) => (
    //         <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0, height: 100 } }}>
    //           <TableCell sx={{ color: 'white' }} align="left" component="th" scope="row">
    //             {key}
    //           </TableCell>
    //           <TableCell sx={{ color: 'white' }} align="right">
    //             {value}
    //           </TableCell>
    //           {/* <TableCell sx={{ color: 'white' }} align="right">
    //             xxx
    //           </TableCell> */}
    //           <TableCell sx={{ color: 'white' }} colSpan={2}>
    //             <Box position={'relative'} width={300} height={50} overflow={'hidden'}>
    //               <Box
    //                 position={'absolute'}
    //                 top={0}
    //                 right={36}
    //                 sx={{
    //                   transform: 'scaleY(0.4)',
    //                   my: -6,
    //                 }}
    //                 overflow={'hidden'}
    //               >
    //                 <TradingView coin={key} />
    //               </Box>
    //             </Box>
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
}
