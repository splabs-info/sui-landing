import * as yup from 'yup';

export const IdoSchema = yup.object().shape({
    amount: yup
        .number()
        .min(20, 'Min purchase must be 1 SUA')
        .max(100000, 'Per user can buy a maximum of 1 SUA on this round.')
        .required('Amount is required')
        .typeError('Must be number'),
});
