import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/blogslice";

const BlogForm = ({ handleBlogSubmit }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value
    };
    dispatch(addBlog(blog));
    handleBlogSubmit(blog);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col jutstify-evenly gap-4 mx-auto items-center border border-black p-4 rounded-xl my-4"
    >
      <h2 className="text-lg font-semibold font-mono">Create new blog</h2>
      <p>Title</p>
      <input
        name="title"
        id="input-title"
        placeholder="enter title..."
        className="form-input px-4 py-1 rounded-md border border-black"
      />
      <p>Author</p>
      <input
        name="author"
        id="input-author"
        placeholder="enter author..."
        className="form-input px-4 py-1 rounded-md border border-black"
      />
      <p>Url</p>
      <input
        name="url"
        id="input-url"
        placeholder="enter url..."
        className="form-input px-4 py-1 rounded-md border border-black"
      />
      <button className="button px-6 py-2 text-white bg-cyan-500 rounded-xl">
                Submit
      </button>
    </form>
  );
};

export default BlogForm;
