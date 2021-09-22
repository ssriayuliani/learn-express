const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// user model
const User = require("../models/User");

// login page
router.get("/login", (req, res) => {
  res.render("login");
});

// register page
router.get("/register", (req, res) => {
  res.render("register");
});

// register handle
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // check passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  // check pass length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    // error -> rerender register -> pass in value: errors and the data
    // -> dont want to the display empty data that has been checked at register.ejs
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    // validation passed
    User.findOne({ email: email }).then((user) => {
      if (user) {
        // user exists
        errors.push({ msg: "Email is already registered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        // when have a models create new instance of User
        const newUser = new User({
          name,
          email,
          password,
        });
        newUser.save();

        // hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // set password to hash
            newUser.password = hash;
            // save user
            newUser.save()
            .then(user => {
              res.redirect('/users/login')
            }).catch(err => console.log(err))
          })
        );
      }
    });
  }
});

module.exports = router;
