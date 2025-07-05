import { useState } from "react";
import { deleteSpeaker } from "../services/SpeakerAPI";
import { useNavigate } from "react-router-dom";

const useDeleteSpeaker = (speakerId) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteSpeaker(speakerId);
      navigate("/admin/speakers");
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    handleDelete,
    isDeleting,
    deleteError,
  };
};

export default useDeleteSpeaker;
