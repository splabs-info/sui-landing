/* eslint-disable default-case */
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, InputAdornment, Stack, Typography } from '@mui/material';
import { TransactionBlock } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { CheckboxFiled, InputField } from 'components';
import { ethers } from 'ethers';
import useResponsive from 'hooks/useResponsive';
import { isEmpty, toNumber } from 'lodash';
import { BuyTokenButton, SaleFormBox, TokenButton } from 'modules/ido-round/components/RoundStyled';
import { CLOCK, LAUNCHPAD_STORAGE, PACKAGE_UPGRADE } from 'onchain/constants';
import { SuiContext } from 'provider/SuiProviderV2';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { fCurrency } from 'utils/format';
import * as yup from 'yup';
import { useYouSuiStore } from 'zustand-store/yousui_store';

export const BuyForm = ({
    totalSold,
    totalSupply,
    payments,
    decimals,
    minPurchase,
    maxPurchase,
    type,
    projectName,
    purchaseType,
    roundName,
}) => {
    const [checked, setChecked] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [chosenToken, setChosenToken] = React.useState('');
    const isMobile = useResponsive('down', 'sm');
    const wallet = useWallet();
    const { objectIdOGRoleNft } = useYouSuiStore();

    const { balances, coinObjectsId } = React.useContext(SuiContext);

    const poolRemaining = React.useMemo(() => {
        if (totalSupply && (totalSold || totalSold === 0)) {
            return totalSupply - totalSold;
        }
    }, [totalSold, totalSupply]);

    const formattedRatio = React.useMemo(() => {
        if (!isEmpty(payments)) {
            return ethers.utils.formatUnits(payments[0].ratio_per_token, decimals);
        }
    }, [decimals, payments]);

    const IDOSchema = yup.object().shape({
        amount: yup
            .number()
            .min(minPurchase, `Min purchase must be ${minPurchase} XUI`)
            .max(maxPurchase, `Per user can buy ${maxPurchase} maximum of XUI on this round.`)
            .required('Amount is required')
            .typeError('Must be number')
            .test('wallet-test', 'Connect your wallet before', () => wallet?.address && wallet?.connected)
            .test('balance-check', 'Your balance is not enough', (value) => value * toNumber(formattedRatio) <= balances),
    });

    const {
        control,
        handleSubmit,
        watch,
        trigger,
        setValue,
        reset,
        formState: { isValid },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            amount: 0,
        },
        resolver: yupResolver(IDOSchema),
    });

    const watchAmount = watch('amount');

    const handleSelectMin = async () => {
        const minPurchaseNum = minPurchase.toString();
        const decimalsNum = decimals.toString();

        if (minPurchaseNum && decimalsNum) {
            setValue('amount', minPurchase);
            trigger('amount');
        } else {
            console.error('minPurchase or decimals is not a valid value: minPurchase = ', minPurchase);
        }
    };

    const handleSelectMax = async () => {
        if (balances && balances) {
            setValue('amount', balances / formattedRatio);
            trigger('amount');
        } else {
            console.error(
                'maxPurchase or decimals is not a valid value: maxPurchase = ',
                maxPurchase,
                ', decimals = ',
                decimals
            );
        }
    };

    const handleSelect25 = async () => {
        if (balances && decimals) {
            setValue('amount', (balances / toNumber(formattedRatio)) * 0.25);
            trigger('amount');
        } else {
            console.error(
                'maxPurchase or decimals is not a valid value: maxPurchase = ',
                maxPurchase,
                ', decimals = ',
                decimals
            );
        }
    };

    const handleSelect50 = async () => {
        if (balances && decimals) {
            setValue('amount', (balances / toNumber(formattedRatio)) * 0.5);
            trigger('amount');
        } else {
            console.error(
                'maxPurchase or decimals is not a valid value: maxPurchase = ',
                maxPurchase,
                ', decimals = ',
                decimals
            );
        }
    };

    const handleSelect75 = async () => {
        if (balances && decimals) {
            setValue('amount', (balances / toNumber(formattedRatio)) * 0.75);
            trigger('amount');
        } else {
            console.error(
                'maxPurchase or decimals is not a valid value: maxPurchase = ',
                maxPurchase,
                ', decimals = ',
                decimals
            );
        }
    };

    const selectPercent = (option) => {
        switch (option) {
            case 'Min':
                handleSelectMin();
                break;
            case '25':
                handleSelect25();
                break;
            case '50':
                handleSelect50();
                break;
            case '75':
                handleSelect75();
                break;
            case 'Max':
                handleSelectMax();
                break;
        }
    };

    const canBuy = () => {
        if (balances && watchAmount) {
            if (!wallet?.address) return false;
            if (balances < watchAmount * toNumber(formattedRatio)) return false;
            return true;
        } else return;
    };

    const isCanBuy = canBuy();

    console.log('purchaseType____', purchaseType)
    const renderStatusBalance = React.useCallback(() => {
        if (isEmpty(payments) || isEmpty(balances)) {
            return 'Loading';
        }
        if (!wallet?.address || !wallet?.connected) {
            return 'Connect your wallet before';
        }
        if (balances && payments) {
            return `Available amount: ${fCurrency(balances)} ${payments[0].symbol}`;
        }
    }, [balances, payments, wallet?.address, wallet?.connected]);

    const handleSales = async (data) => {
        const tx = new TransactionBlock();
        setLoading(true);

        const formattedAmount = data?.amount;
        const coinSuiObjectData = coinObjectsId.map((coin) => coin?.data);

        tx.setGasPayment(coinSuiObjectData);

        const balanceSplit = ethers.utils
            .parseUnits(
                // @ts-ignore
                parseFloat(formattedAmount * toNumber(formattedRatio))
                    .toFixed(decimals)
                    .toString(),
                decimals.toString() // Convert decimals to string
            )
            .toString();

        const [coin] = tx.splitCoins(tx.gas, [tx.pure(balanceSplit)]);

        const parseAmount = ethers.utils.parseUnits(formattedAmount.toString(), decimals).toString();

        const vec = tx.makeMoveVec({
            objects: [coin],
        });

        let purchase = objectIdOGRoleNft === '' ? 1 : 3;

        switch (purchase) {
            case 1:
                tx.moveCall({
                    target: `${PACKAGE_UPGRADE}::launchpad::purchase_nor`,
                    typeArguments: [`0x${type}`, `0x${payments[0]?.method_type}`],
                    arguments: [
                        tx.object(CLOCK),
                        tx.object(LAUNCHPAD_STORAGE),
                        tx.pure(projectName),
                        tx.pure(roundName),
                        tx.pure(parseAmount),
                        vec,
                    ],
                });
                break;
            case 2:
                break;
            case 3:
                tx.moveCall({
                    target: `${PACKAGE_UPGRADE}::launchpad::purchase_yousui_og_holder`,
                    typeArguments: [`0x${type}`, `0x${payments[0]?.method_type}`],
                    arguments: [
                        tx.object(CLOCK),
                        tx.object(LAUNCHPAD_STORAGE),
                        tx.pure(projectName),
                        tx.pure(roundName),
                        tx.pure(parseAmount),
                        vec,
                        tx.object(objectIdOGRoleNft)
                    ],
                });
                break;
            default:
                break;
        }

        try {
            const result = await wallet.signAndExecuteTransactionBlock({
                transactionBlock: tx,
            });

            if (result) {
                setLoading(false);
                toast.success('Buy token success');
                reset({ amount: 0 });
            } else {
                setLoading(false);
                toast.error('Some thing went wrong');
            }
        } catch (e) {
            setLoading(false);
            toast.error('Transaction rejected');
        }
    };

    const handleChecked = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <SaleFormBox>
            <form onSubmit={handleSubmit(handleSales)}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    mb={2}
                >
                    <Typography sx={{}}>Amount:</Typography>
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
                <Box>
                    <InputField
                        id="amount"
                        name="amount"
                        control={control}
                        sx={{
                            fontWeight: 'bold',
                            color: 'white',
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
                                    XUI
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        flexWrap: 'wrap',
                    }}
                >
                    {['Min', '25', '50', '75', 'Max'].map((token) => (
                        <TokenButton
                            key={token}
                            className={chosenToken === token ? 'active' : ''}
                            onClick={() => selectPercent(token)}
                        >
                            {token}
                            {isNaN(Number(token)) ? '' : '%'}
                        </TokenButton>
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
                            },
                        }}
                    >
                        <CheckboxFiled handleChecked={handleChecked} />
                        <Typography variant="caption">
                            I've have read & accepted{' '}
                            <a
                                href="https://docs.google.com/document/d/1cbvUvE28TfKMIUhxzMQgl5O_wO2eEqdhFsKr2bQ8Q0M/edit"
                                target="_blank"
                                rel="noreferrer"
                            >
                                YouSUI Launchpad Privacy Policy
                            </a>{' '}
                            {', '}
                            <a
                                href="https://docs.google.com/document/d/1RRO6w77nJyHE7LwGwLsSgr4GKcuMVSwQ6DinGnDi96s/edit"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Terms of Service
                            </a>
                            {' & '}
                            <a
                                href="https://docs.google.com/document/d/1guvKALX-dLP_wH7YErnrS00WWZZzhARdSyl_pK3Es3o/edit?usp=sharing"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Disclaimer
                            </a>
                        </Typography>
                    </Box>
                    <BuyTokenButton type="submit" loading={loading} disabled={!isValid || !checked || !isCanBuy}
                    >
                        Buy Now
                    </BuyTokenButton>
                </Stack>
            </form>
        </SaleFormBox>
    );
};
