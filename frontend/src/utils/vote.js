import axios from "axios";

// batch voting: expects { userId, votes: [{ candidateId }, ...] }
export async function castVote({ userEmail, votes }) {
  try {
    const response = await axios.post(
      `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/vote/batch`,
      { userEmail, votes },
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
    console.error("Error voting:", error);
    throw error;
  }
}

export async function hasVotedInElection({ electionId, userEmail }) {
  try {
    const response = await axios.get(
      `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/vote/hasVotedInElection`,
      {
        params: { electionId, userEmail },
        headers: {
          "Content-type": "application/json",
          apikey: import.meta.env.VITE_API_KEY,
          token: localStorage.getItem("token"),
        },
      },
    );
    return response.data.voted;
  } catch (error) {
    console.error("Error checking vote status:", error);
    throw error;
  }
}
