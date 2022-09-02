const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        minLength: 3
    },
    password: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ]
})

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    }
})

module.exports = mongoose.model("User", userSchema);