const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const webpush = require('web-push')
const User = require('../schemas/userSchema');


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



// A function that sends notifications
async function sendNotification(subscription, payload) {
  let toSend = {
    title: 'Getfish.se',
    icon: '/logo192.png',
    ...payload
  };
  await webpush.sendNotification(
    subscription, JSON.stringify(toSend)
  ).catch(err => console.log(err));
}


transactionSchema.pre("save", async function (next) {
  let user = await User.findOne({ username: this.receiver.username }).catch(err => console.log(err));
  if (user.sub) {
    await sendNotification(user.sub, { body: `${this.sender.username} fishade dig ${this.amount} SEK` })
  }
  next()
});

module.exports = mongoose.model('transactions', transactionSchema);
