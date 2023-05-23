const { styled, Box } = require("@mui/material");

export const PoolInfoBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(0deg,rgba(66, 238, 207, 0.12) 0%, rgba(0, 197, 211, 0.12)  70%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '24px',
    padding: 40,
    height: 380,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
}));
