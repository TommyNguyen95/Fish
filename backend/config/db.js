const mongoose = require('mongoose');

const connectToDb = (which = 'live') => {
  let type = which;
  return new Promise((resolve, reject) => {
    if (global.currdb) {
      if (global.currdb == which) {
        resolve();
        return;
      } else {
        global.currdb = which;
      }
    } else {
      global.currdb = which;
    }
    which = which == 'test' ? global.config.db_test : global.config.db;
    // Fix for deprecation errors. useCreateIndex: true
    mongoose.connect(which, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
      .then(() => {
        resolve();
      })
      .catch(err => console.log(err));
    global.db = mongoose.connection;
  });
}
module.exports = connectToDb;