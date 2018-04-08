const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://hagan:wishdb@ds123259.mlab.com:23259/heroku_z506v43z",
  {
    useMongoClient: true
  }
);

const UserSeed = [
  {
    name: "Mark",
    email: "Mark@mark.com",
    password: "mark",
    ratingArr: [3, 4],
    rating: 3.5,
    completeGrants: [], 
    completeWishes: []
  },
  {
    name: "Kelly",
    email: "kelly.hagan3@gmail.com",
    password: "puppy",
    ratingArr: [5, 1],
    rating: 3,
    completeGrants: [], 
    completeWishes: []
  },
  {
    name: "Alex",
    email: "Alex@alex.com",
    password: "password",
    ratingArr: [],
    rating: 0,
    completeGrants: [],
    completeWishes: []
  }

];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(UserSeed))
  .then(data => {
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
