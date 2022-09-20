import axios from "axios";

const baseUrl = "/api/users";

export const getUsers = async () => {
  const users = await axios.get(baseUrl);
  return users.data;
};

export const getSingleUser = async (name) => {
  const user = await axios.get(`baseUrl/${name}`);
  return user.data;
};