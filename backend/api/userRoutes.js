const express = require('express')
const User = require('../schemas/userSchema')
const Transaction = require('../schemas/transactionSchema')
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
  testuser.active = true
  let result = await testuser.save()
  res.send("activated")
})

// eof for testing


/**
 * Get all users (TESTED - 01)
 */
router.get('/api/users', async (req, res) => {
  if (req.session.user.role !== 'admin') {
    res.status(403).send();
  }
  User.find({})
    .exec()
    .then(data => {
      res.status(200).send(data);
    })
})
/**
 * To be used by admin. Searches for a user by email (must be exact) and returns user as well as transactions
 * with populated "to" and "from" fields
 */
router.post('/api/users', async (req, res) => {
  if (req.session.user.role !== 'admin') { res.status(403).send() }
  const username = req.body.email;
  const fields = "username firstname lastname transactions created balance active";
  const user = await User.findOne({ username }).select(fields);
  if (!user) { return res.status(404).send() }
  const transactions = await Transaction.find({
    $or: [{
      to: user._id
    }, {
      from: user._id
    }]
  })
    .populate('to from', 'username firstname lastname')
    .exec();
  user.transactions = transactions;
  res.send(user);
})

/**
 * Get user by username
 */
router.get('/api/user/:username', async (req, res) => {
  User.find({})
    .exec()
    .then(data => {
      res.status(200)
      for (let user of data) {
        if (user.username === req.params.username) {
          if (req.session.user.role === 'admin' || 'user') {
            res.status(200).send(user)
            break
          }
        } else {
          res.status(401)
        }
      }
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

  // console.log("DELETR");
  // res.send('')

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
      let parentID = req.session.user._id;
      parent.relations.forEach(async (child, index) => {
        if (child == req.params.id) {
          // Delete the user itself
          await User.findByIdAndDelete(req.params.id)
          // Also pop it off parents relations
          parent.relations.splice(index, 1)
          parent.save()
          // Re-fetch new and populated data and send back to frontend for state update
          let updatedParent = await User.findOne({ _id: parentID }).populate('relations')
            .select('username role relations active firstname lastname balance transactions').exec().catch(err => {
              console.log(err)
            });
          req.session.user = updatedParent
          res.json({ updatedParent })
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
  user.balance = req.body.balance;
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
      // Let's remove this for now since it is using the credits we have from the free mailing program
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

// Deactivate account
router.patch('/api/activate/:id', async (req, res) => {
  let user = await User.findById(req.params.id)
  if (!user) {
    res.status(404).send()
  }
  user.active = req.body.active
  user.save()
  res.status(200).send(user)
})

router.post('/api/sendresetlink/:email', async (req, res) => {
  let user = await User.findOne({ username: req.params.email })
  if (user) {
    sendResetLink(user)
    res.json({ string: `Klicka på länken i din email för att återställa lösenordet.`, result: true, link: 'Klicka här ifall det tar för lång tid!' } || error);
  } else {
    res.json({ string: `Ingen användare med angiven emailadress hittades.`, result: false, link: 'Klicka här ifall det tar för lång tid!' } || error);
  }


})
router.get('/api/resetpassword/:id', async (req, res) => {


  let user = await User.findById(req.params.id)
  let error;

  resetPasswordLength(10)

  async function resetPasswordLength(length) {
    let newPassword = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      newPassword += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    await reset(user, newPassword)
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
  let user = await User.findOne({ username, password }).populate('relations')
    .select('username role relations active firstname lastname balance transactions').exec().catch(err => {
      console.log(err)
    });
  if (user === null) {
    return res.status(401).send({ status: 'Du måste ha ett konto för att logga in !' });
  }
  if (user.active === false) {
    return res.json('Du måste aktivera ditt konto innan du kan logga in!')
  }
  if (user) { req.session.user = user };
  res.json(user ? user : { error: 'not found' });
});
/**
 * check if/which user that is logged in
 */
router.get('/api/login', async (req, res) => {
  if (req.session.user) {
    let user = await User.findOne({ username: req.session.user.username }).populate('relations')
      .select('username role relations active firstname lastname balance transactions').exec().catch(err => {
        console.log(err)
      });
    req.session.user = user;
    res.json(req.session.user)
  } else {
    res.json({ status: 'not logged in' })
  }
})
/**
 * logout
 */
router.delete('/api/login', async (req, res) => {
  let user = await User.findOne({ username: req.session.user.username })
  user.sub = "";
  user.save()
  delete req.session.user;
  delete req.session.sub;
  res.json({ status: 'logged out' });
});


module.exports = router;
