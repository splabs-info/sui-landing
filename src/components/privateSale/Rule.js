import { Typography } from '@mui/material';
import { ContentBox } from 'components/common/CustomBox';

export const Rule = () => {
    return (
        <ContentBox className='height-100'>
            <Typography fontWeight={'bold'} variant='h6' mb={1}>RULE OF PRIVATE SALE </Typography>
            <Typography fontWeight={'bold'} mb={4}>First-Come First-Served (FCFS) </Typography>
            <Typography lineHeight={2}>
                PRIVATE is a private sales process that allows users to participate via the KOL referral link with a Hard Cap of 500,000 USDT. To successfully participate in PRIVATE, you need to ensure that you have successfully connected your Metamask and BitKeep wallets on the BSC chain, with enough USDT balance to purchase the desired token amount.Upon completion of the PRIVATE process, participants will receive $BXUI tokens, which can then be cross-swapped to $XUI at the specified time.
            </Typography>
        </ContentBox>
    );
};

