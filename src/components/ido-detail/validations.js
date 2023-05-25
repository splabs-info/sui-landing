import * as yup from 'yup';

export const IdoSchema = yup.object().shape({
    amount: yup
        .number()
        .min(2, 'Min purchase must be 2 SUA')
        .max(1000, 'Per user can buy a maximum of 1000 SUA on this round.')
        .required('Amount is required')
        .typeError('Must be number'),
});
