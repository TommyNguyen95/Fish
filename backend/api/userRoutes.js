const express = require('express')
const User = require('../schemas/userSchema')
const router = express.Router()
const { reset, activate, sendResetLink } = require('../nodemailer')
const encryptPassword = require('../helpers/encryptPassword')
const getAge = require('../helpers/getAge')


// FOR TESTING ONLY!  This route is JUST for testing purposes! It will create an admin with static credentials upon visit
router.get('/api/createadmin', async (req, res) => {
  await User.deleteMany().exec().catch(err => {
    console.log(err)
  })

  req.session.role = 'admin'
  save = new User({
    firstname: 'Super',
    lastname: 'Admin',
    username: "admin@test.nu",
    password: encryptPassword('123456'),
    role: 'admin',
    active: true,
    ssn: "19850505",
    session: req.session
  })
  let error;
  let result = await save.save().catch(err => error = err)
  result.session = req.session;
  res.json(result || error)
})

router.post('/api/activatetestuser', async (req, res) => {
  let testuser = await User.findOne({ username: req.body.username });
  console.log(testuser)
  testuser.active = true
  let result = await testuser.save()
  res.send("activated")
})

// eof for testing


/**
 * Get all users (TESTED - 01)
 */
router.get('/api/users', async (req, res) => {
  User.find({})
    .exec()
    .then(data => {
      res.status(200).send(data);
    })
})

/**
* Get user by ID (TESTED - 02)
*/
router.get('/api/user/:id', async (req, res) => {
  try {
    if (req.session.user._id === req.params.id || req.session.user.role === 'admin') {
      let user = await User.findById(req.params.id).populate("relations")
      res.json(user)
    } else {
      res.status(500).send({ status: 'error' });
    }
  } catch (e) {
    res.status(500).send({ status: 'error' });
  }
})
/**
 * Delete a user (TESTED 03)
 */
router.delete('/api/user/:id', async (req, res) => {
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
/**
 * Edit a user (TESTED - 04)
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
      next(err)
    } else {
      res.status(200).send()
    }
  })
})
/**
 * Create a user (TESTED 05, 06, 07)
 */
router.post('/api/user', async (req, res) => {

  let save;

  if (req.session.user) {
    if (req.session.user.role === 'user') {
      save = new User({
        ...req.body,
        password: encryptPassword(req.body.password),
        role: 'child',
        parent: req.session.user._id
      });

      let parent = await User.findById(req.session.user._id)
      parent.relations.push(save._id)
      parent.save()

    }
  } else if (getAge(req.body.ssn) >= 18) {
    save = new User({
      ...req.body,
      password: encryptPassword(req.body.password),
      role: 'user'
    });
  } else {
    res.status(400).send({ status: 'Du kan bara skapa ett konto om du är över 18år!' });
  }

  if (save) {
    let error;
    let result = await save.save().catch(err => error = err);
    res.json(result || error);
    if (!error) {
      activate(save)
    }
  }
})

/**Activate route */
router.get('/api/activate/:id', async (req, res) => {

  let user = await User.findById(req.params.id)
  user.active = true;
  let result = await user.save().catch(err => error = err);
  let error;
  res.json(`Ditt konto är nu aktiverat! Användarnamn: ${user.username}` || error);

})
router.get('/api/sendresetlink/:id', async (req, res) => {


  let user = await User.findById(req.params.id)

  sendResetLink(user)
  res.json(`Klicka på länken i din email för att återställa lösenordet.` || error);

})
router.get('/api/resetpassword/:id', async (req, res) => {


  let user = await User.findById(req.params.id)
  let error;

  resetPasswordLength(5)

  async function resetPasswordLength(length) {
    let newPassword = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      newPassword += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    reset(user)
    user.password = encryptPassword(newPassword);
    let result = await user.save().catch(err => error = err);
    return res.json(`Ditt lösenord är återställt. Lösenord: ${newPassword}` || error);
  }

})

/**
 * login
 */
router.post('/api/login', async (req, res) => {
  let { username, password } = req.body;
  password = encryptPassword(password);
  let user = await User.findOne({ username, password })
    .select('username role relations active').exec().catch(err => {
      console.log(err)
    });
  if (user.active === false) {
    return res.json('Du måste aktivera ditt konto innan du kan logga in!')
  }
  if (user) { req.session.user = user };
  res.json(user ? user : { error: 'not found' });
});
/**
 * check if/which user that is logged in
 */
router.get('/api/login', (req, res) => {
  // req.session.user = {}
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
