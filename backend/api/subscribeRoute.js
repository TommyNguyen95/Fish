const express = require('express');
const router = express.Router()
const webpush = require('web-push')
const User = require('../schemas/userSchema');

// Subscribe route
router.post('/api/push-subscribe', async (req, res) => {
  const subscription = req.body;
  // Send 201 - resource created
  res.status(201).json({ subscribing: true });

  let thisUser = await User.findOne({ username: req.session.user.username })
  thisUser.sub = subscription
  thisUser.save()

  // Send some notifications...
  // this might not be what you do directly on subscription
  // normally
  sendNotification(subscription, { body: 'Välkommen till f!$h!' });
});

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

module.exports = router;
