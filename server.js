require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");

const mongoose = require("mongoose");

const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo");

const passport = require("passport");
// const { Passport } = require("passport");

//database connection

const url = "mongodb://127.0.0.1/food";
mongoose.connect(url, {});

const connection = mongoose.connection;
connection
  .once("open", function () {
    console.log("Database connected...");
  })
  .on("error", function (error) {
    console.log("Connection Failed..", error);
  });

//session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    // store: mongoStore,
    store: MongoDbStore.create({
      mongoUrl: "mongodb://127.0.0.1/food",
    }),
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hour ,,, kitne time tak valid rehni chaihye.....in milisecond which is equal to 24hr
  })
);

//passport configuration
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Assests Kidhar rakhe he

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

//Global Middleware

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

// set template engine

app.use(expressLayout);

app.set("views", path.join(__dirname, "/resources/views"));

app.set("view engine", "ejs");

require("./routes/web")(app); //init routes rerturn here

app.listen(PORT, () => {
  console.log(`Listening on port${PORT}`);
});
