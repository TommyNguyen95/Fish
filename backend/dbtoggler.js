const connectToDb = require('./config/db');
module.exports = function () {
  return async (req, res, next) => {
    if (Object.keys(req.query).length === 0 && req.query.constructor === Object) {
      await connectToDb()
    } else {
      await connectToDb('test')
    }
    next();
  }
}