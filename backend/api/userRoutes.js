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
  
   let save = new User(req.body);
   let error;
   let result = await save.save().catch(err => error = err);
   res.json(result || error);
 })

 /**
  * Delete a user
  */
 router.delete('/api/user/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    !deletedUser && res.status(404).send();
    res.send(deletedUser);
  } catch (e) {
    res.status(500).send();
  }
 })

 module.exports = router;