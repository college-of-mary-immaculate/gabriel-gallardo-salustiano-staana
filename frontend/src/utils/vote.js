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

export async function getTally(electionId) {
  try {
    const response = await axios.get(`http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/vote?electionId=${electionId}`, {
      headers: {
        "Content-type": "application/json",
        apikey: import.meta.env.VITE_API_KEY,
        token: localStorage.getItem("token"),
      },
    });
    return response.data.tally;
  } catch (error) {
    console.error("Error fetching tally:", error);
    throw error;
  }
}

export async function getCandidateTally(electionId, candidateId) {
  try {
    const response = await axios.get(
      `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/vote/candidate?electionId=${electionId}&candidateId=${candidateId}`,
      {
        headers: {
          "Content-type": "application/json",
          apikey: import.meta.env.VITE_API_KEY,
          token: localStorage.getItem("token"),
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching candidate tally:", error);
    throw error;
  }
}

export async function hasVoted(electionId, positionId, userId) {
  try {
    const response = await axios.get(
      `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/vote/hasVoted?electionId=${electionId}&positionId=${positionId}&userId=${userId}`,
      {
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

// checks if user has voted in the entire election
export async function hasVotedAll(electionId, userId) {
  try {
    const response = await axios.get(
      `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/vote/hasVotedAll?electionId=${electionId}&userId=${userId}`,
      {
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