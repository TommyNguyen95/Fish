module.exports = ({ expect, assert, response, store }) => ({
  path: 'login',
  method: 'delete',
  test() {
    // Empty users and start by creating admin account with static properties
    expect(response.status).to.equal('logged out');
  }
});