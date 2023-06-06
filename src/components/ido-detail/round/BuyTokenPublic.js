import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, InputAdornment, Stack, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { TransactionBlock } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { CheckboxFiled } from 'components/base/CheckField';
import { InputField } from 'components/base/InputFieldV2';
import { NormalInputField } from 'components/base/NormalInput';
import { TXUI_CLOCK, TXUI_PACKAGE, TXUI_PAYMENT_TYPE, TXUI_PROJECT, TXUI_TOKEN_TYPE } from 'constant';
import { ethers } from 'ethers';
import useResponsive from 'hooks/useResponsive';
import { toNumber } from 'lodash';
import { SuiContext } from 'provider/SuiProvider';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { PublicRoundSchema } from '../validations';

const StyledBuyTokenBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 229, 184, 0.2) 0%, rgba(109, 133, 218, 0.2) 100%)',
    padding: '32px 40px',
    color: 'white',
    borderRadius: 10,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    position: 'relative',
    marginTop: '2rem',
    [theme.breakpoints.down('sm')]: {
        padding: '32px 24px',
    },
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


const BuyTokenButton = styled(Button)(({ them }) => ({
    background: 'linear-gradient(255.34deg, #207BBF 21.95%, #4A94CB 39.94%, #5CBAF2 79.27%)',
    color: 'white',
    height: 48,
    width: 156,
    fontSize: 18,
    borderRadius: 48,
    alignItems: 'center',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
}));
const TokenButton = styled(Button)(({ theme }) => ({
    background: 'rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: '0.75rem 1rem',
    fontSize: 18,
    borderRadius: 10,
    marginRight: 16,
    '&.active': {
        background: 'linear-gradient(255.34deg, #207BBF 21.95%, #4A94CB 39.94%, #5CBAF2 79.27%)',
    },
    [theme.breakpoints.down('sm')]: {
        marginRight: 8,
    },
}));

const ExchangeRateBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    background:
        'linear-gradient(178.73deg, rgba(32, 123, 191, 1) 2.08%, rgba(74, 148, 203, 1)  32.81%, rgba(92, 186, 242, 1) 100%)',
    color: 'white',
    fontSize: 18,
    borderRadius: 10,
    padding: '7px 18px',
    fontWeight: 'bold',
    top: -20,
    left: 16,
}));

const MaxButton = styled(Button)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 16,
}));
const CheckBoxLabel = () => {
    return (
        <Typography
            sx={{
                color: 'white',
                '& a': { textDecorationColor: '#28A3AB', color: 'white', fontWeight: 700 },
            }}
            variant="body2"
        >
            I have read and agree to the
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
                {' '}
                YouSUI Staking Service Agreement.
            </a>
        </Typography>
    );
};
export const BuyTokenPublic = ({ name, minPurchase, ratio, symbol, balances, decimals }) => {
    const [loading, setLoading] = React.useState();
    const [checked, setChecked] = React.useState();
    const wallet = useWallet();

    const { allCoinObjectsId } = React.useContext(SuiContext);

    const theme = useTheme();


    const formattedPurchase = React.useMemo(() => {
        if (minPurchase) return ethers.utils.formatUnits(minPurchase, decimals);
    }, [decimals, minPurchase]);

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
            amount: formattedPurchase,
        },
        resolver: yupResolver(PublicRoundSchema),
    });

    const watchAmount = watch('amount');

    const isMobile = useResponsive('down', 'sm');


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
        const tx = new TransactionBlock();

        setLoading(true);

        const coinSuiObjectData = allCoinObjectsId.map((coin) => coin?.data);

        tx.setGasPayment(coinSuiObjectData);

        const balanceSplit = ethers.utils.parseUnits(
            (parseFloat(data?.amount * toNumber(ratio)).toFixed(decimals)).toString(),
            decimals
        ).toString();

        console.log('balanceSplit___ne', balanceSplit);
        const [coin] = tx.splitCoins(tx.gas, [tx.pure(balanceSplit)]);

        const parseAmount = ethers.utils.parseUnits((data?.amount).toString(), decimals).toString();

        const vec = tx.makeMoveVec({
            objects: [coin],
        });

        tx.moveCall({
            target: `${0x28002e99f5ab21b1733245ac7824a75bf4f31e4f86dd3627f689f3c67e0625af}::launchpad_ido::purchase`,
            typeArguments: [TXUI_TOKEN_TYPE, TXUI_PAYMENT_TYPE],
            arguments: [tx.object(TXUI_CLOCK), tx.object(TXUI_PROJECT), tx.pure(name), vec, tx.pure(parseAmount)],
        });

        try {
            const result = await wallet.signAndExecuteTransactionBlock({
                transactionBlock: tx,
            });
            if (result) {
                setLoading(false);
                toast.success('Buy token success');
                reset({ amount: '' });
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
        setValue('amount', balances / toNumber(ratio), { shouldDirty: true, shouldTouch: true, shouldValidate: true });
        trigger('amount');
    };
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
                        <MaxButton disabled={!wallet?.address || !wallet?.connected} onClick={handleSelectMax}>Max</MaxButton>
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
                                    href="https://docs.google.com/document/d/13uPJUMYXx62N9_UidmWwe2mL8MmFOrwVsvqx7byvPdk/edit"
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
