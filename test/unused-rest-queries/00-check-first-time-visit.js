module.exports = ({ expect, assert, response }) => ({
  path: 'login',
  method: 'get',
  test() {
    //Make sure a new client (without session) is not logged in!
    expect(response.status).to.have.string('not logged in');
  }
});