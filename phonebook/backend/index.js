require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { Person } = require("./mongo");

const app = express();
const cors = require("cors");

morgan.token("post", (request, response) => {
  return JSON.stringify(request.body);
});

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (request, response) => {
  response.send("<h1>hallo world</h1>");
});

app.get("/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.get("/info", (request, response) => {
  Person.find({}).then((people) => {
    const date = new Date();
    response.send(
      `Phonebook has info for ${people.length} people <br /> ${date}`
    );
  });
});

app.get("/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) response.json(person);

      if (!person) response.status(404).end();
    })
    .catch((error) => next(error));
});

app.delete("/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.send(result);
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.use(morgan(":post"));

app.post("/persons", (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    phone: body.phone,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((err) => next(err));
});

app.put("/persons/:id", (request, response, next) => {
  const { name, phone } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, phone },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  if (error.name === "ValidationError")
    return response.status(400).json({
      error: error.message,
    });

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
