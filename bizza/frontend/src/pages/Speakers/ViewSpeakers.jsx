// src/pages/Admin/Speakers/ViewSpeakers.js
import React, { useEffect, useState } from "react";
import { getSpeakers,getSpeakersPaginated } from "../../services/SpeakerAPI";
import { Link } from "react-router-dom"; // 👈 import Link

const ViewSpeakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSpeakers = async () => {
    try {
      const data = await getSpeakersPaginated(currentPage);
      setSpeakers(data.speakers);
      setTotalPages(data.total_pages);
      
    } catch (err) {
      setError(err.message);
      
  }finally{
    setIsLoading(false);
  }
  };

  useEffect(() => {
    fetchSpeakers();
  }, [currentPage]);

  if (isLoading) return <p>Loading speakers...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevious = () => {
     if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Speakers List</h2>
      {speakers.length === 0 ? (
        <p>No speakers found.</p>
      ) : (
        <ul className="space-y-4">
          {speakers.map((speaker) => (
            <li key={speaker.id} className="border p-4 rounded shadow-sm">
              <div className="flex items-center gap-4">
                {speaker.speaker_avatar && (
                  <img
                    src={`http://localhost:5000/uploads/${speaker.speaker_avatar}`}
                    alt="Avatar"
                    width={100}
                    className="rounded"
                  />
                )}
                <div>
                  <strong className="text-lg">{speaker.name}</strong> – {speaker.company}
                  <br />
                  {speaker.email} | {speaker.position}
                  <p>{speaker.bio}</p>
                  <Link
                    to={`/admin/speakers/update/${speaker.id}`} // 👈 dynamic edit link
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    Edit Speaker
                  </Link>

                  <Link
                    to={`/admin/speakers/delete/${speaker.id}`} // 👈 dynamic edit link
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    delete Speaker
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
      <span> Page {currentPage} of {totalPages} </span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
    
    </div>
  );
};

export default ViewSpeakers;
