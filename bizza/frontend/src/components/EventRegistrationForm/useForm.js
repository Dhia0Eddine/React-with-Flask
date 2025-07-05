import { useState } from 'react';
import axios from 'axios';

const useForm = (validate) => {
  const [formValues, setFormValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    job_title: '',
    company_name: '',
    company_size: '',
    subject: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [status, setStatus] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const res = await axios.post('/api/v1/events-registration', formValues);
        setStatus('success');
        setFeedback('Registration successful!');
        setFormValues({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          job_title: '',
          company_name: '',
          company_size: '',
          subject: '',
        });
      } catch (error) {
            setStatus('error');
            if (error.response?.status === 409) {
              setFeedback(error.response.data.message || 'Duplicate entry.');
            } else {
              setFeedback(
                (error.response?.status ? error.response.status + ' - ' : '') +
                'Something went wrong. Please try again.'
              );
            }
        }

    } else {
      setStatus('');
      setFeedback('');
    }
  };

  return {
    formValues,
    formErrors,
    handleChange,
    handleSubmit,
    status,
    feedback,
  };
};

export default useForm;
