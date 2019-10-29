const config = require('../config/config')
const crypto = require('crypto')

function encryptPassword(password) {
  return crypto.createHmac('sha256', config.salt)
    .update(password).digest('hex');
}

module.exports = encryptPassword