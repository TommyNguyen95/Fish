module.exports = ({ expect, assert, response }) => ({
  path: 'user/12987981274812',
  method: 'post',
  body: {
    "like": "whateva",
    "like": "whatteeeevaaahhhhh"
  },
  test() {
    //Make sure you cannot create a bullshit user by posting random data
    expect(response.error).to.equal(404);
  }
});