import * as yup from "yup";

export const FormValidation=yup.object({
    name: yup.string().min(2).max(23).required('name is Required'),
    email:yup.string().email().required('email is Required'),
    password:yup.string().min(2).max(8).required('password is Required'),
    confirmPassword:yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is Required'),
    address:yup.string().required( 'Address must be provided'),
    image:yup.mixed().required( 'Image must be provided' ),
})

