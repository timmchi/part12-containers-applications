const mongoose = require("mongoose");
const Person = require("./models/person");
mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

if (url && !mongoose.connection.readyState)
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {
  Person,
};
