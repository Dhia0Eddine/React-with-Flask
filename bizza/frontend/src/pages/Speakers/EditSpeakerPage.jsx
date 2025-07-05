import React from 'react';
import { useParams } from 'react-router-dom';
import useUpdateSpeakerForm from '../../hooks/useUpdateSpeakerForm';
import validate from '../../utils/validateSpeaker'; // same as your add form
import SpeakerForm from '../../components/Speakers/SpeakerForm';

const UpdateSpeakerPage = () => {
  const { speakerId } = useParams();
  const {
    formValues,
    formErrors,
    handleChange,
    handleSubmit,
    isLoading,
    status,
    feedback,
  } = useUpdateSpeakerForm(speakerId, validate);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Update Speaker</h2>
      <SpeakerForm
        formValues={formValues}
        formErrors={formErrors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        status={status}
        feedback={feedback}
      />
    </div>
  );
};

export default UpdateSpeakerPage;
