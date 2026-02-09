// server/api/vote.js
import axios from "axios";

export async function getVoteCounts(electionId) {
  try {
    const response = await axios.get(
      `http://${process.env.API_HOST}:${process.env.API_PORT}/api/v1/vote?electionId=${electionId}`,
      {
        headers: {
          apikey: process.env.API_KEY,
          "Content-type": "application/json",
        },
      },
    );
    return response.data.voteCounts || [];
  } catch (error) {
    console.error("Error getting vote counts:", error);
    return [];
  }
}

export async function hasVotedInElection(electionId, userEmail) {
  try {
    const response = await axios.get(`http://${process.env.API_HOST}:${process.env.API_PORT}/api/v1/vote/hasVotedInElection`, {
      params: { electionId, userEmail },
      headers: {
        apikey: process.env.API_KEY,
        "Content-type": "application/json",
      },
    });
    return response.data.voted;
  } catch (error) {
    console.error("Error checking vote status:", error.message);
    return false;
  }
}
