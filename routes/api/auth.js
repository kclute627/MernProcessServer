const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

// @route       GET api/auth
//@dec          Test Route
//@acesss       Public
router.get("/", auth, authController.authUser);

// @route       POST api/auth
//@dec          Get Token
//@acesss       Public
// To DO        See if I can set google up with this route
router.post(
  "/",

  authController.getToken
);

module.exports = router;
