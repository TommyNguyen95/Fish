const mongoose = require('mongoose');
const config = require('./config');

const connectToDb = () => {
  mongoose.connect(config.db_host, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

  global.db = mongoose.connection
}

module.exports = connectToDb;