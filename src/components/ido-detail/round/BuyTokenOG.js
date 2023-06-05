import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { styled, useTheme } from '@mui/material/styles';
import { TransactionBlock } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { CheckboxFiled } from 'components/base/CheckField';
import { InputField } from 'components/base/InputFieldV2';
import { NormalInputField } from 'components/base/NormalInput';
import { ethers } from 'ethers';
import useResponsive from 'hooks/useResponsive';
import { toNumber } from 'lodash';
import { CLOCK, NAME, PACKAGE, PAYMENT_TYPE, PROJECT, TOKEN_TYPE, TXUI_CLOCK, TXUI_NAME, TXUI_PACKAGE, TXUI_PROJECT, TXUI_PAYMENT_TYPE, TXUI_TOKEN_TYPE } from 'constant';
import { SuiContext } from 'provider/SuiProvider';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IdoSchema } from '../validations';
import { useYouSuiStore } from 'zustand-store/yousui_store';

const StyledBuyTokenBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 229, 184, 0.2) 0%, rgba(109, 133, 218, 0.2) 100%)',
    padding: '40px 40px',
    color: 'white',
    borderRadius: 10,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    position: 'relative',
    marginTop: '1rem',
}));

const StyledBuyTokenBtn = styled(LoadingButton)(({ them }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
    color: 'white',
    height: 48,
    width: 156,
    fontSize: 18,
    borderRadius: 48,
    alignItems: 'center',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    '&.Mui-disabled': {
        color: 'rgba(255, 255, 255, 0.5)',
    },
}));


const MaxButton = styled(Button)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 16,
}));

export const BuyTokenOG = ({ decimals, ratio, symbol, balances, maxPerUser, participantsWallet }) => {
    const [checked, setChecked] = React.useState();
    const [loading, setLoading] = React.useState(false);

    const theme = useTheme();
    const wallet = useWallet();

    const { sold } = useYouSuiStore((state) => state.sold);

    const { allCoinObjectsId } = React.useContext(SuiContext);

    const {
        control,
        handleSubmit,
        formState: { isValid },
        watch,
        reset,
        setValue,
        trigger
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            amount: 20,
        },
        resolver: yupResolver(IdoSchema),
    });

    const isMobile = useResponsive('down', 'sm');

    const watchAmount = watch('amount');

    const handleChecked = (event) => {
        setChecked(event.target.checked);
    };

    const handleSales = async (data) => {
        const tx = new TransactionBlock();

        setLoading(true);

        const coinSuiObjectData = allCoinObjectsId.map((coin) => coin?.data);

        tx.setGasPayment(coinSuiObjectData);

        const balanceSplit = ethers.utils.parseUnits((data?.amount * toNumber(ratio)).toString(), decimals).toString();

        const [coin] = tx.splitCoins(tx.gas, [tx.pure(balanceSplit)]);

        const parseAmount = ethers.utils.parseUnits((data?.amount).toString(), decimals).toString();

        const vec = tx.makeMoveVec({
            objects: [coin],
        });

        tx.moveCall({
            target: `${TXUI_PACKAGE}::launchpad_presale::purchase`,
            typeArguments: [TXUI_TOKEN_TYPE, TXUI_PAYMENT_TYPE],
            arguments: [tx.object(TXUI_CLOCK), tx.object(TXUI_PROJECT), tx.pure(TXUI_NAME), vec, tx.pure(parseAmount)],
        });

        try {
            const result = await wallet.signAndExecuteTransactionBlock({
                transactionBlock: tx,
            });
            if (result) {
                setLoading(false);
                toast.success('Buy token success');
                reset({ amount: '' });
                sold(true)
            } else {
                setLoading(false);
                toast.error('Transaction rejected');
            }
        } catch (e) {
            setLoading(false);
        }
    };

    const isCanBuy = () => {
        if (balances && watchAmount) {
            if (!wallet?.address) return false;
            if (balances < watchAmount * toNumber(ratio)) return false;
            return true;
        } else return;
    };

    const canBuy = isCanBuy();

    const handleSelectMax = () => {
        // setValue('amount', balances / toNumber(ratio), { shouldDirty: true, shouldTouch: true, shouldValidate: true });
        setValue('amount', ethers.utils.formatUnits(maxPerUser, decimals))
        trigger('amount');
    };

    const renderStatusBalance = React.useCallback(() => {
        if (!wallet?.address || !wallet?.connected) {
            return 'Connect your wallet before';
        }
        if (balances) {
            return `Your balance: ${balances} SUI`;
        }
    }, [balances, wallet?.address, wallet?.connected]);

    return (
        <StyledBuyTokenBox>
            <Stack>
                <form onSubmit={handleSubmit(handleSales)}>
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
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: 80,
                        }}
                    >
                        <Typography sx={{ marginRight: 2 }}>Amount:</Typography>
                        <InputField
                            id="amount"
                            name="amount"
                            control={control}
                            // disabled
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
                                        {symbol}
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                fontWeight: 'bold',
                                color: 'white',
                                [theme.breakpoints.down('sm')]: {
                                    // width: 320,
                                },
                                [theme.breakpoints.down(480)]: {
                                    // width: 280,
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                        <MaxButton onClick={handleSelectMax}>Max</MaxButton>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography sx={{ marginRight: 2 }}>Required:</Typography>
                        <NormalInputField
                            value={Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(watchAmount * toNumber(ratio)) || 0}
                            disabled
                            sx={{
                                fontWeight: 'bold',
                                color: 'white',
                                marginBottom: 4,
                            }}
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
                                        SUI
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between">
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: isMobile ? '1rem' : '0',
                            }}
                        >
                            <CheckboxFiled handleChecked={handleChecked} />
                            <Typography>
                                I’ve read and accepted all the{' '}
                                <a
                                    href="/"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        color: 'rgba(91, 184, 240, 1)',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    YouSUI's Agreement
                                </a>
                            </Typography>
                        </Box>
                        <StyledBuyTokenBtn type="submit" disabled={!isValid || !checked || !canBuy} loading={loading}>
                            Buy Now
                        </StyledBuyTokenBtn>
                    </Stack>
                </form>
            </Stack>
        </StyledBuyTokenBox>
    );
};
