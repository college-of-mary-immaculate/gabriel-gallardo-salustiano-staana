// server/utils/candidates.js
import axios from "axios";

export async function createBulkCandidate(positionId, candidateList) {
  try {
    const response = await axios.post(
      `http://${process.env.API_HOST}:${process.env.API_PORT}/api/v1/candidate/bulk`,
      {
        positionId,
        candidates: candidateList,
      },
      {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.API_KEY,
        },
      },
    );
    console.log(`Created ${candidateList.length} candidates for position ${positionId}`);
    return response.data.created;
  } catch (error) {
    console.error(`Error creating candidates for position ${positionId}:`, error.response?.data || error.message);
    throw error;
  }
}

export async function createCandidate(positionId, candidateData) {
  try {
    const response = await axios.post(
      `http://${process.env.API_HOST}:${process.env.API_PORT}/api/v1/candidate`,
      {
        positionId,
        fullname: candidateData.fullname,
        description: candidateData.description,
        imageUrl: candidateData.imageUrl || "",
      },
      {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.API_KEY,
        },
      },
    );
    console.log(`Created candidate: ${candidateData.fullname}`);
    return response.data.candidateId;
  } catch (error) {
    console.error(`Error creating candidate ${candidateData.fullname}:`, error.response?.data || error.message);
    throw error;
  }
}

export async function getCandidates(positionId) {
  try {
    const response = await axios.get(`http://${process.env.API_HOST}:${process.env.API_PORT}/api/v1/candidate?positionId=${positionId}`, {
      headers: {
        "Content-type": "application/json",
        apikey: process.env.API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return [];
  }
}
