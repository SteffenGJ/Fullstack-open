const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  favoriteGenre: String
});

module.exports = mongoose.model("User", userSchema);