import * as yup from 'yup';

export const schema = yup.object({
  username: yup
    .string()
    .required('This field is required.')
    .min(4, 'Email length must be at least 4 characters.')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address'),
  password: yup
    .string()
    .required('This field is required.')
    .min(8, 'Password length must be at least 8 characters.'),
});
