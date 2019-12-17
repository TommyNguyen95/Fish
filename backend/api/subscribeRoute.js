const express = require('express');
const router = express.Router()
const User = require('../schemas/userSchema');



// Subscribe route
router.post('/api/push-subscribe', async (req, res) => {
  const subscription = req.session.sub || req.body;
  req.session.sub = subscription

  if (req.session.user) {
    let thisUser = await User.findOne({ username: req.session.user.username })
    thisUser.sub = req.session.sub
    thisUser.save()
  }

  // Send 201 - resource created
  res.status(201).json({ subscribing: true });
});

module.exports = router;
