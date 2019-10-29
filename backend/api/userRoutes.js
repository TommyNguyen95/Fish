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
* Get user by ID
*/
router.get('/api/user/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (user.role === 'child') {

    }
    if (err) res.status(500).send(error)
    res.status(200).json(user);
  });
})

/**
 * Create a user
 */
router.post('/api/user', async (req, res) => {
  let save;

  if (req.session.user) {
    if (req.session.user.role === 'user') {
      save = new User({
        ...req.body,
        password: encryptPassword(req.body.password),
        role: 'child',
        parent: req.session.user_id
      });

    }
  } else {
    save = new User({
      ...req.body,
      password: encryptPassword(req.body.password),
      role: 'user'
    });
  }

  if (req.session.user) {
    if (req.session.user.role === 'admin') {
      save = new User({
        ...req.body,
        password: encryptPassword(req.body.password),
        role: 'user'
      })
    }
  }

  let error;
  let result = await save.save().catch(err => error = err);
  res.json(result || error);
  if (!error) {
    activationMail(save)
  }
})

/**
 * Edit a user
 */
router.put('/api/user/edit/:id', async (req, res) => {
  let user = await User.findById(req.params.id)
  user.username = req.body.username;
  user.password = req.body.password;
  user.ssn = req.body.ssn;
  user.relations = req.body.relations;
  user.transactions = req.body.transactions;
  user.role = req.body.role;
  user.save(function (err) {
    if (err) {
      console.log(err)
      next(err)
    } else {
      res.status(200).send()
    }
  })
})

/**
 * Delete a user
 */
router.delete('/api/user/:id', async (req, res) => {
  /**
   * Delete a user
   */
  try {
    if (req.session.user._id === req.params.id) {
      let user = await User.findById(req.session.user._id);
      let userRelations = user.relations;
      userRelations.forEach(async child => {
        const deletedChild = await User.findByIdAndDelete(child);
        !deletedChild && res.status(404).send();
        res.send(deletedChild);
      })
      const deletedParent = await User.findByIdAndDelete(req.session.user._id);
      res.send(deletedParent);
    } else {
      let parent = await User.findById(req.session.user._id)
      parent.relations.forEach(async (child, index) => {
        if (child == req.params.id) {
          parent.relations.splice(index, 1);
          const deletedChild = await User.findByIdAndDelete(req.params.id);
          parent.save();
          res.send(deletedChild);
        }
      })
    }

    if (req.session.user.role === 'admin') {
      let deleteUser = await User.findById(req.params.id)
      if (deleteUser.parent) {
        let parent = await User.findById(deleteUser.parent)
        parent.relations.forEach(async (child, index) => {
          if (child == req.params.id) {
            parent.relations.splice(index, 1);
            await parent.save();
            let deleted = await User.findByIdAndDelete(req.params.id)
            res.send(deleted);
          }
        })
      } else {
        let userRelations = deleteUser.relations;
        userRelations.forEach(async child => {
          const deletedChild = await User.findByIdAndDelete(child);
          !deletedChild && res.status(404).send();
          res.send(deletedChild);
        })
        const deletedParent = await User.findByIdAndDelete(req.params.id);
        res.send(deletedParent);
      }
    }

  } catch (e) {
    res.status(500).send();
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
 * login
 */
router.post('/api/login', async (req, res) => {
  let { username, password } = req.body;
  password = encryptPassword(password);
  let user = await User.findOne({ username, password })
    .select('username role relations').exec();
  if (user) { req.session.user = user };
  res.json(user ? user : { error: 'not found' });
});

/**
 * check if/which user that is logged in
 */
router.get('/api/login', (req, res) => {
  res.json(req.session.user ?
    req.session.user :
    { status: 'not logged in' }
  );
});

/**
 * logout
 */
router.delete('/api/login', (req, res) => {
  delete req.session.user;
  res.json({ status: 'logged out' });
});


module.exports = router;
