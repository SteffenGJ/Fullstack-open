/* eslint-disable no-unused-vars */
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Contact = require("./models/mongo");


app.use(cors());
app.use(express.static("build"));

morgan.token("data", (req, res) => {
  return JSON.stringify(req.body);
});



app.use(morgan("tiny"));
app.use(express.json());


app.get("/api/persons", (req, res, next) => {
  Contact.find({}).then(result => {
    res.send(result);
  }).catch(err => next(err));
});

app.get("/info", (req, res) => {
  Contact.find({}).then(result => res.send(`Phonebook has info for ${result.length} people. ${new Date()}`));

});

app.get("/api/persons/:id", (req, res, next) => {
  Contact.findById(req.params.id)
    .then(result => res.json(result))
    .catch(err => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  Contact.findByIdAndRemove(id)
    .then(result => res.status(204).end())
    .catch(err => next(err));
});

app.use(morgan(":method :url :status :response-time :data"));

app.post("/api/persons", (req, res, next) => {
  const { name } = req.body;
  const { phone } = req.body;
  if (!name || !phone) {
    return res.status(400).send("Please fill out all the fields");
  }



  const contact = new Contact({
    name: name,
    phone: phone
  });

  contact.save()
    .then(savedContact => res.json(savedContact))
    .catch(err => next(err));

});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, phone } = req.body;

  const contact = {
    name: name,
    phone: phone
  };

  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
    .then(result => {
      res.json(result);
    })
    .catch(err => next(err));
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);


app.listen(process.env.PORT || 3001);