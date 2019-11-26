const connectToDb = require('./config/db');
module.exports = function () {
  return async (req, res, next) => {
    if (!req.query.tr && req.query.constructor === Object) {
      await connectToDb()
    } else {
      await connectToDb('test')
    }
    next();
  }
}