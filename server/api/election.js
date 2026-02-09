// server/api/election.js
import axios from "axios";

export async function createElection(title, startTime, endTime) {
  try {
    const response = await axios.post(
      `http://${process.env.API_HOST}:${process.env.API_PORT}/api/v1/election`,
      { title, startTime, endTime },
      {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.API_KEY,
        },
      },
    );
    console.log(`${title} (ID: ${response.data.electionId}) started`);
    return response.data.electionId;
  } catch (error) {
    console.error("Error creating election:", error.response?.data || error.message);
    throw error;
  }
}

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

export async function getElectionHistory() {
  try {
    const response = await axios.get(`http://${process.env.API_HOST}:${process.env.API_PORT}/api/v1/election/history`, {
      headers: {
        "Content-type": "application/json",
        apikey: process.env.API_KEY,
      },
    });
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching election history:", error.message);
    return [];
  }
}

export async function getLastElection(offset) {
  try {
    const response = await axios.get(`http://${process.env.API_HOST}:${process.env.API_PORT}/api/v1/election/lastElection`, {
      headers: {
        "Content-type": "application/json",
        apikey: process.env.API_KEY,
      },
      params: { offset },
    });
    return response.data.result;
  } catch (error) {
    console.error("Error fetching last election:", error);
    return null;
  }
}

export async function endElection(electionId) {
  try {
    const response = await axios.patch(
      `http://${process.env.API_HOST}:${process.env.API_PORT}/api/v1/election`,
      { electionId },
      {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.API_KEY,
        },
      },
    );
    console.log(`Election ${electionId} has ended`);
    return response.data;
  } catch (error) {
    console.error("Error ending election:", error);
    throw error;
  }
}
