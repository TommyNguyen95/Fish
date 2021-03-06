const express = require('express');
const Transactions = require('../schemas/transactionSchema');
const router = express.Router();
const User = require('../schemas/userSchema');

/**
 * Get all transactions
 */
router.get('/api/transactions', async (req, res) => {
  if (req.session.user.role !== 'admin') {
    res.status(403).send();
  }
  await Transactions.find({})
    .exec().then(data => {
      // console.log("GET", data)
      // res.status(200).send(data);
      res.send(data);
    })
})

router.post('/api/transactions', async (req, res) => {
  let reciever = await User.findById(req.body.to);
  let sender = await User.findById(req.body.from)

  if (!reciever || !sender) {
    res.send("sender or receiver not found")
    return
  }

  if (req.body.amount <= 0) {
    res.send("you cant fish less than 1kr")
    return
  }

  let err, trans = new Transactions({
    ...req.body,
    receiver: {
      firstname: reciever.firstname,
      lastname: reciever.lastname,
      username: reciever.username,
    },
    sender: {
      firstname: sender.firstname,
      lastname: sender.lastname,
      username: sender.username,
    }
  })
  let result = await trans.save().catch(error => {
    err = error;
  });
  global.sendSSE(
    req => req.session.user && req.session.user.username === reciever.username,
    'message',
    `${sender.username} fishade dig ${req.body.amount} SEK`
  );
  reciever.balance = reciever.balance + req.body.amount;
  reciever.transactions.push(trans);
  sender.balance = sender.balance - req.body.amount;
  sender.transactions.push(trans);
  reciever.save()
  sender.save()
  res.json(result || err && reciever && sender)
})

router.delete('/api/transactions', async (req, res) => {
  await Transactions.deleteMany({}, async () => {
    let transCheck = await Transactions.find({});
    res.send(transCheck)
  });
})

module.exports = router;