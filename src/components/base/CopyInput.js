import { PreSalesBox } from '@/components';
import { Stack, Typography } from '@mui/material';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

export const RefLink = () => {
    const handleCopy = () => {
        toast.success('Copied');
    };
    return (
        <PreSalesBox className='ref-link'>
            <Stack direction={"row"} justifyContent="space-between" alignItems='center'>
                <Typography fontWeight={'bold'}>Ref Link</Typography>
                <CopyToClipboard text={'privatesale.yousui.io/round1-ref=bh3u91e2'}
                    onCopy={(value, e) => handleCopy()}>
                    <Typography fontWeight={'bold'} textAlign={'right'} sx={{ cursor: 'pointer' }} >
                        private sale.yousui.io/round1-ref=bh3u91e2
                    </Typography>
                </CopyToClipboard>
            </Stack>
        </PreSalesBox>
    );
};

