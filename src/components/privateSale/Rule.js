import { Typography } from '@mui/material';
import { ContentBox } from 'components/common/CustomBox';
import { SpaceBetweenBox } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';

const saleInformation = [
    {
        label: 'Condition:',
        value: 'Buy by Ref Links',
    },
    {
        label: 'Minimum Allcation:',
        value: '100 USDT',
    },
    {
        label: 'Paid Currency:',
        value: 'BXUI / USDT',
    },
    {
        label: 'Vesting Schedule:',
        value: '15% TGE, Monthly Vesting for 10 Months',
    },
    {
        label: 'Start at:',
        value: '2023/06/09 17:00 (UTC +9)',
    },
    {
        label: 'End at:',
        value: '2023/06/11 19:00 (UTC +9)',
    },
]
export const Rule = () => {
    const isMobile = useResponsive('down', 'sm');
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

