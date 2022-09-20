import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "./reducers/userSlice";
import Blogholder from "./components/Blogholder";
import  Login  from "./components/Login";
import Header from "./components/Header";
import Notification from "./components/Notification";
import { Route, Routes } from "react-router-dom";
import User from "./components/User";
import UserPage from "./components/UserPage";
import BlogPage from "./components/BlogPage";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const message = useSelector(state => state.notification);
  const user = useSelector(state => state.user[0]);
  const dispatch = useDispatch();


  useEffect(() => {
    if (window.localStorage.getItem("user") && user) {
      blogService
        .getAll({ headers: { Authorization: `Bearer ${user.token}` } })
        .then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  useEffect(() => {
    const jsonUser = window.localStorage.getItem("user");
    if (jsonUser) {
      const user = JSON.parse(jsonUser);
      dispatch(logIn(user));
    }
  }, []);

  return (
    <div className="p-12">
      <h2 className="text-3xl mb-16 mx-auto w-fit font-mono">Blogs</h2>
      {message.message && (
        <Notification message={message}/>
      )}
      {user && (
        <Header user={user}/>
      )}
      {!window.localStorage.getItem("user") && (
        <Login/>
      )}
      <Routes>
        <Route path="/blogs/:id" element={<BlogPage blogs={blogs} user={user}/>}/>
        <Route path="/users/:name" element={<UserPage/>}/>
        <Route path="/users" element={<User/>}/>
        <Route path="/" element={<Blogholder blogs={blogs} user={user}/>}/>
      </Routes>
    </div>
  );
};

export default App;
