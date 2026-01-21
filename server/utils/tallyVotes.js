// server/utils/tallyVotes.js
import axios from "axios";

// Tallies votes per election using the backend API (to be called by master socket, or slave for refresh)
export async function fetchTally(electionId) {
  try {
    const response = await axios.get(`http://${process.env.API_HOST}:${process.env.API_PORT}/api/v1/vote?electionId=${electionId}`, {
      headers: {
        apikey: process.env.API_KEY,
        "Content-type": "application/json",
      },
    });
    return response.data.tally;
  } catch (error) {
    console.error("Error fetching voting tally:", error);
    return [];
  }
}
