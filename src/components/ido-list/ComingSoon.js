import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ComingSoonIDOCardWrapper = styled(Box)(({ theme }) => ({
    background: 'rgba(20, 36, 54, 0.6)',
    borderRadius: '15px',
    border: '1px solid #4CD3D7',
    height: '100%',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        height: 300,
    },
}));

export const ComingSoonIDOCard = ({ avatar }) => {
    return (
        <ComingSoonIDOCardWrapper>
            <img
                src={avatar}
                alt="ido-coming"
                style={{ margin: 'auto', display: 'flex', alignItems: 'center', height: '100%', width: '50%' }}
            />
        </ComingSoonIDOCardWrapper>
    );
};
