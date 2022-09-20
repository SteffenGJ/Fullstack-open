import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async (auth) => {
  const request = await axios.get(baseUrl, auth);
  return request.data;
};

const createBlog = async (payload, auth) => {
  const request = await axios.post(baseUrl, payload, auth);
  return request.data;
};

const addLike = async (blog, auth) => {
  const { id } = blog;

  const newBlog = {
    ...blog,
    likes: blog && blog.likes + 1,
  };

  const request = await axios.put(`${baseUrl}/${id}`, newBlog, auth);
  return request.data;
};

const addComment = async (blog, auth, comment) => {
  const { id } = blog;

  const newBlog = {
    ...blog,
    comments: blog && [...blog.comments, comment]
  };

  const request = await axios.put(`${baseUrl}/${id}`, newBlog, auth);
  return request.data;
};

const deleteBlog = async (blog, auth) => {
  window.confirm(`Delete blog "${blog.title}"?`);
  return await axios.delete(`${baseUrl}/${blog.id}`, auth);
};

const exportObject = {
  getAll,
  createBlog,
  addLike,
  deleteBlog,
  addComment
};

export default exportObject;
