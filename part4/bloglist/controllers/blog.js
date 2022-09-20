const blogRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {getTokenFrom} = require("../utils/list_helper");
const { userExtractor } = require("../utils/middleware");

blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("user");
    res.json(blogs)
  } catch(e) {
    next(e)
  }
  })
  
blogRouter.post('/', userExtractor, async (req, res, next) => {
  try {
  const {title, url, likes, author} = req.body;

  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!decodedToken) {
    return res.status(401).send({error: "token is missing or invalid"});
  }

  const user = req.user;

  const blog = new Blog({
    title: title,
    url: url,
    likes: likes,
    author: author,
    user: user._id
  });
  
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
      
  res.status(201).json(blog)
  } catch(e) {
    next(e);
  }
})

blogRouter.put("/:id", userExtractor, async (req, res, next) => {
  try {

    const user = req.user;
    
    const blog = {
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
      user: user._id,
      comments: req.body.comments
    }
    const found = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true});
    res.status(201).send(found);
  } catch(e) {
    next(e)
  }
})

blogRouter.delete("/:id", userExtractor, async (req, res, next) => {
  try {
    
    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!decodedToken) {
      return res.status(401).send({error: "correct token required"});
    }

    if (req.user._id.toString() !== decodedToken.id.toString()) {
      return res.status(401).send({error: "only the creater of a blog can delete it"})
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.status(202).send();
  } catch(e) {
    next(e)
  }
})

module.exports = blogRouter;
