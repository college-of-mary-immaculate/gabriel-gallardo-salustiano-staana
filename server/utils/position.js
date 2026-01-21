// server/utils/position.js
import axios from "axios";

export async function createBulkPosition(electionId, positions) {
  try {
    const response = await axios.post(
      `http://${process.env.API_HOST}:${process.env.API_PORT}/api/v1/position/bulk`,
      {
        electionId,
        positions,
      },
      {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.API_KEY,
        },
      },
    );
    console.log(`Created ${positions.length} positions for election ${electionId}`);
    return response.data.positions;
  } catch (error) {
    console.error(`Error creating positions for election ${electionId}:`, error.response?.data || error.message);
    throw error;
  }
}

export async function createPosition(electionId, positionName) {
  try {
    const response = await axios.post(
      `http://${process.env.API_HOST}:${process.env.API_PORT}/api/v1/position`,
      { electionId, name: positionName },
      {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.API_KEY,
        },
      },
    );
    console.log(`Created position: ${positionName} (ID: ${response.data.positionId})`);
    return response.data.positionId;
  } catch (error) {
    console.error(`Error creating position ${positionName}:`, error.response?.data || error.message);
    throw error;
  }
}
