const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let transactionSchema = new Schema({
  receiver: {
    firstname: String,
    lastname: String,
    username: String,
  },
  sender: {
    firstname: String,
    lastname: String,
    username: String,
  },
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  date: { type: Date, default: Date.now },
  message: { type: String }
})

module.exports = mongoose.model('transactions', transactionSchema);
