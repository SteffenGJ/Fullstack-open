const testingRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/user");

testingRouter.post("/reset", async (req, res, next) => {
    try {
    await Blog.deleteMany({});
    await User.deleteMany({});
    res.status(204).end();
    } catch(e) {
        next(e);
    }
})

module.exports = testingRouter;