/* eslint-disable default-case */
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, InputAdornment, Stack, Typography } from '@mui/material';
import { TransactionBlock } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { CheckboxFiled, InputField } from 'components';
import { BigNumber, ethers } from 'ethers';
import useResponsive from 'hooks/useResponsive';
import { debounce, includes, isEmpty, min, round, toNumber } from 'lodash';
import { BuyTokenButton, SaleFormBox, TokenButton } from 'modules/ido-round/components/RoundStyled';
import * as moment from 'moment';
import { CLOCK, LAUNCHPAD_STORAGE, PACKAGE_UPGRADE, RELEAP_PROJECT_NAME, STAKING_STORAGE, XUI_PROJECT_NAME } from 'onchain/constants';
import { SuiContext } from 'provider/SuiProviderV2';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { fAddress } from 'utils/format';
import { fCurrencyV2 } from 'utils/util';
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
    endAt,
    startAt,
    whiteList,
    symbol,
    fetchClaimInfo,
    totalXUILocked,
}) => {
    const [checked, setChecked] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const currentTier = React.useRef(null);

    const [chosenToken, setChosenToken] = React.useState('');

    const isMobile = useResponsive('down', 'sm');
    const wallet = useWallet();
    const { objectIdOGRoleNft } = useYouSuiStore();

    const { balances, coinObjectsId, fetchBalance, fetchData } = React.useContext(SuiContext);

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

    const formattedBalance = React.useMemo(() => {
        if (!isNaN(balances)) {
            return balances / formattedRatio
        }
    }, [balances, formattedRatio])
    const inWhiteList = React.useMemo(() => {
        if (!whiteList || isEmpty(whiteList) || !wallet?.address) return;
        return includes(whiteList, wallet.address);
    }, [wallet?.address, whiteList]);

    const IDOSchema = yup.object().shape({
        amount: yup
            .number()
            .min(minPurchase, `Min purchase must be ${minPurchase} ${symbol}`)
            .positive('Value must be a positive number')
            .required('Amount is required')
            .typeError('Must be number')
            .test('wallet-test', 'Connect your wallet before', () => wallet?.address && wallet?.connected)
            .test('balances', 'Your balances is not enough', function (value) {
                if (value > balances / toNumber(formattedRatio)) {
                    return this.createError({ message: 'Your balances is not enough' });
                }
                return true;
            })
            .test('og-sale-tests', function (value) {
                if (roundName === 'Og_Sale') {
                    if (!inWhiteList && objectIdOGRoleNft === '') {
                        return this.createError({ message: 'Your wallet address not really in the white list' });
                    }
                    if (poolRemaining / toNumber(formattedRatio) < value) {
                        return this.createError({ message: 'Pool remaining is smaller than the amount want to buy' });
                    }
                    if (value > totalSupply) {
                        return this.createError({ message: 'Total supply is not enough' });
                    }
                }
                return true;
            })
            .test('min', `Min purchase must be ${minPurchase} ${symbol}`, (value) => {
                if (value < minPurchase) return false;
                else return true;
            })
            .test('nft-validate', 'Your wallet is currently not participating in staking, inputting Tier NFT, or in the whitelist.', () => {
                if (projectName === RELEAP_PROJECT_NAME && roundName === 'Community_Sale' && objectIdOGRoleNft === '' && currentTier.current === 'non_tier' && !inWhiteList) {
                    return false
                } else return true;
            })
            .test('max-purchase', `Max purchase must be ${maxPurchase} ${symbol}`, (value) => {
                if (projectName === RELEAP_PROJECT_NAME) {
                    if (value > maxPurchase) return false;
                    else return true;
                } else return true;
            })
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

    const watchAmount = watch('amount')
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
        if (!isNaN(poolRemaining)) {
            setValue('amount', poolRemaining);
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

    const handleSelectPublicMax = async () => {
        if (!isNaN(balances)) {
            setValue('amount', balances / toNumber(formattedRatio));
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
        if (!isNaN(balances)) {
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
        if (!isNaN(balances)) {
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
        if (!isNaN(balances)) {
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

    const handleMaxReleap = async () => {
        if (!isNaN(poolRemaining) && !isNaN(maxPurchase) && !isNaN(formattedBalance)) {
            const max = min([poolRemaining, maxPurchase, formattedBalance])
            console.log('max__', max)
            setValue('amount', max);
            trigger('amount')
        } else {
            console.error(
                'maxPurchase or decimals is not a valid value: maxPurchase = ',
                maxPurchase,
                ', decimals = ',
                decimals
            );
        }
    }

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
                if (projectName === XUI_PROJECT_NAME && roundName === 'Og_Sale') return handleSelectMax();
                if (projectName === XUI_PROJECT_NAME && roundName === 'Public_Sale') return handleSelectPublicMax();
                if (projectName === RELEAP_PROJECT_NAME) return handleMaxReleap();
                break;
        }
    };

    const renderStatusBalance = React.useCallback(() => {
        if (isEmpty(payments) || isNaN(balances)) {
            return 'Loading';
        }
        if (!wallet?.address || !wallet?.connected) {
            return 'Connect your wallet before';
        }

        if (!isNaN(balances) && payments) {
            return (
                <Stack direction={'row'}>
                    <Typography
                        sx={{
                            fontWeight: 'normal',
                            fontSize: 15,
                        }}
                        mr={1}
                    >
                        Available amount:
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 'bold',
                            fontSize: 15,
                        }}
                    >
                        {fCurrencyV2(balances)} {payments[0].symbol}
                    </Typography>
                </Stack>
            );
        }
    }, [balances, payments, wallet?.address, wallet?.connected]);

    const handleSales = async (data) => {
        const tx = new TransactionBlock();

        setLoading(true);

        const formattedAmount = data?.amount;
        const coinSuiObjectData = coinObjectsId.map((coin) => coin?.data);

        tx.setGasPayment(coinSuiObjectData);

        const balanceSplit = BigNumber.from(
            ethers.utils.parseUnits(round(toNumber(formattedAmount), 3).toString(), 9).toString()
        )
            .mul(BigNumber.from(payments[0].ratio_per_token.toString()))
            .div(BigNumber.from('1000000000'))
            .toString();

        const [coin] = tx.splitCoins(tx.gas, [tx.pure(balanceSplit)]);

        const parseAmount = ethers.utils.parseUnits(round(toNumber(formattedAmount), 3).toString(), 9).toString();

        const vec = tx.makeMoveVec({
            objects: [coin],
        });

        if (projectName === XUI_PROJECT_NAME && roundName === 'Og_Sale' && objectIdOGRoleNft !== '') {
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
                    tx.object(objectIdOGRoleNft),
                ],
            });
        } else if (projectName === XUI_PROJECT_NAME && roundName === 'Og_Sale' && objectIdOGRoleNft === '') {
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
        } else if (projectName === XUI_PROJECT_NAME && roundName === 'Public_Sale') {
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
        } else if (projectName === RELEAP_PROJECT_NAME && roundName === 'Public_Sale') {
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
        } else if (projectName === RELEAP_PROJECT_NAME && roundName === 'Community_Sale') {
            if (inWhiteList) {
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
            } else {
                if (objectIdOGRoleNft !== '') {
                    tx.moveCall({
                        target: `${PACKAGE_UPGRADE}::launchpad::purchase_yousui_tier45_holder`,
                        typeArguments: [`0x${type}`, `0x${payments[0]?.method_type}`],
                        arguments: [
                            tx.object(CLOCK),
                            tx.object(LAUNCHPAD_STORAGE),
                            tx.pure(projectName),
                            tx.pure(roundName),
                            tx.pure(parseAmount),
                            vec,
                            tx.object(objectIdOGRoleNft),
                        ],
                    });
                } else {
                    tx.moveCall({
                        target: `${PACKAGE_UPGRADE}::launchpad::purchase_nor_staking`,
                        typeArguments: [`0x${type}`, `0x${payments[0]?.method_type}`],
                        arguments: [
                            tx.object(CLOCK),
                            tx.object(LAUNCHPAD_STORAGE),
                            tx.pure(projectName),
                            tx.pure(roundName),
                            tx.pure(parseAmount),
                            vec,
                            tx.object(STAKING_STORAGE),
                        ],
                    });
                }
            }
        }

        try {
            const result = await wallet.signAndExecuteTransactionBlock({
                transactionBlock: tx,
            });

            if (result) {
                fetchData();
                fetchClaimInfo();
                fetchBalance();

                const _debounce = debounce(() => {
                    setLoading(false);
                    toast.success('Buy token success');
                    reset({ amount: 0 });
                }, 3000);

                _debounce();
            } else {
                setLoading(false);
                toast.error('Some thing went wrong');
            }
        } catch (e) {
            console.log('err', e);
            setLoading(false);
            toast.error('Transaction rejected');
        }
    };

    const handleChecked = (event) => {
        setChecked(event.target.checked);
    };

    const renderRoundState = React.useCallback(() => {
        if (!isNaN(poolRemaining) && minPurchase && endAt && startAt) {
            if (poolRemaining < minPurchase && roundName === 'Og_Sale') {
                return <BuyTokenButton disabled>Sold out</BuyTokenButton>;
            }

            if (poolRemaining < minPurchase && projectName === RELEAP_PROJECT_NAME) {
                return <BuyTokenButton disabled>Sold out</BuyTokenButton>;
            }

            const currentTime = moment();

            if (currentTime.isBefore(moment(toNumber(startAt)))) {
                return <BuyTokenButton disabled>UpComing</BuyTokenButton>;
            }
            if (currentTime.isAfter(moment(toNumber(endAt)))) {
                return <BuyTokenButton disabled>End Time</BuyTokenButton>;
            }
            return (
                <BuyTokenButton disabled={!isValid || !checked} loading={loading} type="submit">
                    Buy Now
                </BuyTokenButton>
            );
        }
    }, [checked, endAt, isValid, loading, minPurchase, poolRemaining, projectName, roundName, startAt]);

    const renderTier = React.useCallback(() => {
        if (wallet?.address && wallet?.connected) {
            if (projectName === RELEAP_PROJECT_NAME) {
                if (totalXUILocked >= 40000) {
                    currentTier.current = 'tier_1';
                    return '( Tier 1 )'
                }
                if (totalXUILocked >= 20000) {
                    currentTier.current = 'tier_2';
                    return '( Tier 2 )';
                }
                if (totalXUILocked >= 7500) {
                    currentTier.current = 'tier_3';
                    return '( Tier 3 )';
                }
                if (totalXUILocked >= 5000) {
                    currentTier.current = 'tier_4';
                    return '( Tier 4 )';
                }
                if (totalXUILocked >= 3000) {
                    currentTier.current = 'tier_5';
                    return '( Tier 5 )';
                } else {
                    currentTier.current = 'non_tier';
                    return '( Non-tier )';
                }
            } else return '';
        } else return ''
    }, [projectName, totalXUILocked, wallet?.address, wallet?.connected]);

    return (
        <>
            <SaleFormBox sx={{ position: 'relative' }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'linear-gradient(178.73deg, rgba(104, 229, 184, 0.2) 0%, rgba(109, 133, 218, 0.2) 100%)',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
                        position: 'absolute',
                        padding: '16px 36px',
                        width: '100%',
                        top: 0,
                        left: 0,
                        borderRadius: '9px'
                    }}
                    mb={2}
                >
                    <Box sx={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', width: '100%',
                    }}>

                        <Typography sx={{ fontSize: 15, fontWeight: 'bold', color: '#1FD8D1', textShadow: '' }}>
                            {wallet?.address ? `${fAddress(wallet?.address)} ${renderTier()}` : '--'}
                        </Typography>
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
                </Box>
                <form onSubmit={handleSubmit(handleSales)} style={{ position: 'relative' }}>

                    <Stack direction={'row'} alignItems={'center'} mt={8}>
                        <InputField
                            id="amount"
                            name="amount"
                            control={control}

                            sx={{
                                fontWeight: 'bold',
                                color: 'white',
                            }}
                            box={{
                                width: '100%',
                                marginRight: '16px'
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
                                        {symbol}
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <InputField
                            control={control}
                            name="currency"
                            sx={{ borderRadius: '10px', maxHeight: 40, textAlign: 'right' }}
                            size="small"
                            disabled
                            value={watchAmount && !isEmpty(payments) ? fCurrencyV2(watchAmount * toNumber(formattedRatio), 4) : 0}
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
                    </Stack>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            flexWrap: 'wrap',
                        }}
                    >
                        {['Min', 'Max'].map((token) => (
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
                        {renderRoundState()}
                    </Stack>
                </form>
            </SaleFormBox>
        </>
    );
};
