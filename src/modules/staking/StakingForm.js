import { Button, Checkbox, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';
import useResponsive from 'hooks/useResponsive';
import React from 'react';
import { CustomInput, FormBox, PackageButton, StackingButton } from './component/StackingStyles';
import { fCurrencyV2 } from 'utils/util';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { TransactionBlock } from '@mysten/sui.js';
import { SuiContext } from 'provider/SuiProviderV2';
import { BigNumber, ethers } from 'ethers';
import { round, toNumber } from 'lodash';
import { useWallet } from '@suiet/wallet-kit';
import { formatEther } from 'onchain/helpers';
export default function StakingForm({ verifyData, setVerifyData, sortedData }) {
    // const [amount, setAmount] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [isAgree, setIsAgree] = React.useState(false);
    const isMobile = useResponsive('down', 'sm');
    const wallet = useWallet();
    const { assets } = React.useContext(SuiContext);

    const currentTokenStaking = assets.find((a) => a.symbol === verifyData?.currentTokenStakingSymbol);

    const formattedBalanceTokenStaking = React.useMemo(() => {
        if (currentTokenStaking) {
            return formatEther(currentTokenStaking?.balance, currentTokenStaking?.decimals);
        } else {
            return 0;
        }
    }, [currentTokenStaking]);


    const StakingSchema = yup.object().shape({
        amount: yup
            .number()
            .min(verifyData?.minStakeAmount, `Min amount must be ${verifyData?.minStakeAmount} XUI`)
            .positive('Amount must be a positive number')
            .typeError('Must be a number')
            .test('wallet-test', 'Connect your wallet before', () => wallet?.address && wallet?.connected)
            .test('balances', 'Your balances is not enough', (value) => {
                if (value > formattedBalanceTokenStaking) return false
                else return true
            })
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

    const handleStaking = ({ amount }) => {
        // const tx = new TransactionBlock();
        // const coinSuiObjectData = coinObjectsId.map((coin) => coin?.data);
        // tx.setGasPayment(coinSuiObjectData);
        // const balanceSplit = BigNumber.from(
        //     ethers.utils.parseUnits(round(toNumber(amount), 3).toString(), 9).toString()
        // )
        //     .mul(BigNumber.from((payments[0].ratio_per_token).toString()))
        //     .div(BigNumber.from("1000000000"))
        //     .toString();
        // const [coin] = tx.splitCoins(tx.gas, [tx.pure(balanceSplit)]);
        // const parseAmount = ethers.utils.parseUnits(round(toNumber(amount), 3).toString(), 9).toString();
        // const vec = tx.makeMoveVec({
        //     objects: [coin],
        // });
    };

    const handleAll = React.useCallback(() => { }, [])

    return (
        <FormBox>
            <form onSubmit={handleSubmit(handleStaking)}>
                <Stack direction={'row'} justifyContent="space-between" mb={1.5}>
                    <Typography>Amount</Typography>
                    <Typography>
                        Available amount:{' '}
                        <strong>
                            {formattedBalanceTokenStaking ? fCurrencyV2(formattedBalanceTokenStaking) : 0} {currentTokenStaking?.symbol}
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
                                <Typography mr={2}><strong>{currentTokenStaking?.symbol}</strong></Typography>
                                <Button sx={{
                                    background:
                                        'linear-gradient(178.73deg, #68E6B8 -8.02%, #6D85DA 98.69%)',
                                    boxShadow: '0px 0px 8px #4191C9',
                                    padding: '10px 32px',
                                    color: 'white',
                                    '&:hover': {
                                        background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
                                        boxShadow: '0px 0px 8px #4191C9',
                                        color: 'white',
                                    },
                                }} variant="contained">ALL</Button>
                            </Stack>
                        ),
                        onWheel: (e) => e.target.blur(),
                    }}
                    type="number"
                    onKeyDown={(e) => {
                        if (['-', '+', 'e', 'E', '.', ','].includes(e.key)) {
                            e.preventDefault();
                        }
                        if (e.target.value.length === 0 && e.key === '.') {
                            e.preventDefault();
                        }
                    }}
                    min={0}
                    fullWidth
                />
                <Typography>
                    Minimum: <strong>{fCurrencyV2(verifyData?.minStakeAmount)} XUI</strong>
                </Typography>
                <Stack direction={'row'} justifyContent={'space-between'} gap={1} mt={2} flexWrap={'wrap'}>
                    {sortedData.map((p, index) => (
                        <PackageButton
                            className={p.time === verifyData.time ? `active ${p.className}` : ''}
                            onClick={() => setVerifyData(p)}
                            key={index}
                        >
                            {p?.time} days {p?.time === 180 ? '(30% APR)' : ''}
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
                    <StackingButton type="submit" disabled={!isAgree}>Staking now</StackingButton>
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
