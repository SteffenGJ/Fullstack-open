const {MONGODB_URI} = require("./utils/config");
const express = require("express");
const app = express();
const cors = require('cors')
const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/users");
const {errorhandler, tokenExtractor, userExtractor} = require("./utils/middleware")
const {info, error} = require("./utils/logger");
const mongoose = require('mongoose');
const loginRouter = require("./controllers/login");



mongoose.connect(MONGODB_URI, () => {
    info("CONNECTED TO DATABASE");
}, () => {
    error("Trouble connecting to database");
});


app.use(cors())
app.use(express.json())
app.use(tokenExtractor);
app.use("/api/blogs", userExtractor, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
if (process.env.NODE_ENV === "test") {
    const testingRouter = require("./controllers/testing");
    app.use("/api/testing", testingRouter)
}
app.use(errorhandler)

console.log(process.env.NODE_ENV);

module.exports = app;