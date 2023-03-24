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
    boxShadow: 'rgba(0, 0, 0, 0.25)',
    position: 'relative',
}));

const StyledBuyTokenBtn = styled(Button)(({ them }) => ({
    background:
        'linear-gradient(178.73deg, rgba(32, 123, 191, 1) 2.08%, rgba(74, 148, 203, 1)  32.81%, rgba(92, 186, 242, 1) 100%)',
    color: 'white',
    height: 48,
    width: 156,
    fontSize: 18,
    borderRadius: 48,
    alignItems: 'center'
}));
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
                        <Typography>I’ve read and accepted all the YouSUI's Agreement</Typography>
                    </Box>
                    <StyledBuyTokenBtn>BUY NOW</StyledBuyTokenBtn>
                </Stack>
            </Stack>
        </StyledBuyTokenBox>
    );
};
