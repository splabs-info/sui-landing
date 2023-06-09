import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, InputAdornment, Stack, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { TransactionBlock } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { CheckboxFiled } from 'components/base/CheckField';
import { InputField } from 'components/base/InputFieldV2';
import { NormalInputField } from 'components/base/NormalInput';
import { TXUI_CLOCK, TXUI_PACKAGE, TXUI_PAYMENT_TYPE } from 'constant';
import { ethers } from 'ethers';
import useResponsive from 'hooks/useResponsive';
import { toNumber } from 'lodash';
import { SuiContext } from 'provider/SuiProvider';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const StyledBuyTokenBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 229, 184, 0.2) 0%, rgba(109, 133, 218, 0.2) 100%)',
    padding: '24px 32px',
    color: 'white',
    borderRadius: 10,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    position: 'relative',
    marginTop: 16,
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

const MaxButton = styled(Button)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 8,
    fontSize: 12,
}));

export const BuyTokenPublic = ({ name, tokenType, minPurchase, ratio, symbol, balances, decimals }) => {
    const [loading, setLoading] = React.useState();
    const [checked, setChecked] = React.useState();
    const wallet = useWallet();

    const { allCoinObjectsId } = React.useContext(SuiContext);

    const { projectId } = useParams();
    const decodedProjectId = decodeURIComponent(projectId);
    const theme = useTheme();

    const formattedPurchase = React.useMemo(() => {
        if (minPurchase) return ethers.utils.formatUnits(minPurchase, decimals);
    }, [decimals, minPurchase]);

    const convertedMinPurchase = toNumber(formattedPurchase);

    const PublicRoundSchema = yup.object().shape({
        amount: yup
            .number()
            .min(convertedMinPurchase, `Min purchase must be  ${convertedMinPurchase} ${symbol}`)
            .required('Amount is required')
            .typeError('Must be number'),
    });


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
            (parseFloat(data?.amount * toNumber(ratio)).toFixed(3)).toString(),
            decimals
        ).toString();

        const [coin] = tx.splitCoins(tx.gas, [tx.pure(balanceSplit)]);

        const parseAmount = ethers.utils.parseUnits(parseFloat((data?.amount)).toFixed(decimals).toString(), decimals).toString();

        const vec = tx.makeMoveVec({
            objects: [coin],
        });

        tx.moveCall({
            target: `${TXUI_PACKAGE}::launchpad_ido::purchase`,
            typeArguments: [`0x${tokenType}`, TXUI_PAYMENT_TYPE],
            arguments: [tx.object(TXUI_CLOCK), tx.object(decodedProjectId), tx.pure(name), vec, tx.pure(parseAmount)],
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
                toast.error('Some thing went wrong');
            }
        } catch (e) {
            setLoading(false);
            toast.error('Transaction rejected');
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
        setValue('amount', ((balances - 0.05) / toNumber(ratio) ), { shouldDirty: true, shouldTouch: true, shouldValidate: true });
        trigger('amount');
    };
    return (
        <StyledBuyTokenBox>
            <Stack>
                <form onSubmit={handleSubmit(handleSales)}>
                    <Stack direction="row" justifyContent="flex-end" spacing={1} alignItems="center">
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
                        <MaxButton disabled={!wallet?.address || !wallet?.connected} onClick={handleSelectMax}>Max</MaxButton>
                    </Stack>

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
