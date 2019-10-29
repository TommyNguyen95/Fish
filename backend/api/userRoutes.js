const express = require('express');
const User = require('../schemas/userSchema');
const session = require('express-session');
const config = require('../config/config')
const router = express.Router();
const activationMail = require('../nodemailer')
const encryptPassword = require('../helpers/encryptPassword')

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
  * Create a user
  */
 router.post('/api/user', async (req, res) => {
  
   let save = new User({
     ...req.body,
     password: encryptPassword(req.body.password)
   });
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

 /**
  * login
  */
 router.post('/api/login', async (req, res) => {
  let {username, password} = req.body;
  password = encryptPassword(password);
  let user = await User.findOne({username, password})
    .select('username role').exec();
  if(user){ req.session.user = user };
  res.json(user ? user : {error: 'not found'});
});

/**
 * check if/which user that is logged in
 */
router.get('/api/login', (req, res) => {
  res.json(req.session.user ?
    req.session.user :
    {status: 'not logged in'}
  );
});
 
/**
 * logout
 */
router.delete('/api/login', (req, res) => {
  delete req.session.user;
  res.json({status: 'logged out'});
});

 module.exports = router;
