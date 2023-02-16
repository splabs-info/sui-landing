import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
    email: yup.string().required('Email is required.').email('Must be an email'),
    password: yup.string().required('Password is required.').min(8, 'Type at least 8 characters.'),
});
