/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Box, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const CustomTitle = styled(Typography)({
    textAlign: 'center',
    marginBottom: 24,
    color: 'white',
});

const CustomGridItem = styled(Grid)(({ theme }) => ({
    width: '100%',
    margin: 'auto',
    
    [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
    },
}));

const CustomizedContainer = styled(Container)(({ theme }) => ({
    backgroundColor: 'white',
    padding: 48,
    borderRadius: 10,
    boxShadow: '0rem 0.25rem 0.375rem -0.0625rem rgb(0 0 0 / 10%), 0rem 0.125rem 0.25rem -0.0625rem rgb(0 0 0 / 6%)',
    [theme.breakpoints.down('sm')]: {
        width: 380,
    },
}));

export const SSO = ({ children, title }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexGrow: 1,
                height: '100vh',
                justifyContent: 'center',
            }}
        >
            <Grid container>
                <CustomGridItem item>
                    <img
                        src="/images/gateKeeper.png"
                        style={{ marginBottom: 24, textAlign: 'center', margin: '0 auto', width: 128, height: 128, borderRadius: 8, }}
                    />
                    <CustomTitle variant="h5">{title}</CustomTitle>
                    <CustomizedContainer maxWidth="sm">{children}</CustomizedContainer>
                </CustomGridItem>
            </Grid>
        </Box>
    );
};
