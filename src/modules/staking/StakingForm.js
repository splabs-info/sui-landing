import { Button, Checkbox, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';
import useResponsive from 'hooks/useResponsive';
import React from 'react';
import { CustomInput, FormBox, PackageButton, StackingButton } from './component/StackingStyles';
import { fCurrencyV2 } from 'utils/util'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'
import { TransactionBlock } from '@mysten/sui.js';
import { SuiContext } from 'provider/SuiProviderV2';
import { BigNumber, ethers } from 'ethers';
import { round, toNumber } from 'lodash'
export default function StakingForm({ verifyData, setVerifyData, sortedData }) {
    // const [amount, setAmount] = React.useState(0);
    const [loading, setLoading] = React.useState(false)
    const [isAgree, setIsAgree] = React.useState(false);
    const isMobile = useResponsive('down', 'sm');

    const { balances, coinObjectsId, assets } = React.useContext(SuiContext);

    const StakingSchema = yup.object().shape({
        amount: yup
            .number()
            .min(verifyData?.minStakeAmount, `Min amount must be ${verifyData?.minStakeAmount} XUI`)
            .positive('Amount must be a positive number')
    })

    console.log('assets___', assets)

    // const {
    //     control,
    //     handleSubmit,
    //     trigger,
    //     setValue,
    //     reset,
    //     formState: { isValid },
    // } = useForm({
    //     mode: 'onChange',
    //     defaultValues: {
    //         amount: 0,
    //     },
    //     resolver: yupResolver(StakingSchema),
    // });

    const handleStaking = ({ amount }) => {
        const tx = new TransactionBlock();
        const coinSuiObjectData = coinObjectsId.map((coin) => coin?.data);

        tx.setGasPayment(coinSuiObjectData);


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

    }
    return (
        <FormBox>
            <Stack direction={'row'} justifyContent="space-between">
                <Typography>Amount</Typography>
                <Typography>0 XUI</Typography>
            </Stack>
            <CustomInput
                id="amount"
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <Stack direction={'row'} alignItems="center" mr={'-14px'}>
                            <Typography>XUI</Typography>
                            <Button variant="contained">ALL</Button>
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
                onChange={(e) => {
                    // setAmount(e.target.value);
                }}
                fullWidth
            />
            <Typography mt={1}>
                Minimum: <strong>{fCurrencyV2(verifyData?.minStakeAmount)} XUI</strong>
            </Typography>
            <Stack direction={'row'} justifyContent={'space-between'} gap={1} mt={2} flexWrap={'wrap'}>
                {sortedData.map((p, index) => (
                    <PackageButton
                        className={p.time === verifyData.time ? `active ${p.className}` : ''}
                        onClick={() => setVerifyData(p)}
                        key={index}
                    >
                        {p.time} days {p.time === 180 ? '(30% APR)' : ''}
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
                <StackingButton type="submit">Staking now</StackingButton>
            </Stack>
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
