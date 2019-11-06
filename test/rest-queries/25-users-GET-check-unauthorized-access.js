module.exports = ({ expect, assert, response }) => ({
  path: 'users',
  method: 'get',
  test() {
    //Make sure a non authorized user cannot GET users endpoint
    expect(response.nonJSON).to.have.string('No access!');
  }
});