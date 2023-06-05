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
        value: '100 SUI',
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
export const SaleInfo = () => {
    const isMobile = useResponsive('down', 'sm');
    return (
        <ContentBox className='ref-link'>
            {saleInformation.map((item, index) => (
                <SpaceBetweenBox key={index} className='sale-info'>
                    <Typography >{item.label}</Typography>
                    <Typography fontWeight={'bold'} textAlign={'right'}>{item.value}</Typography>
                </SpaceBetweenBox>
            ))}
        </ContentBox>
    );
};

