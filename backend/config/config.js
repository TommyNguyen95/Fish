// Add your DB name here so you can have your tests for your self (and dont have to see everyone elses tests!)
const tester = 'Tommy';

const config = {
  db: 'mongodb+srv://team2admin:P4ssw0rd@team2booking-w2vly.mongodb.net/fish-live?retryWrites=true&w=majority',
  db_test: `mongodb+srv://team2admin:P4ssw0rd@team2booking-w2vly.mongodb.net/fish-test-${tester}?retryWrites=true&w=majority`,
  PORT: '3001',
  salt: 'två laxar i en laxask1337'
}

module.exports = config;