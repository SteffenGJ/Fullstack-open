import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user }) => {
  const [status, setStatus] = useState(false);
  const [newStatus, setNewStatus] = useState(blog.likes);

  const handleLike = () => {
    blogService.addLike(blog, { headers: { Authorization: `Bearer ${user.token}` } });
    setNewStatus(prev => prev += 1);
  };

  return (
    <div style={{ border: "solid 4px #000", marginTop: 5 }} className="first-impression">
      {status ?
        <div>
          <p>{blog.title} --- {blog.author}</p>
          <p>{blog.url}</p>
          <p>likes: {newStatus}</p><button className="like-button" onClick={handleLike}>like</button>
          <p>{blog.user.username}</p>{blog.user.username === user.username &&
      <button
        className="delete-button"
        onClick={() => blogService.deleteBlog(blog, { headers: { Authorization: `Bearer ${user.token}` } })}
      >Delete</button>}
        </div>
        :
        <p>{blog.title} --- {blog.author}</p>
      }
      <button onClick={() => setStatus(prev => prev = !prev)}>{status ? "hide" : "show"}</button>
    </div>
  );};

export default Blog;