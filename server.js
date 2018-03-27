const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
// const session = require('express-session')
// var passport = require("./config/passport");

//sessions
// app.use(
//   session({
//   secret: 'hiccup', //pick a random string to make the hash that is generated secure
//   resave: false, //required
//   saveUninitialized: false //required
//   })
// )

// app.use( (req, res, next) => {
//   console.log('req.session', req.session);
//   return next();
// });

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);
// app.use(passport.initialize());
// app.use(passport.session());

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://hagan:wishdb@ds123259.mlab.com:23259/heroku_z506v43z", 
  {
    useMongoClient: true
  }
);



// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
