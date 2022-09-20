import { useParams } from "react-router-dom";
import blogService from "../services/blogs";
import { useSelector } from "react-redux";

const BlogPage = ({ user }) => {

  const blogs = useSelector(state => state.blogs);

  const id = useParams().id;
  const blog = blogs.find(blog => blog.id === id);

  console.log("blog", blog);

  const handleLike = () => {
    blogService.addLike(blog, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
  };

  const handleComment = (e) => {
    blogService.addComment(blog, {
      headers: { Authorization: `Bearer ${user.token}` },
    }, e.target.comment.value);
  };

  return (
    <div className="first-impression border border-black border-4 my-5 p-2 rounded-lg bg-slate-50 basis-[24.1%]">

      <div>
        <p className="font-semibold text-lg">
          {blog && blog.title} --- {blog && blog.author}
        </p>
        <p>{blog && blog.url}</p>
        <p>likes: {blog && blog.likes}</p>
        <button className="like-button border border-black bg-green-400" onClick={handleLike}>
                        like
        </button>
        <p>{blog && blog.user.username}</p>
        {blog && blog.user.username === user.username && (
          <button
            className="delete-button px-3 py-1 text-sm text-white bg-red-500 rounded-xl mb-2"
            onClick={() =>
              blogService.deleteBlog(blog, {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              })
            }
          >
                            Delete
          </button>
        )}
        <form onSubmit={handleComment}>
          <input className="border border-black" name="comment" placeholder="Add comment..."></input>
          <button className="mx-1 px-3 py-1 text-sm text-white bg-cyan-500 rounded-xl mb-2">Comment!</button>
        </form>
        <ul className="list-disc px-4">
          {blog && blog.comments.map(com => <li key={com}>{com}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default BlogPage;