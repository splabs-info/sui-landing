import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { styled, useTheme } from '@mui/material/styles';
import { useWallet } from '@suiet/wallet-kit';
import { CheckboxFiled } from 'components/base/CheckField';
import { InputField } from 'components/base/InputFieldV2';
import { NormalInputField } from 'components/base/NormalInput';
import { ACCOUNT_STORAGE, NAME, PACKAGE, PROJECT, TOKEN_TYPE } from 'constant';
import { ethers } from 'ethers';
import useResponsive from 'hooks/useResponsive';
import { toNumber } from 'lodash';
import { SuiContext } from 'provider/SuiProvider';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IdoSchema } from '../validations';

const StyledBuyTokenBox = styled(Box)(({ theme }) => ({
    background:
        'linear-gradient(178.73deg, rgba(104, 229, 184, 0.2) 0%, rgba(109, 133, 218, 0.2) 100%)',
    padding: '40px 40px',
    color: 'white',
    borderRadius: 10,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    position: 'relative',
    marginTop: '1rem',
}));

const StyledBuyTokenBtn = styled(Button)(({ them }) => ({
    // background:
    //     'linear-gradient(178.73deg, rgba(32, 123, 191, 1) 2.08%, rgba(74, 148, 203, 1)  32.81%, rgba(92, 186, 242, 1) 100%)',
    background:
        'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
    color: 'white',
    height: 48,
    width: 156,
    fontSize: 18,
    borderRadius: 48,
    alignItems: 'center',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
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
                href="https://docs.google.com/document/d/13uPJUMYXx62N9_UidmWwe2mL8MmFOrwVsvqx7byvPdk/edit"
                target="_blank"
                rel="noreferrer"
            >
                {' '}
                YouSUI Staking Service Agreement.
            </a>
        </Typography>
    );
};
export const BuyTokenOG = () => {
    const [checked, setChecked] = React.useState();

    const [ratio, setRadio] = React.useState();

    const theme = useTheme();
    const wallet = useWallet();
    const { provider, balances, tx, allObjectsId } = React.useContext(SuiContext);

    const {
        control,
        handleSubmit,
        formState: { isValid },
        watch,
    } = useForm({
        mode: 'onChange',
        defaultValues: '',
        resolver: yupResolver(IdoSchema),
    });

    const isMobile = useResponsive('down', 'sm');

    const watchAmount = watch('amount');

    React.useEffect(() => {
        if (!wallet?.address) return;
        else {
            (async () => {
                // If coin type is not specified, it defaults to 0x2::sui::SUI
                const txn = await provider.getObject({
                    id: '0xe9e2a6278c49d2628493ee6bbb8663f6c37aab41435b75e44f83494040adabaf',
                    options: { showContent: true },
                });

                const round = txn?.data?.content?.fields;
                if (round) {
                    const suiRatio = ethers.utils.formatUnits(
                        round?.payments?.fields.contents[0]?.fields?.value?.fields.ratio_per_token,
                        9
                    );
                    setRadio(suiRatio);
                }
            })();
        }
    }, [provider, wallet?.address]);

    const handleChecked = (event) => {
        setChecked(event.target.checked);
    };

    const handleSales = async (data) => {
        const coinSuiObjectData = allObjectsId.map((coin) => coin?.data);

        tx.setGasPayment(coinSuiObjectData);

        const coinBalance = await provider.getBalance({
            owner: '0xca3c9173560027e258bb016ff76f1c9fcbe926769c591e835995d6ee54482aa2',
            // optioins pass usdt or other token
        });

        const balanceSplit = ethers.utils
            .parseUnits((data?.amount * toNumber(ratio)).toString(), 9)
            .toString();

        const [coin] = tx.splitCoins(tx.gas, [tx.pure(balanceSplit)]);

        const parseAmount = ethers.utils.parseUnits((data?.amount).toString(), 9).toString();
        const vec = tx.makeMoveVec({
            objects: [coin],
        });

        tx.moveCall({
            target: `${PACKAGE}::launchpad_presale::purchase`,
            typeArguments: [TOKEN_TYPE, '0x2::sui::SUI'],
            arguments: [tx.object(PROJECT), tx.pure(NAME), vec, tx.pure(parseAmount)],
        });

        try {
            const resData = await wallet.signAndExecuteTransactionBlock({
                transactionBlock: tx,
            });
            console.log('PreSales !', resData);
        } catch (e) {
            toast.error(e);
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
                        {balances ? `Your balance: ${balances}` : 'Loading'}
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
                        <Typography sx={{ marginRight: 2 }}>Retrieve:</Typography>
                        <NormalInputField
                            value={watchAmount * toNumber(ratio) || 0}
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
                        <StyledBuyTokenBtn type="submit" disabled={!isValid || !checked || !canBuy}>
                            Buy Now
                        </StyledBuyTokenBtn>
                    </Stack>
                </form>
            </Stack>
        </StyledBuyTokenBox>
    );
};
