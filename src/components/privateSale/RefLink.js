import { Typography } from '@mui/material';
import { ContentBox } from 'components/common/CustomBox';
import { SpaceBetweenBox } from 'components/home/HomeStyles';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

export const RefLink = () => {
    const handleCopy = () => {
        toast.success('Copied');
    };
    return (
        <ContentBox className='ref-link'>
            <SpaceBetweenBox >
                <Typography fontWeight={'bold'}>Ref Link</Typography>
                <CopyToClipboard text={'privatesale.yousui.io/round1-ref=bh3u91e2'}
                    onCopy={(value, e) => handleCopy()}>
                    <Typography fontWeight={'bold'} textAlign={'right'} sx={{ cursor: 'pointer' }} >
                        privatesale.yousui.io/round1-ref=bh3u91e2
                    </Typography>
                </CopyToClipboard>
            </SpaceBetweenBox>
        </ContentBox>
    );
};

