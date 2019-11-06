module.exports = ({ expect, assert, response }) => ({
  path: 'user/12987981274812',
  method: 'put',
  body: {
    "like": "whateva"
  },
  test() {
    //Make sure a non authorized user cannot PUT users endpoint
    expect(response.nonJSON).to.have.string('No access!');
  }
});