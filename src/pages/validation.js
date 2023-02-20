import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
    username: yup.string().required('Username is required.').min(6).max(12),
    date_of_birth: yup.date().required('Date of Birth is required.'),
    email: yup.string().required('Email is required.').email('Must be an email'),
    otp: yup.string().required('OTP is required'),
});
