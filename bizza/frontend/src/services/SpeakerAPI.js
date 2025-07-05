// src/services/SpeakersAPI.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

const handleErrors = (error) => {
  if (error.response) {
    console.error("API Error:", error.response.status, error.response.data);
  } else if (error.request) {
    console.error("API Error: No response received", error.request);
  } else {
    console.error("API Error:", error.message);
  }
  throw error;
};

const setHeaders = () => {
  axios.defaults.headers.common["Content-Type"] = "application/json";
};

export const getSpeakers = async () => {
  try {
    setHeaders();
    const response = await axios.get(`${API_URL}/speakers`);
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};
export const addSpeaker=(speakerData)=>{
    const url = `${API_URL}/speakers`; 
    return axios
    .post(url, speakerData,  {headers: {
        'Content-Type': 'multipart/form-data',
      }},)
    .then(res => res.data)
    .catch(handleErrors)
};

export const updateSpeaker = (speakerId, speakerData) => {
  const url = `${API_URL}/speakers/${speakerId}`;
  return axios
     .put(url, speakerData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data)
    .catch(handleErrors);
};

export const getSpeaker = (speakerId) => {
  return axios
        .get(`${API_URL}/speakers/${speakerId}`)
        .then((res)=> res.data)
        .catch((err) => {
          throw new Error(err?.response?.data?.error || 'Failed to fetch speaker')
        });
};

export const deleteSpeaker = async (speakerId) =>{
  const url = `${API_URL}/speakers/${speakerId}`

 try  {
    const response = await axios.delete(url)
      return response.data;
    }
  catch(error){
      if (error.response) {

            throw new Error(error.response.data.message || "Failed to delete speaker.");
          } else {
            throw new Error("Server error while deleting speaker.");
          }

    }
}

export const getSpeakersPaginated = async (page = 1, perPage = 10) => {
  try {
    const res = await axios.get(`/api/v1/speakers?page=${page}&per_page=${perPage}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch paginated speakers");
  }
};
