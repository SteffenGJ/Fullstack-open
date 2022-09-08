import { useState } from "react";

const BlogForm = ({ handleBlogSubmit }) => {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleBlogSubmit({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new blog</h2>
      <p>Title</p><input id="input-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="enter title..."/>
      <p>Author</p><input id="input-author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="enter author..."/>
      <p>Url</p><input id="input-url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="enter url..."/>
      <button className="button">Submit</button>
    </form>
  );
};

export default BlogForm;