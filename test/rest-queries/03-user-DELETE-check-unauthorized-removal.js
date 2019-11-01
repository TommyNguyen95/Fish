module.exports = ({ expect, assert, response }) => ({
  path: 'user/10298401924',
  method: 'delete',
  body: {
    "like": "whateva"
  },
  test() {
    //Make sure a non authorized user cannot DELETE users endpoint
    expect(response.nonJSON).to.have.string('No access!');
  }
});