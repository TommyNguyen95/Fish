const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  balance: Number,
  relations: Array,
  transactions: Array,
  created: { type: Date, default: Date.now },
  ssn: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);