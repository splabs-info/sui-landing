import { Typography, Divider } from '@mui/material';
export const TitleSection = ({ title }) => {
    return (
        <Typography
            sx={{
                textAlign: 'left',
                fontSize: 18,
                fontWeight: 'bold',
                lineHeight: '26px',
                color: 'white',
                marginBottom: 3,
            }}
        >
            {title}
            <Divider sx={{ borderColor: '#D9D9D9', width: 50, borderWidth: '1px', marginTop: '12px' }} />
        </Typography>
    );
};
