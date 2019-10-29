const express = require('express');
const User = require('../schemas/userSchema');
const router = express.Router();
const activationMail = require('../nodemailer')

/**
 * Get all users
 */
 router.get('/api/users', async (req, res) => {
   User.find({})
   .exec()
   .then(data => {
     res.status(200).send(data);
     
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
   if(!error){
    activationMail(save)
   }
 
 })

 /**Activate route */

 router.get('/api/activate/:id', async (req, res) => {

  let user = await User.findById(req.params.id)
  user.active = true;
  let result = await user.save().catch(err => error = err);
  let error;
  res.json(result || error);

})


 module.exports = router;