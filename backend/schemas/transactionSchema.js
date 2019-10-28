const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let transactionSchema = new Schema({
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  date: { type: Date, default: Date.now },
  message: String,
})

module.exports = mongoose.model('transactionSchema', transactionSchema);
