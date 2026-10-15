import axios from "axios";

export const addUser = async (name, email, password) => {
  return axios.post("http://localhost:4000/api/auth/register", {
    name,
    email,
    password,
  });
};

export const checkUser = async (email, password) => {
  return axios.post(
    "http://localhost:4000/api/auth/login",
    {
      email,
      password,
    },
    {
      withCredentials: true,
    },
  );
};

export const sendMsg = async (message, accessTokens) => {
  return axios.post(
    "http://localhost:4000/chat",
    {
      message,
    },
    {
      headers: {
        Authorization: `Bearer ${accessTokens}`,
      },
    },
  );
};
