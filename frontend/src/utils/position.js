import axios from "axios";

export async function getPositions(electionId) {
  try {
    const response = await axios.get(`http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/position?electionId=${electionId}`, {
      headers: {
        "Content-type": "application/json",
        apikey: import.meta.env.VITE_API_KEY,
        token: localStorage.getItem("token"),
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching positions:", error);
    throw error;
  }
}

export async function getPosition(positionId) {
  try {
    const response = await axios.get(`http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/position/${positionId}`, {
      headers: {
        "Content-type": "application/json",
        apikey: import.meta.env.VITE_API_KEY,
        token: localStorage.getItem("token"),
      },
    });
    return response.data.result;
  } catch (error) {
    console.error("Error fetching position:", error);
    throw error;
  }
}

export async function createPosition(electionId, fullname) {
  try {
    const response = await axios.post(
      `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/position`,
      { electionId, fullname },
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
    console.error("Error creating position:", error);
    throw error;
  }
}

export async function updatePosition(positionId, fullname) {
  try {
    const response = await axios.patch(
      `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/position`,
      { positionId, fullname },
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
    console.error("Error updating position:", error);
    throw error;
  }
}

export async function deletePosition(positionId) {
  try {
    const response = await axios.delete(`http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/position`, {
      data: { positionId },
      headers: {
        apikey: import.meta.env.VITE_API_KEY,
        token: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting position:", error);
    throw error;
  }
}
