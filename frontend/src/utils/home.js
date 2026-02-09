import axios from "axios";

export async function ping() {
  try {
    const response = await axios.get(`http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error ping:", error);
    throw error;
  }
}
