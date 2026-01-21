import axios from "axios";

export async function getCandidates(positionId) {
  try {
    const response = await axios.get(`http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/candidate?positionId=${positionId}`, {
      headers: {
        "Content-type": "application/json",
        apikey: import.meta.env.VITE_API_KEY,
        token: localStorage.getItem("token"),
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    throw error;
  }
}

export async function getCandidate(candidateId) {
  try {
    const response = await axios.get(`http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/candidate/${candidateId}`, {
      headers: {
        "Content-type": "application/json",
        apikey: import.meta.env.VITE_API_KEY,
        token: localStorage.getItem("token"),
      },
    });
    return response.data.result;
  } catch (error) {
    console.error("Error fetching candidate:", error);
    throw error;
  }
}

export async function createCandidate(positionId, fullname, description = "", imageUrl = "") {
  try {
    const response = await axios.post(
      `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/candidate`,
      { positionId, fullname, description, imageUrl },
      {
        headers: {
          "Content-type": "application/json",
          apikey: import.meta.env.VITE_API_KEY,
          token: localStorage.getItem("token"),
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error creating candidate:", error);
    throw error;
  }
}

export async function updateCandidate(candidateId, fullname, description, imageUrl) {
  try {
    const response = await axios.patch(
      `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/candidate`,
      { candidateId, fullname, description, imageUrl },
      {
        headers: {
          "Content-type": "application/json",
          apikey: import.meta.env.VITE_API_KEY,
          token: localStorage.getItem("token"),
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating candidate:", error);
    throw error;
  }
}

export async function deleteCandidate(candidateId) {
  try {
    const response = await axios.delete(`http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/candidate`, {
      data: { candidateId },
      headers: {
        "Content-type": "application/json",
        apikey: import.meta.env.VITE_API_KEY,
        token: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting candidate:", error);
    throw error;
  }
}
