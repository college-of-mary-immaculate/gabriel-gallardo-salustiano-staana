import axios from "axios";

export async function getActiveElection() {
  try {
    const response = await axios.get(`http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/election`, {
      headers: {
        "Content-type": "application/json",
        apikey: import.meta.env.VITE_API_KEY,
        token: localStorage.getItem("token"),
      },
    });
    return response.data.election;
  } catch (error) {
    console.error("Error fetching active election:", error);
    throw error;
  }
}

export async function getElectionHistory() {
  try {
    const response = await axios.get(`http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/election/history`, {
      headers: {
        "Content-type": "application/json",
        apikey: import.meta.env.VITE_API_KEY,
        token: localStorage.getItem("token"),
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching election history:", error);
    throw error;
  }
}
