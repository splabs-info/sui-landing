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
    marginTop: 32,
    width: '100%',
    borderColor: 'rgba(255, 255, 255, 0.2)',
}));

const projectContent = [
    {
        title: "Token Distribution",
        content: "Date UTC"
    },
    {
        title: "Min. Allocation",
        content: "250 USD"
    },
    {
        title: "Max. Allocation",
        content: "10,000 USD"
    },
    {
        title: "Token Price",
        content: "4 XUI = 1 USD"
    },
    {
        title: "Access Type",
        content: "Public"
    }
]
export const ProjectInfo = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <TitleSection title="ABOUT THE PROJECT" />
            <StyledProjectCard>
                <Typography color="white" textAlign="left" lineHeight={'32px'} mb={2}>
                    The XUI Token is the platform's governance token, and by staking it, you get the opportunity to participate in IDO and INO. In addition, you can participate in the governance that determines the direction of the project by using the XUI Token. It can be used as currency in DEX and NFT Marketplace, and liquidity can be supplied along with YouXUI. On social platforms, it can be used when clicking likes or making donations. By staking XUI Tokens, you not only get staking rewards, but also become an early investor in cutting-edge and high-potential projects.
                </Typography>
                <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ color: 'white', lineHeight: '32px' }}>
                    The XUI Token is the platform's governance token, and by staking it, you get the opportunity to participate in IDO and INO. In addition, you can participate in the governance that determines the direction of the project by using the XUI Token. It can be used as currency in DEX and NFT Marketplace, and liquidity can be supplied along with YouXUI. On social platforms, it can be used when clicking likes or making donations. By staking XUI Tokens, you not only get staking rewards, but also become an early investor in cutting-edge and high-potential projects.
                </Collapse>
                <StyledDivider />
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    sx={{ textAlign: 'center' }}
                >
                    {expanded ? 'See less' : 'See more'}
                </ExpandMore>

            </StyledProjectCard>
        </>
    );
};
