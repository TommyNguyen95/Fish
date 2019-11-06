module.exports = ({ expect, assert, response, store }) => ({
  path: 'createadmin',
  method: 'get',
  test() {
    // Empty users and start by creating admin account with pre-activated account (custom route for test purposes)
    expect(response).to.have.property('_id')
    store.admin = response
  }
});