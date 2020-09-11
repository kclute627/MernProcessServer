const jwt = require("jsonwebtoken");
const config = require("config");
const bycript = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

exports.authUser = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server Error");
  }
};

exports.getToken = async (req, res) => {
  

  const { email, password } = req.body;

  try {
    // see if the user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credintials" }] });
    }

    const isMatch = await bycript.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credintials" }] });
    }

    // Rerurn jsonwebtoken

    const payload = {
      id: user.id
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
