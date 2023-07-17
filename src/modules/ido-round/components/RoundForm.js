import { Box, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useWallet } from "@suiet/wallet-kit";
import { CheckboxFiled } from "components";
import useResponsive from "hooks/useResponsive";
import React from "react";
import { fCurrency } from "utils/format";
import { BuyTokenButton, SaleFormBox, TokenButton } from "./RoundStyled";

export const RoundForm = ({ round, balances }) => {
    const [checked, setChecked] = React.useState();
    const [chosenToken, setChosenToken] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState(0);
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
            return `Available SUI: ${balances} SUI`;
        }
    }, [balances, wallet?.address, wallet?.connected]);

    const handleChangeAmount = (e) => {
        setValue(fCurrency(e.target.value, 0));
    };
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
                                XUI
                            </InputAdornment>
                        ),
                    }}
                    value={value}
                    size="small"
                    fullWidth
                    sx={{ margin: '24px 0', '& .MuiInputBase-input': { color: 'white', } }}
                    onChange={(e) => handleChangeAmount(e)}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    {['10', '25', '50', '100'].map((token) => (
                        <TokenButton key={token} className={chosenToken === token ? "active" : ""}
                            onClick={() => setChosenToken(token)}>{token}%</TokenButton>
                    ))}
                </Box>
                <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" mt={2}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: isMobile ? '1rem' : '0',
                            '& a': {
                                fontStyle: 'italic',
                                textDecoration: 'underline',
                            },
                            '& a:hover': {
                                fontStyle: 'italic',
                                textDecoration: 'underline',
                                color: '#5CBAF2',
                            }
                        }}
                    >
                        <CheckboxFiled handleChecked={handleChecked} />
                        <Typography variant="caption">
                            I've have read & accepted {' '}
                            <a
                                href="https://docs.google.com/document/d/1cbvUvE28TfKMIUhxzMQgl5O_wO2eEqdhFsKr2bQ8Q0M/edit"
                                target="_blank"
                                rel="noreferrer"
                            >
                                YouSUI Launchpad Privacy Policy
                            </a> {', '}
                            <a
                                href="https://docs.google.com/document/d/1RRO6w77nJyHE7LwGwLsSgr4GKcuMVSwQ6DinGnDi96s/edit"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Terms of Service
                            </a>{' & '}
                            <a
                                href="https://docs.google.com/document/d/1guvKALX-dLP_wH7YErnrS00WWZZzhARdSyl_pK3Es3o/edit?usp=sharing"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Disclaimer
                            </a>
                        </Typography>
                    </Box>
                    <BuyTokenButton type="submit" loading={loading} disabled>
                        Buy Now
                    </BuyTokenButton>
                </Stack>
            </form>
        </SaleFormBox>
    );
};
