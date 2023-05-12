import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ComingSoonIDOCardWrapper = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.3) -8.02%, rgba(109, 133, 218, 0.3) 98.69%)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    borderRadius: '24px',
    border: '1px solid #00C5D3',
    paddingTop: 18,
    paddingRight: 8,
    paddingLeft: 8,
    height: 702,
    width: 482,
    [theme.breakpoints.down('sm')]: {
        width: 280,
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
