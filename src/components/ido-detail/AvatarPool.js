import { Box, Typography } from '@mui/material';
export const AvatarPool = () => {
	return (
		<Box position={'relative'}>
			<Box
				component={'img'}
				src="/images/ido/sua-sale.jpg"
				sx={{ width: '100%', height: '100%', }} />
			{/* Beta */}
			<Box
				sx={{
					background: 'linear-gradient(255deg, #207BBF 0%, #5CBAF2 100%)',
					position: 'absolute', bottom: 0, right: 0,
					borderRadius: '0 20px 0 20px', padding: '8px 24px'
				}}
			>
				<Typography color={'white'} fontWeight={'bold'}>TBA</Typography>
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
