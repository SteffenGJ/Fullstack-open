const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res, next) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username});
        const passwordCorrect = user === null ?
            false : await bcrypt.compare(password, user.password);
        
        if (!user || !passwordCorrect) {
            return res.status(401).send({error: "Invalid username or password"});
        }

        const userForToken = {
            username: user.username,
            id: user._id
        };

        const token = jwt.sign(userForToken, process.env.SECRET);

        res.status(200).json({token, username: user.username, name: user.name});
    } catch(e) {
        next(e);
    }
})

module.exports = loginRouter;