// src/components/EventRegistration/EventRegistration.jsx
import React, { useState } from 'react';
import useForm from './useForm';
import validate from './validate';

const EventRegistration = () => {
  const {
    formValues,
    formErrors,
    handleChange,
    handleSubmit,
    status,
    feedback,
  } = useForm(validate);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Event Registration</h2>
      <form onSubmit={handleSubmit} noValidate>
        {[
          { name: 'first_name', label: 'First Name' },
          { name: 'last_name', label: 'Last Name' },
          { name: 'email', label: 'Email' },
          { name: 'phone', label: 'Phone' },
          { name: 'job_title', label: 'Job Title' },
          { name: 'company_name', label: 'Company Name' },
          { name: 'company_size', label: 'Company Size' },
          { name: 'subject', label: 'Subject' },
        ].map(({ name, label }) => (
          <div key={name} className="mb-4">
            <label htmlFor={name} className="block font-medium mb-1">{label}</label>
            <input
              type="text"
              id={name}
              name={name}
              value={formValues[name]}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {formErrors[name] && (
              <p className="text-red-500 text-sm">{formErrors[name]}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Join Now
        </button>
      </form>

      {status && (
        <p className={`mt-4 text-sm font-medium ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default EventRegistration;
