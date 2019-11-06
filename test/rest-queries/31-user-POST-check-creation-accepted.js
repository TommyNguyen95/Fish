module.exports = ({ expect, assert, response, store }) => ({
  path: 'user',
  method: 'post',
  body: store.userdata,
  test() {
    //Make sure you can create a user with all required data!
    expect(response).to.have.property('_id')
    store.latest = response;
  }
});