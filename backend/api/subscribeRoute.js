const express = require('express');
const router = express.Router()
const User = require('../schemas/userSchema');

// Subscribe route
router.post('/api/push-subscribe', async (req, res) => {
  const subscription = req.body;
  // Send 201 - resource created
  res.status(201).json({ subscribing: true });

  if (req.session.user) {
    let thisUser = await User.findOne({ username: req.session.user.username })
    thisUser.sub = subscription
    thisUser.save()
  }
});

router.post('/api/sse', async (req, res) => {
  res.status(200).send("ok")
})

module.exports = router;
