import { configureStore } from "@reduxjs/toolkit";
import blogReducer, { addBlog } from "./reducers/blogslice";
import notificationReducer from "./reducers/notificationSlice";
import blogService from "./services/blogs";
import userReducer from "./reducers/userSlice";


const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer
  }
});

window.localStorage.getItem("user") && blogService.getAll({ headers: { Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("user")).token}` } }).then(blogs => {

  return blogs.forEach(blog => {
    store.dispatch(addBlog(blog));
  });
});

export default store;