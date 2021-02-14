const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes = require("./src/routes/user.js");
const app = express();

const PORT = 3000;
app.listen(process.env.PORT || 3000);

//Connection mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/CRMdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Setup bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

//Routeur
app.use("/", userRoutes);
