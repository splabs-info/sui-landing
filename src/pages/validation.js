import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
    // username: yup.string().required('Username is required.').min(6).max(12),
    date_of_birth: yup
        .date()
        .max(new Date(Date.now() - 409968000000), 'Phải lớn hơn 13 tuổi')
        .transform((curr, orig) => (orig === '' ? null : curr))
        .nullable()
        .typeError('The value must be a date (DD/MM/YYYY)')
        .required('Date of birth is required.'),
    email_address: yup.string().required('Email is required.').email('Must be an email'),
    // otp: yup.string().required('OTP is required'),
});

export const UpdateProfileSchema = yup.object().shape({
    email_address: yup.string().required('Email is required.').email('Must be an email'),
    // date_of_birth: yup
    //     .date()
    //     .max(new Date(Date.now() - 409968000000), 'Must be greater than 13 years old')
    //     .transform((curr, orig) => (orig === '' ? null : curr))
    //     .nullable()
    //     .typeError('The value must be a date (DD/MM/YYYY)')
    //     .required('Date of birth is required.'),
});
