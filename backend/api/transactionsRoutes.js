const express = require('express');
const Transactions = require('../schemas/transactionSchema');
const router = express.Router();

/**
 * Get all transactions
 */
router.get('/api/transactions', async (req, res) => {
  Transactions.find({})
    .exec().then(data => {
      res.status(200).send(data);
    })
})





module.exports = router;