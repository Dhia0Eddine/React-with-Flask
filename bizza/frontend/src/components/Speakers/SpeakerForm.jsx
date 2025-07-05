// src/components/Speakers/SpeakerForm.jsx
import React from 'react'

const SpeakerForm = ({
  formValues,
  formErrors,
  handleChange,
  handleSubmit,
  isLoading,
}) => (
  <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
    {['name', 'email', 'company', 'position', 'bio'].map((field) => (
      <div key={field}>
        <label className="block mb-1 capitalize">{field}</label>
        <input
          name={field}
          value={formValues[field]}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
          required
        />
        {formErrors[field] && (
          <p className="text-red-500 text-sm">{formErrors[field]}</p>
        )}
      </div>
    ))}
    <div>
      <label className="block mb-1">Avatar</label>
      <input
        type="file"
        name="speaker_avatar"
        accept="image/*"
        onChange={handleChange}
      />
    </div>
    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      {isLoading ? 'Saving...' : 'Save Speaker'}
    </button>
  </form>
);

export default SpeakerForm;
