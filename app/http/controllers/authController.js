// const user = require("../../models/user");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const user = require("../../models/user");
const passport = require("passport");

function authController() {
  //factory functions// pattern of programming -> object production...
  const _getRedirectUrl = (req) => {
    return req.user.role === "admin" ? "/admin/orders" : "/customer/orders";
  };

  return {
    //CRUD controller
    //index method for read

    login(req, res) {
      res.render("Auth/login");
    },

    postLogin(req, res, next) {
      const { email, password } = req.body;

      // Validate request
      if (!email || !password) {
        req.flash("error", "All fields are required");
        return res.redirect("/login");
      }
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }

        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }

        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }

          // req.session.isLoggedIn = true;

          return res.redirect(_getRedirectUrl(req));
        });
      })(req, res, next);
    },
    register(req, res) {
      res.render("Auth/register");
    },

    async postRegister(req, res) {
      const { username, email, password } = req.body;
      //we have to express explicitly which type of data we are expecting

      //validation of request

      if (!username || !email || !password) {
        req.flash("error", "All Fields are required");
        //to return the data if error message occures...it wll not erase the data even after error message
        req.flash("username", username);
        req.flash("email", email);
        return res.redirect("/register");
      }

      //if all ok then come here

      //check if email exists

      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash("error", "Email Already Taken");
          //to return the data if error message occures...it wll not erase the data even after error message
          req.flash("username", username);
          req.flash("email", email);
          return res.redirect("/register");
        }
      });

      //hash password

      const hashedPassword = await bcrypt.hash(password, 10);

      //Create A user

      const user = new User({
        username,
        email,
        password: hashedPassword,
      });

      user
        .save()
        .then(() => {
          //Login funactionality
          return res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "Something went Wrong");

          return res.redirect("/register");
        });

      //   console.log(req.body);
    },
    logout(req, res, next) {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    },
  };
}

module.exports = authController;
