const crypto = require('crypto')

function encryptPassword(password) {
  return crypto.createHmac('sha256', global.config.salt)
    .update(password).digest('hex');
}

module.exports = encryptPassword