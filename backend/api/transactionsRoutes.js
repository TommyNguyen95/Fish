const express = require('express');
const Transactions = require('../schemas/transactionSchema');
const router = express.Router();
const User = require('../schemas/userSchema');

/**
 * Get all transactions
 */
router.get('/api/transactions', async (req, res) => {
  await Transactions.find({})
    .exec().then(data => {
      res.status(200).json(req.session);
    })
})

router.post('/api/transactions', async (req, res) => {
  let reciever = await User.findById(req.body.to);
  let sender = await User.findById(req.body.from)

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