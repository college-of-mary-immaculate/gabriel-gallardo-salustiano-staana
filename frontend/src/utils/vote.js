import axios from "axios";

// batch voting: expects { electionId, userId, votes: [{ positionId, candidateId }, ...] }
export async function castVote({ electionId, userId, votes }) {
  try {
    const response = await axios.post(
      `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/vote`,
      { electionId, userId, votes },
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