const proxy = require('easy-server-sent-events/react-dev-proxy');

module.exports = proxy({
  route: '/api/',
  target: 'http://localhost:3001'
});