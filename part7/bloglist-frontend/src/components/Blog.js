import { Link } from "react-router-dom";

const Blog = ({ blog, /*user*/ }) => {

  return (
    <div className="first-impression border border-black border-4 my-5 p-2 rounded-lg bg-slate-50 basis-[24.1%]">
      <p className="font-semibold text-lg text-blue-800">
        <Link to={`/blogs/${blog.id}`}>{blog.title} --- {blog.author}</Link>
      </p>
    </div>
  );
};

export default Blog;
