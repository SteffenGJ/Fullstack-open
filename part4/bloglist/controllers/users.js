const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.get("/", async (req, res, next) => {
    try {
        const users = await User.find({}).populate("blogs");
        res.status(200).json(users);
    } catch(e) {
        next(e);
    }
})

userRouter.post("/", async (req, res, next) => {
    try {
        const {username, name, password} = req.body;

        if (password.length <= 3) {
            return res.status(400).json({error: "Password must be at least 3 characters long"});
        }

        const occupied = await User.find({username: username});

        if (occupied.length) {
            return res.status(400).json({error: "Username is already taken"});
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            name: name,
            username: username,
            password: passwordHash
        })
        await newUser.save();
        res.status(201).send(newUser);
    } catch(e) {
        next(e);
    }
})

module.exports = userRouter;