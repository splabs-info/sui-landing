import * as yup from 'yup';

export const IdoSchema = yup.object().shape({
    amount: yup.number().required('Amount is required').typeError('Must be number'),
});
