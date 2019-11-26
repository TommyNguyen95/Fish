module.exports = ({ expect, assert, response, store }) => ({
  path: 'users',
  method: 'get',
  test() {
    // Empty users and start by creating admin account with static properties
    expect(response.nonJSON).to.equal('No access!')
  }
});