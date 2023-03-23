import { Box, Avatar } from '@mui/material';
export const AvatarPool = () => {
    return (
        <Box sx={{ width: 386, height: 386 }}>
            <Avatar src="/IMG.png" variant="rounded" sx={{ width: '100%', height: '100%' }} />
        </Box>
    );
};
