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

  const { name, email, password } = req.body;

  try {
    // see if the user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    // get users gravatar

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

    // encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Rerurn jsonwebtoken

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;

        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); 
  }
};

exports.googleRedirect = async (req, res, next) => {
  res.redirect('/')
    
 

};
