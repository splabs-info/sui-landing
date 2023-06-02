import * as yup from 'yup';

export const IdoSchema = yup.object().shape({
    amount: yup
        .number()
        .min(20, 'Min purchase must be 20 T-XUI')
        .max(100000, 'Per user can buy 100,000 maximum of T-XUI on this round.')
        .required('Amount is required')
        .typeError('Must be number'),
});
