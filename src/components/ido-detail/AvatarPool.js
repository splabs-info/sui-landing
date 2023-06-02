import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
export const AvatarPool = ({ avatar }) => {
    return (
        <Box position={'relative'} sx={{ width: 686, height: 640, display: 'flex' }}>
            {avatar ? (
                <Box component={'img'} src={avatar} sx={{ width: 686, height: 597, objectFit: 'contain' }} />
            ) : (
                <CircularProgress sx={{ textAlign: 'center', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
            )}

            {/* Beta */}
            <Box
                sx={{
                    background: 'linear-gradient(255deg, #207BBF 0%, #5CBAF2 100%)',
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    borderRadius: '0 20px 0 20px',
                    padding: '8px 24px',
                }}
            >
                <Typography color={'white'} fontWeight={'bold'}>
                    TBA
                </Typography>
            </Box>
            {/* // PRODUCTION
				<Box
				component={'img'}
				src="/images/ido/sui-sale.jpg"
				sx={{ width: '100%', height: '100%', borderRadius: '20px' }} />
             <Box
                sx={{
                    background: 'linear-gradient(127deg, #207BBF 0%, #5CBAF2 100%)',
                    position: 'absolute', bottom: 0, left: 0,
                    borderRadius: '0 20px 0 20px', padding: '8px 24px'
                }}
            >
                <Typography color={'white'}>YouSUI Project</Typography>
            </Box> */}
        </Box>
    );
};
