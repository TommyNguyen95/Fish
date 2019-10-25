const express = require('express');
const User = require('../schemas/userSchema');
const router = express.Router();

/**
 * Get all users
 */
 router.get('/api/users', async (req, res) => {
   User.find({})
   .exec()
   .then(data => {
     res.status(200).send(data);
     console.log(data)
   })
 })

 /**
  * Create an user
  */
 router.post('/api/user', async (req, res) => {
   console.log('kim ska träffa zoey så check: OUT sen check: IN')
  
   let save = new User(req.body);
   console.log(req.body);
   let error;
   let result = await save.save().catch(err => error = err);
   res.json(result || error);
   console.log(save)
 })

 module.exports = router;