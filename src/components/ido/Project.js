import React from 'react';
import { Button, Box, Collapse, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TitleSection } from 'components/my-profile/TitleSection';
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
    background: 'linear-gradient(178.73deg, rgba(104, 229, 184, 0.1) 0%, rgba(109, 133, 218, 0.1) 100%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '24px',
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    width: '100%',
    borderColor: 'rgba(255, 255, 255, 0.2)',
}));

export const ProjectInfo = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <TitleSection title="ABOUT THE PROJECT" />
            <StyledProjectCard>
                <Typography color="white" textAlign="left">
                    A project is a challenging fitness app with game-fi features. You wear trendy virtual sneakers and
                    take a walk or jog to earn AMT tokens. GAMEPLAY   The earning system that AMAZY built using the
                    Move-to-Earn model works based on a few simple steps:  
                    <br />
                    <Typography sx={{ marginTop: 2 }}>
                        1. CHOOSE THE RIGHT NFT SNEAKER FOR YOUR ABILITIES. Users will be able to purchase sneakers or
                        rent them from other players.  
                    </Typography>
                    <br />
                    <Typography sx={{ marginTop: 2, marginBottom: 2 }}>
                        2. ACCESS SNEAKERS FROM THE APP MARKETPLACE
                    </Typography>
                </Typography>
                <StyledDivider />
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    sx={{ textAlign: 'center' }}
                >
                    See more
                </ExpandMore>
                <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ color: 'white' }}>
                    abc
                </Collapse>
            </StyledProjectCard>
        </>
    );
};
