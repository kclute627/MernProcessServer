const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const passport = require('passport')
const { check, validationResult } = require("express-validator");

// @route       POST api/users
//@dec          Register user
//@acesss       Public




router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "please enter an email address").isEmail(),
    check("password", "Please enter password at least 6 long").isLength({
      min: 6,
    }),
  ],
  userController.registerUser
);

router.get('/google', 
  passport.authenticate('google', {  scope: ['profile', 'email'] }));   


  
router.get('/google/redirect', 
passport.authenticate('google', {  failureRedirect: '/login'}),
userController.googleRedirect)

router.get('/dashboard', (req, res) => res.redirect('/'))

module.exports = router;
