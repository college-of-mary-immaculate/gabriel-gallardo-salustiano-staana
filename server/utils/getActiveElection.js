// server/utils/getActiveElection.js
import axios from "axios";

export async function getActiveElection() {
  try {
    const response = await axios.get(`http://${process.env.API_HOST}:${process.env.API_PORT}/api/v1/election`, {
      headers: {
        "Content-type": "application/json",
        apikey: process.env.API_KEY,
      },
    });
    return response.data.election;
  } catch (error) {
    console.error("Error fetching active election:", error);
    return null;
  }
}
