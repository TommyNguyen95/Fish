module.exports = ({ expect, assert, response }) => ({
  path: 'user/12987981274812',
  method: 'get',
  test() {
    //Make sure a non authorized visitor cannot GET a user endpoint by ID
    expect(response.nonJSON).to.have.string('No access!');
  }
});