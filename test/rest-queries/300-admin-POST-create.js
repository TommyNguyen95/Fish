module.exports = ({ expect, assert, response }) => ({
  path: 'user',
  method: 'post',
  body: {
    "username": "admin@test.nu",
    "password": "123456",
    "ssn": "20110511",
  },
  test() {
    //Make sure you can create a user with all required data!
    expect(response).to.have.property('_id')
  }
});