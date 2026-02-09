// frontend/src/utis/account.js

import axios from "axios";

export async function register(email, fullname, password, verifyPassword) {
  try {
    const response = await axios.post(
      `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/account`,
      {
        email,
        fullname,
        password,
        verifyPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function login(identifier, password) {
  try {
    const response = await axios.post(
      `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/account/login`,
      {
        identifier,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getProfile() {
  try {
    const response = await axios.get(`http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/account`, {
      headers: {
        "Content-type": "application/json",
        apikey: import.meta.env.VITE_API_KEY,
        token: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
