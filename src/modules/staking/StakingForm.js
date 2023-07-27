import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Checkbox, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';
import { TransactionBlock } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { BigNumber, ethers } from 'ethers';
import useResponsive from 'hooks/useResponsive';
import { toNumber } from 'lodash';
import { CLOCK, STAKING_PACKAGE_UPGRADE, STAKING_STORAGE } from 'onchain/constants';
import { formatEther } from 'onchain/helpers';
import { SuiContext } from 'provider/SuiProviderV2';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { fCurrencyV2 } from 'utils/util';
import * as yup from 'yup';
import { CustomInput, FormBox, PackageButton, StackingButton } from './component/StackingStyles';

export default function StakingForm({ verifyData, setVerifyData, sortedData, fetchUserStakingInfo }) {
    const [loading, setLoading] = React.useState(false);
    const [isAgree, setIsAgree] = React.useState(false);
    const isMobile = useResponsive('down', 'sm');
    const wallet = useWallet();
    const { assets, fetchBalance } = React.useContext(SuiContext);


    const currentTokenStaking = React.useMemo(
        () => assets.find((a) => a.symbol === verifyData?.currentTokenStakingSymbol),
        [assets, verifyData?.currentTokenStakingSymbol]
    );

    const formattedBalanceTokenStaking = React.useMemo(() => {
        if (currentTokenStaking) {
            return formatEther(currentTokenStaking?.balance, currentTokenStaking?.decimals);
        } else {
            return 0;
        }
    }, [currentTokenStaking]);

    const minStakeAmount = React.useMemo(() => verifyData?.minStakeAmount, [verifyData?.minStakeAmount]);

    const StakingSchema = yup.object().shape({
        amount: yup
            .number()
            .min(minStakeAmount, `Min amount must be ${minStakeAmount} XUI`)
            .positive('Amount must be a positive number')
            .typeError('Must be a number')
            .test('wallet-test', 'Connect your wallet before', () => wallet?.address && wallet?.connected)
            .test('balances', 'Your balances is not enough', (value) => {
                if (value > formattedBalanceTokenStaking) return false;
                if (formattedBalanceTokenStaking < verifyData?.minStakeAmount) return false;
                else return true;
            })
            .test('min-validate', `Min amount must be ${minStakeAmount} XUI`, (value) => value >= minStakeAmount),
    });

    const {
        control,
        handleSubmit,
        trigger,
        setValue,
        reset,
        formState: { isValid },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            amount: 0,
        },
        resolver: yupResolver(StakingSchema),
    });

    const handleStaking = async ({ amount }) => {
        const tx = new TransactionBlock();
        setLoading(true);

        if (!currentTokenStaking || !currentTokenStaking.coin) {
            console.log('currentTokenStaking or currentTokenStaking.coin is undefined');
            return;
        }

        let [primary, ...sub] = currentTokenStaking?.coin;

        let primaryCoin = tx.object(primary?.coinObjectId);

        if (sub.length) {
            tx.mergeCoins(
                primaryCoin,
                sub.map((a) => {
                    return tx.object(a.coinObjectId);
                })
            );
        }

        const balanceSplit = BigNumber.from(ethers.utils.parseUnits(toNumber(amount).toString(), 9).toString()).toString();

        const [coin] = tx.splitCoins(primaryCoin, [tx.pure(balanceSplit)]);

        tx.moveCall({
            target: `${STAKING_PACKAGE_UPGRADE}::staking::stake`,
            typeArguments: [`${currentTokenStaking.coinType}`],
            arguments: [tx.object(CLOCK), tx.object(STAKING_STORAGE), tx.pure(verifyData?.key), coin],
        });

        try {
            const result = await wallet.signAndExecuteTransactionBlock({
                transactionBlock: tx,
            });

            if (result) {
                toast.success('Staking token success');
                fetchBalance();
                fetchUserStakingInfo();
                setLoading(false);
                setIsAgree(false);
                reset({ amount: 0 });
            } else {
                setLoading(false);
                toast.error('Some thing went wrong');
            }
        } catch (error) {
            setLoading(false);
            toast.error('Some thing went wrong');
            console.log('Error___Handle Sales', error);
        }
    };

    const handleAll = React.useCallback(() => {
        try {
            if (!isNaN(formattedBalanceTokenStaking)) {
                setValue('amount', formattedBalanceTokenStaking);
                trigger('amount');
            } else {
                return;
            }
        } catch (error) {
            console.log('handleAll__Error', error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formattedBalanceTokenStaking]);

    return (
        <FormBox>
            <form onSubmit={handleSubmit(handleStaking)}>
                <Stack direction={'row'} justifyContent="space-between" mb={1.5}>
                    <Typography>Amount</Typography>
                    <Typography>
                        Available amount:{' '}
                        <strong>
                            {formattedBalanceTokenStaking ? fCurrencyV2(formattedBalanceTokenStaking) : 0}{' '}
                            {currentTokenStaking?.symbol}
                        </strong>
                    </Typography>
                </Stack>
                <CustomInput
                    id="amount"
                    name="amount"
                    control={control}
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <Stack direction={'row'} alignItems="center" mr={'-14px'}>
                                <Typography mr={2}>
                                    <strong>{currentTokenStaking?.symbol}</strong>
                                </Typography>
                                <Button
                                    onClick={handleAll}
                                    sx={{
                                        background: 'linear-gradient(178.73deg, #68E6B8 -8.02%, #6D85DA 98.69%)',
                                        boxShadow: '0px 0px 8px #4191C9',
                                        padding: '10px 32px',
                                        color: 'white',
                                        '&:hover': {
                                            background:
                                                'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
                                            boxShadow: '0px 0px 8px #4191C9',
                                            color: 'white',
                                        },
                                    }}
                                    variant="contained"
                                >
                                    ALL
                                </Button>
                            </Stack>
                        ),
                    }}
                    fullWidth
                />
                <Typography>
                    Minimum: <strong>{fCurrencyV2(verifyData?.minStakeAmount)} XUI</strong>
                </Typography>
                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    gap={1}
                    mt={2}
                    flexWrap={isMobile ? 'wrap' : 'nowrap'}
                >
                    {sortedData.map((p, index) => (
                        <PackageButton
                            className={p.time === verifyData.time ? `active ${p.className}` : ''}
                            onClick={() => setVerifyData(p)}
                            key={index}
                        >
                            {p?.name}
                        </PackageButton>
                    ))}
                </Stack>
                <Stack direction={isMobile ? 'column' : 'row'} justifyContent={'space-between'} alignItems="center" mt={2}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={isAgree} onChange={(e) => setIsAgree(e.target.checked)} />}
                            label={<CheckBoxLabel />}
                            sx={{
                                margin: '1rem 0',
                                '& svg': {
                                    color: '#28A3AB',
                                },
                            }}
                        />
                    </FormGroup>
                    <StackingButton type="submit" disabled={!isAgree || !isValid} loading={loading}>
                        Staking now
                    </StackingButton>
                </Stack>
            </form>
        </FormBox>
    );
}

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
                href="https://docs.google.com/document/d/1JzcDYZby0DkeSJFM2uyqRMlf6UMY2GKuO7wXaIH6NXQ/"
                target="_blank"
                rel="noreferrer"
            >
                {' '}
                YouSUI Staking Service Agreement.
            </a>
        </Typography>
    );
};
