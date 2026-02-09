// server/api/candidate.js
import axios from "axios";

export async function createBulkCandidate(electionId, position, candidateList) {
  try {
    const response = await axios.post(
      `http://${process.env.API_HOST}:${process.env.API_PORT}/api/v1/candidate/bulk`,
      {
        electionId,
        position,
        candidates: candidateList,
      },
      {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.API_KEY,
        },
      },
    );
    console.log(`Created ${candidateList.length} ${position} candidates for election ${electionId}`);
    return response.data.created;
  } catch (error) {
    console.error(`Error creating ${position} candidates for election ${electionId}:`, error.response?.data || error.message);
    throw error;
  }
}

export async function getCurrentCandidates() {
  try {
    const response = await axios.get(`http://${process.env.API_HOST}:${process.env.API_PORT}/api/v1/candidate/current`, {
      headers: {
        "Content-type": "application/json",
        apikey: process.env.API_KEY,
      },
    });

    return response.data.results || response.data.candidates || response.data || [];
  } catch (error) {
    console.error("Error fetching current candidates:", error.message);
    return [];
  }
}

export async function getCandidatesByElection(electionId) {
  try {
    const response = await axios.get(
      `http://${process.env.API_HOST}:${process.env.API_PORT}/api/v1/candidate/election/${electionId}`,
      {
        headers: {
          "Content-type": "application/json",
          apikey: process.env.API_KEY,
        },
      },
    );
    return response.data.results || [];
  } catch (error) {
    console.error(`Error fetching candidates for election ${electionId}:`, error.message);
    return [];
  }
}

export async function markCandidatesNotCurrent(electionId) {
  try {
    const response = await axios.patch(
      `http://${process.env.API_HOST}:${process.env.API_PORT}/api/v1/candidate/election/${electionId}/mark-not-current`,
      {},
      {
        headers: {
          "Content-type": "application/json",
          apikey: process.env.API_KEY,
        },
      },
    );

    console.log(`Marked ${response.data.affectedRows} candidates as not current for election ${electionId}`);
    return response.data;
  } catch (error) {
    console.error(`Error marking candidates as not current for election ${electionId}:`, error.message);
    throw error;
  }
}
