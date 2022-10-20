const LocalStrat = require("passport-local").Strategy;

const User = require("../models/user");

const bcrypt = require("bcrypt");

function init(passport) {
  passport.use(
    new LocalStrat(
      { usernameField: "email" },
      async (email, password, done) => {
        //check if username exists

        const user = await User.findOne({ email: email });

        if (!user) {
          return done(null, false, { message: "No user with this email" });
        }

        bcrypt
          .compare(password, user.password)
          .then((match) => {
            if (match) {
              return done(null, user, { message: "Login succesfully" });
            }

            return done(null, false, {
              message: "Invalid username or password",
            })
          })
          .catch((err) => {
            return done(null, false, { message: "Something Went Wrong" })
          })
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    })
  })
}

module.exports = init;

//export in server file
