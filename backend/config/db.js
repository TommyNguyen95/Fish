const mongoose = require('mongoose');
const config = require('./config');

const connectToDb = (which = 'live') => {
  let type = which;
  return new Promise((resolve, reject) => {
    if (global.currdb) {
      if (global.currdb == which) {
        resolve("Success!");
        return;
      } else {
        global.currdb = which;
      }
    } else {
      global.currdb = which;
    }
    which = which == 'test' ? config.db_test : config.db;
    mongoose.connect(which, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        resolve("Success!");
      })
      .catch(err => console.log(err));
    global.db = mongoose.connection;
  });
}
module.exports = connectToDb;