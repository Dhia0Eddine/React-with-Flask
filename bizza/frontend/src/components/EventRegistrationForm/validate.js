// src/components/EventRegistration/validate.js
const validate = (values) => {
  const errors = {};
  if (!values.first_name) errors.first_name = 'First name is required';
  if (!values.last_name) errors.last_name = 'Last name is required';
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email format is invalid';
  }
  if (!values.phone) errors.phone = 'Phone number is required';
  if (!values.subject) errors.subject = 'Subject is required';

  return errors;
};

export default validate;
