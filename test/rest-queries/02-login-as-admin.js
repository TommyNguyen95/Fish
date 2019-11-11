module.exports = ({ expect, assert, response, store }) => ({
  path: 'login',
  method: 'post',
  body: {
    username: "admin@test.nu",
    password: "123456"
  },
  test() {
    // Empty users and start by creating admin account with static properties
    expect(response).to.have.property('_id')
  }
});