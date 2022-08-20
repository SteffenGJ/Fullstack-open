/* eslint-disable no-unused-vars */
/* eslint-disable semi */
const mongoose = require("mongoose");
require("dotenv").config();


const url = process.env.MONGODB_URI;


mongoose.connect(url)
  .then(result => {
    console.log("CONNECTED")
  })
  .catch(err => {
    console.log(`ERROR ${err}`)
  })

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  phone: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: (phone) => {
        if (phone.includes("-")) {
          if (phone.indexOf("-") >= 3 || phone.indexOf("-") < 1) {
            return false;
          }
          if (phone.endsWith("-")) {
            return false;
          }
        }
        return true;
      }
    }
  }
})

phoneSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id;
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Contact", phoneSchema);
