const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // register the user

  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      //return some error
      return res.status(400).json({ errors: [{ msg: "User Already exists" }] });
    }

    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "retro",
    });

    user = new User({
      name,
      email,
      avatar,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // send jwt back 

    await user.save();

    const payload = {
      id: user._id
    }

    jwt.sign(payload, 
      config.get('jwtSecret'), 
      {
        expiresIn: 36000
      },
      (err, token)=>{
          if(err) throw err;
          res.json({token})
      })




  } catch (error) {
    console.error(error.message);

    res.status(500).send("Server Error");
  }

  
};

exports.googleRedirect = async (req, res, next) => {
  // const token = req.user.token;

  const payload = {
    id: req.user._id,
  };

  const token =  jwt.sign(
  payload,
  config.get("jwtSecret"),
  { expiresIn: 360000 })


  

  res.redirect(`http://localhost:3000/dashboard?token=${token}`);
};
