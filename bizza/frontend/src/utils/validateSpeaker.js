// src/utils/validateSpeaker.js
const validateSpeaker = (values) => {
  const errors = {};
  if (!values.name) errors.name = 'Name is required';
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Invalid email format';
  }
  if (!values.company) errors.company = 'Company is required';
  if (!values.position) errors.position = 'Position is required';
  if (!values.bio) errors.bio = 'Bio is required';
  return errors;
};

export default validateSpeaker;
