import * as yup from 'yup';

export const IdoSchema = yup.object().shape({
    amount: yup
        .number()
        .min(1.5, 'Min purchase must be 1.5 T-XUI')
        .max(100, 'Per user can buy 100 maximum of T-XUI on this round.')
        .required('Amount is required')
        .typeError('Must be number'),
});


export const PublicRoundSchema = yup.object().shape({
    amount: yup
        .number()
        .min(10, 'Min purchase must be 10 T-XUI')
        .required('Amount is required')
        .typeError('Must be number'),
});
