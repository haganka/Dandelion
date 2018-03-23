const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  deliveries: { type: Number },
  requests: { type: Number }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
