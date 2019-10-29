const express = require('express');
const Transactions = require('../schemas/transactionSchema');
const router = express.Router();

/**
 * Get all transactions
 */
router.get('/api/transactions', async (req, res) => {
  await Transactions.find({})
    .exec().then(data => {
      // console.log("GET", data)
      res.status(200).send(data);
    })
})

router.post('/api/transactions', async (req, res) => {
  let err, trans = new Transactions(req.body)
  let result = await trans.save().catch(error => {
    err = error;
  });
  res.json(result || err)
})

router.delete('/api/transactions', async (req, res) => {
  // await Transactions.deleteMany({}, async () => {
  //   let transCheck = await Transactions.find({});
  //   res.send(transCheck)
  // });
})
router.delete('/api/transactionsSecretPurgeUrl', async (req, res) => {
  await Transactions.deleteMany({}, async () => {
    let transCheck = await Transactions.find({});
    res.send(transCheck)
  });
})

module.exports = router;