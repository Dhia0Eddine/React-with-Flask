import { useEffect, useState } from 'react';
import { getSpeaker, updateSpeaker } from '../services/SpeakerAPI';

const useUpdateSpeakerForm = (speakerId, validate) => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    bio: '',
    speaker_avatar: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const fetchSpeaker = async () => {
      try {
        const data = await getSpeaker(speakerId);
        setFormValues({
          name: data.name || '',
          email: data.email || '',
          company: data.company || '',
          position: data.position || '',
          bio: data.bio || '',
          speaker_avatar: null,
        });
      } catch (error) {
        setFeedback('Failed to load speaker data.');
        setStatus('error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpeaker();
  }, [speakerId]);

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
      await updateSpeaker(speakerId, formData);
      setStatus('success');
      setFeedback('Speaker updated successfully!');
    } catch (err) {
      setStatus('error');
      setFeedback(err?.response?.data?.error || 'Update failed.');
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

export default useUpdateSpeakerForm;
