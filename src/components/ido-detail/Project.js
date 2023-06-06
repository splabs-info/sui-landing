import { Box, Button, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TitleSection } from 'components/my-profile/TitleSection';
import React from 'react';
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <Button {...other} variant="text" />;
})(({ theme, expand }) => ({
    // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    margin: 'auto',
    color: 'rgba(204, 204, 204, 1)',
    fontSize: 16,
    fontWeight: 'normal',
    '&:hover': {
        background: 'transparent',
    },
}));

const StyledProjectCard = styled(Box)(({ theme }) => ({
    background:
        'linear-gradient(178.73deg, rgba(104, 229, 184, 0.1) 0%, rgba(109, 133, 218, 0.1) 100%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '24px',
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    marginTop: 32,
    width: '100%',
    borderColor: 'rgba(255, 255, 255, 0.2)',
}));

export const ProjectInfo = ({ description }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <TitleSection title="ABOUT THE PROJECT" />
            <StyledProjectCard>
                <Typography color="white" textAlign="left" lineHeight={'32px'} mb={2}>
                    {description}
                </Typography>
                {/* <Collapse
                    in={expanded}
                    timeout="auto"
                    unmountOnExit
                    sx={{ color: 'white', lineHeight: '32px' }}
                >
                    SUA is a token of Meta version. It has no intrinsic value or expectation of
                    financial return. There is no official team or roadmap.
                </Collapse> */}
                <StyledDivider />
                {/* <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    sx={{ textAlign: 'center' }}
                >
                    {expanded ? 'See less' : 'See more'}
                </ExpandMore> */}
            </StyledProjectCard>
        </>
    );
};
