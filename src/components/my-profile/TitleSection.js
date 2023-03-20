import { Typography } from '@mui/material';
export const TitleSection = ({ title }) => {
    return (
        <Typography sx={{ fontSize: 18, fontWeight: 'bold', lineHeight: '26px', color: 'white', marginBottom: 3 }}>
            {title}
            <span></span>
        </Typography>
    );
};
