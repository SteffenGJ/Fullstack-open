const {error} = require("./logger");
const {getTokenFrom} = require("./list_helper");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const errorhandler = (err, req, res, next) => {
    error(err.message);

    if (err.name === "ValidationError") {
        return res.status(400).json({error: err.message});
    } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({error: err.message});
    }

    next(err);
}

const tokenExtractor = (req, res, next) => {
    req.token = getTokenFrom(req);
    next();
}

const userExtractor = async (req, res, next) => {
    try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(decodedToken.id);
    next()
    } catch(e) {
        next(e);
    }
}

module.exports = {errorhandler, tokenExtractor, userExtractor}