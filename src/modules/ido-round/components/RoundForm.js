import { Box, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { CheckboxFiled, InputField } from "components";
import React from "react";
import { BuyTokenButton, SaleFormBox } from "./RoundStyled";
import useResponsive from "hooks/useResponsive";
import { useWallet } from "@suiet/wallet-kit";


export const RoundForm = ({ round, balances }) => {
    const [checked, setChecked] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const isMobile = useResponsive('down', 'sm');

    const wallet = useWallet();
    const handleChecked = (event) => {
        setChecked(event.target.checked);
    };

    const renderStatusBalance = React.useCallback(() => {
        if (!wallet?.address || !wallet?.connected) {
            return 'Connect your wallet before';
        }
        if (balances) {
            return `Your balance: ${balances} SUI`;
        }
    }, [balances, wallet?.address, wallet?.connected]);

    const handleSales = async (data) => {

    };
    return (
        <SaleFormBox>
            <form onSubmit={handleSales}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography sx={{ marginRight: 2 }}>Amount:</Typography>
                    <Typography
                        sx={{
                            textAlign: 'end',
                            marginRight: 0.5,
                            fontWeight: 'bold',
                            fontSize: 14,
                        }}
                    >
                        {renderStatusBalance()}
                    </Typography>
                </Box>
                <TextField
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                sx={{
                                    '& .MuiTypography-root': {
                                        color: 'white',
                                        fontWeight: 'bold',
                                    },
                                }}
                            >
                                SUA
                            </InputAdornment>
                        ),
                    }}
                    size="small"
                    fullWidth
                    sx={{ margin: '16px 0' }}
                />
                <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between">
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: isMobile ? '1rem' : '0',
                        }}
                    >
                        <CheckboxFiled handleChecked={handleChecked} />
                        <Typography variant="caption">
                            I've have read & accepted {' '}
                            <a
                                href="https://docs.google.com/document/d/13uPJUMYXx62N9_UidmWwe2mL8MmFOrwVsvqx7byvPdk/edit"
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                YouSUI Launchpad Privacy Policy, Terms of Service & Disclaimer
                            </a>
                        </Typography>
                    </Box>
                    <BuyTokenButton type="submit" loading={loading}>
                        Buy Now
                    </BuyTokenButton>
                </Stack>
            </form>
        </SaleFormBox>

    );
};
