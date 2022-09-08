import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import { login, setToken } from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");

  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    if (window.localStorage.getItem("user") && user.token) {
      blogService.getAll({ headers: { Authorization: `Bearer ${user.token}` } }).then(blogs =>
        setBlogs( blogs )
      );
    }
  }, [user.token]);

  useEffect(() => {
    const jsonUser = window.localStorage.getItem("user");
    if (jsonUser) {
      const user = JSON.parse(jsonUser);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      setMessage(`Logged in as ${username}`);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      setUsername("");
      setPassword("");
      setToken(user.token);
    } catch(e) {
      setMessage("Wrong username or password");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const handleClick = () => {
    window.localStorage.clear();
    setUser({});
  };

  const handleBlogSubmit = (blogObj) => {
    blogFormRef.current.toggleVisibility();
    blogService.createBlog(blogObj, { headers: { Authorization: `Bearer ${user.token}` } });
    setMessage(`Created new blog "${blogObj.title}"!`);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const compareFunction = (a, b) => {
    return a.props.blog.likes - b.props.blog.likes;
  };

  return (
    <div>
      <h2>Blogs</h2>
      {message && <p>{message}</p>}
      {window.localStorage.getItem("user") && <div>
        <p>Hello {user.name}!</p>
        <button onClick={handleClick}>Log out</button>
        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
          <BlogForm
            handleBlogSubmit={handleBlogSubmit}
          />
        </Togglable>
      </div>}
      {!window.localStorage.getItem("user") &&
      <form onSubmit={handleSubmit}>
        <p>Username</p>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          id="username"
        />
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          id="password"
        /><br/>
        <button type="submit" id="submit-button">Log in</button>
      </form>}
      <div className="blog-holder">
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user}/>
        ).sort(compareFunction).reverse()}
      </div>
    </div>
  );
};

export default App;
