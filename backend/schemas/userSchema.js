const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  balance: { type: Number, default: 200 },
  relations: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  parent: String,
  transactions: Array,
  created: { type: Date, default: Date.now },
  ssn: { type: String, required: true },
  active: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);