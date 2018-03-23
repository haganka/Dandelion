const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactwishusers",
  {
    useMongoClient: true
  }
);

const UserSeed = [
  {
    name: "Mark",
    rating: 3,
    deliveries: 2, 
    requests: 3
  },
  {
    name: "Kelly",
    rating: 5,
    deliveries: 1, 
    requests: 2
  },
  {
    name: "Alex",
    rating: 5,
    deliveries: 0, 
    requests: 5
  }

];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(UserSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
