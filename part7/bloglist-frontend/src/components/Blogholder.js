import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { setNotification } from "../reducers/notificationSlice";

const Blogholder = ({ blogs, user }) => {

  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const handleBlogSubmit = (blogObj) => {
    blogFormRef.current.toggleVisibility();
    blogService.createBlog(blogObj, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    dispatch(setNotification(`Created new blog ${blogObj.title}`, 5));
  };

  return (
    <div>
      {user && <Togglable buttonLabel="Create new Blog" ref={blogFormRef}>
        <BlogForm handleBlogSubmit={handleBlogSubmit}/>
      </Togglable>}
      <div className="blog-holder w-100 flex flex-wrap gap-4">
        {blogs
          .map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))
          .sort((a, b) => a.props.blog.likes - b.props.blog.likes)
          .reverse()}
      </div>
    </div>
  );
};

export default Blogholder;