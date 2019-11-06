module.exports = ({ expect, assert, response, store }) => ({
  path: 'login',
  method: 'post',
  body: store.userdata,
  test() {
    // Empty users and start by creating admin account with static properties
    expect(response).to.have.property('_id')
  }
});