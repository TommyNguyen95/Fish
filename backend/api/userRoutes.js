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
   })
 })

 /**
 * Get user by ID
 */
router.get('/api/user/:id', (req, res) => {
  User.findById(req.params.id, (err, items) => {
    if (err) res.status(500).send(error)
    res.status(200).json(items);
  });
});

/**
 * Edit a User
 */
router.put('/api/user/edit/:id', async (req,res) =>{
  let user = await User.findById(req.params.id)
  user.username = req.body.username;
  user.password = req.body.password;
  user.ssn = req.body.ssn;
  user.relations = req.body.relations;
  user.transactions = req.body.transactions;
  user.role = req.body.role;
  user.save(function(err) {
    if (err) {
      console.log(err)
      next(err)
    } else {
      res.status(200).send()
    }
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

 module.exports = router;