// src/pages/SpeakerRegistrationPage.jsx
import React from 'react';
import SpeakerForm from '../../components/Speakers/SpeakerForm';
import useSpeakerForm from '../../hooks/useSpeakerForm';
import validateSpeaker from '../../utils/validateSpeaker';

const CreateSpeakerPage = () => {
  const {
    formValues,
    formErrors,
    handleChange,
    handleSubmit,
    isLoading,
    status,
    feedback,
  } = useSpeakerForm(validateSpeaker);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register as a Speaker</h2>
      <SpeakerForm
        formValues={formValues}
        formErrors={formErrors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
      {status && (
        <p className={`mt-4 text-center font-medium ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default CreateSpeakerPage;
