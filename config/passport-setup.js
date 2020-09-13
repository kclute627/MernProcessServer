const passport = require("passport");
const GoogleStategy = require("passport-google-oauth20");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
          googleid: id,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

       

        await user.save();
      }

     

      await done(null, user);
    }
  )
);
