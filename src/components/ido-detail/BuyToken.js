import { styled } from '@mui/material/styles';
import { Box, Typography, Stack, Button } from '@mui/material';
import { InputField } from 'components/base/InputFieldV2';
import { CheckboxFiled } from 'components/base/CheckField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IdoSchema } from './validations';
import { useTheme } from '@mui/material/styles';

const StyledBuyTokenBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 229, 184, 0.2) 0%, rgba(109, 133, 218, 0.2) 100%)',
    padding: 40,
    color: 'white',
    borderRadius: 10,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    position: 'relative',
}));

const StyledBuyTokenBtn = styled(Button)(({ them }) => ({
    // background:
    //     'linear-gradient(178.73deg, rgba(32, 123, 191, 1) 2.08%, rgba(74, 148, 203, 1)  32.81%, rgba(92, 186, 242, 1) 100%)',
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
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
export const BuyToken = () => {
    const theme = useTheme();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = useForm({
        mode: 'onChange',
        defaultValues: '',
        resolver: yupResolver(IdoSchema),
    });
    return (
        <StyledBuyTokenBox>
            <Stack>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ marginRight: 2 }}>Amount:</Typography>
                    <InputField
                        id="amount"
                        name="amount"
                        control={control}
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
                <Stack direction="row" justifyContent="space-between">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckboxFiled />
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
                    <StyledBuyTokenBtn>Buy Now</StyledBuyTokenBtn>
                </Stack>
            </Stack>
        </StyledBuyTokenBox>
    );
};
