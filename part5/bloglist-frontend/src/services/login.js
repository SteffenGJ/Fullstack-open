import axios from "axios";
const baseUrl = "/api/login";

// eslint-disable-next-line no-unused-vars
let token = null;

export const login = async info => {
  const response = await axios.post(baseUrl, info);
  return response.data;
};

export const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

