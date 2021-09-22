const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const app = express();

// db config
const db = require("./config/key").MongoURI;

// connct to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Bodyparser
// can get the data from the form with req.body
app.use(express.urlencoded({ extended: false}))

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server startted on port ${PORT}`));
