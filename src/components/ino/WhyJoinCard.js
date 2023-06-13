import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const WhyJoinCardWrapper = styled(Box)(({ theme }) => ({
    padding: '1rem',
    borderRadius: '1rem',
    border: '1px solid rgba(46, 48, 83, 0.4)',
    background: 'linear-gradient(90deg, rgba(104, 230, 184, 0.3) 0%, rgba(109, 133, 218, 0.3) 98.69%)',
    borderTopWidth: '80%',
    display: 'inline-flex',
    width: '100%',
    height: '100%',
    position: 'relative',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    '&:hover': {
        background:
            'linear-gradient(90deg, rgb(129,236,197,0.9) 0%, rgb(148,203,255,0.9) 50%,rgb(133,150,255,0.9) 100%)',
        boxShadow: ' 0px 1px 9px rgba(0, 0, 0, 0.34)',
        '& div:first-of-type': {
            background: '#000E26',
        },
        '& div> svg> defs > linearGradient > stop:first-of-type': {
            stopColor: '#00C5D3',
        },
        '& div> svg> defs > linearGradient > stop': {
            stopColor: '#42EECF',
        },
    },
    '& div> svg> defs > linearGradient > stop': {
        stopColor: '#000F28',
    },

    [theme.breakpoints.down('md')]: {
        minHeight: 'unset',
        padding: '1rem',
        '& .TextBox': {
            width: '95%',
        },
    },
}));

const TypographyTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 800,
    marginBottom: '.5rem',
    textTransform: 'uppercase',
    // background: 'linear-gradient(90deg, rgb(129,236,197,0.9) 0%, rgb(148,203,255,0.9) 50%,rgb(133,150,255,0.9) 100%)',
    background: 'white',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    color: 'white',
    [theme.breakpoints.down('md')]: {
        marginBottom: '.25rem',
    },
}));

export const WhyJoinCard = ({ icon, title, caption }) => {
    return (
        <WhyJoinCardWrapper
            sx={{
                margin: 'auto 0',
                '&:hover': {
                    '& h6': {
                        color: 'white',
                        background: 'white',
                        backgroundClip: 'text',
                    },
                },
            }}
        >
            <Box
                sx={{
                    width: 86,
                    height: 86,
                    background: 'rgba(20, 36, 54, 0.6)',
                    borderRadius: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 3,
                    border: '1px solid rgba(0, 197, 211, 1)',
                }}
            >
                <img
                    src={icon}
                    alt=""
                    style={{
                        width: 40,
                        height: 40,
                    }}
                />
            </Box>
            <Box pl={1} className="TextBox" sx={{ margin: 'auto 0' }}>
                <TypographyTitle variant="h6">{title}</TypographyTitle>
                <Typography
                    variant="body2"
                    className="content"
                    sx={{
                        lineHeight: 'unset',
                        color: 'white',
                    }}
                >
                    {caption}
                </Typography>
            </Box>
        </WhyJoinCardWrapper>
    );
};
