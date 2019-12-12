const express = require('express');
const router = express.Router()

// Subscribe route
router.post('/api/push-subscribe', async (req, res) => {
  const subscription = req.body;
  // Send 201 - resource created
  res.status(201).json({ subscribing: true });

  console.log('subscription', subscription);

  // Send some notifications...
  // this might not be what you do directly on subscription
  // normally
  sendNotification(subscription, { body: 'Welcome!' });
  setTimeout(
    () => sendNotification(subscription, console.log('tjena??'), { body: 'Still there?' }),
    3000
  );
});


// A function that sends notifications
async function sendNotification(subscription, payload) {
  let toSend = {
    title: 'Our site name',
    icon: '/logo192.png',
    ...payload
  };
  await webpush.sendNotification(
    subscription, JSON.stringify(toSend)
  ).catch(err => console.log(err));
}

module.exports = router;
