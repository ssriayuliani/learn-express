const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
// to show the messages in redirect use flash
const flash = require("connect-flash");
const session = require("express-session");

const app = express();

// db config
const db = require("./config/key").MongoURI;

// connct to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Bodyparser
// can get the data from the form with req.body
app.use(express.urlencoded({ extended: false }));

// Express-session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// connect flash
app.use(flash());

// global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server startted on port ${PORT}`));
