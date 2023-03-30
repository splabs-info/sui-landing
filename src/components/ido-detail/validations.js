import * as yup from 'yup';

export const IdoSchema = yup.object().shape({
    amount: yup.number('Amount must be a number'),
});
