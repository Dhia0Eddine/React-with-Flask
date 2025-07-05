import { useState } from 'react';
import { addSpeaker } from '../services/SpeakerAPI'; // ✅ Use your API file

const useSpeakerForm = (validate) => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    bio: '',
    speaker_avatar: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormValues({
      ...formValues,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);

    const formData = new FormData();
    Object.entries(formValues).forEach(([key, val]) => {
      formData.append(key, val);
    });

    try {
      await addSpeaker(formData); // ✅ USE the API wrapper here
      setStatus('success');
      setFeedback('Speaker added successfully!');
      setFormValues({
        name: '',
        email: '',
        company: '',
        position: '',
        bio: '',
        speaker_avatar: null,
      });
    } catch (err) {
      setStatus('error');
      setFeedback(
        err?.response?.data?.error || 'Something went wrong'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formValues,
    formErrors,
    handleChange,
    handleSubmit,
    isLoading,
    status,
    feedback,
  };
};

export default useSpeakerForm;
