import React from "react";
import { useParams } from "react-router-dom";
import useDeleteSpeaker from "../../hooks/useDeleteSpeaker";

const DeleteSpeakerPage = () => {
  const { speakerId } = useParams();
  const { handleDelete, isDeleting, deleteError } = useDeleteSpeaker(speakerId);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Delete Speaker</h2>
      {deleteError && <p className="text-red-500">{deleteError}</p>}
      <p className="mb-4">Are you sure you want to delete this speaker?</p>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        {isDeleting ? "Deleting..." : "Yes, Delete"}
      </button>
    </div>
  );
};

export default DeleteSpeakerPage;
