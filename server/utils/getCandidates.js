// server/utils/getCandidates.js
import axios from "axios";

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
