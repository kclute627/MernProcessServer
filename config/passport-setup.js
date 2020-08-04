const passport = require("passport");
const GoogleStategy = require("passport-google-oauth20");
const config = require("config");
const jwt = require("jsonwebtoken");

const cs = config.get("googleClientSecret");
const clientId = config.get("googleClientId");
const User = require("../models/User");

passport.use(
  new GoogleStategy(
    {
      // options for stragety
      callbackURL: "/api/users/google/redirect",
      clientID: clientId,
      clientSecret: cs,
    },
    async (accessToken, refreshToken, profile, done) => {
      // passport callback function
      console.log("passport callback FIRED!!!!");

      const { id, displayName } = profile;
      const email = profile._json.email;
      const avatar = profile._json.picture;

      let user = await User.findOne({ email });
      if (!user) {
        user = new User({
          name: displayName,
          email,
          avatar,
          password: id,
        });

        await user.save();
      }

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

      await done(null, profile);
    }
  )
);
