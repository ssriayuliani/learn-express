const express = require("express");
const router = express.Router();

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
  let errors = []

  // check required fields
  if(!name || !email || !password || !password2){
    errors.push({msg: 'Please fill in all fields'})
  }

  // check passwords match
  if(password !== password2){
    errors.push({msg: 'Passwords do not match'})
  }

  // check pass length
  if(password.length < 6){
    errors.push({msg: 'Password should be at least 6 characters'})
  }

  if(errors.length> 0){
    // error -> rerender register -> pass in value: errors and the data
    // -> dont want to the display empty data that has been checked at register.ejs
    res.render('register', {
      errors, 
      name, 
      email, 
      password, 
      password2
    })
  }else{
    res.send('pass')
  }
});

module.exports = router;
