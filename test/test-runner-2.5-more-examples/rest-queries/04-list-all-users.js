module.exports = ({ expect, response, assert, store }) => ({
  path: 'users',
  method: 'get',
  test() {
    expect(response.nonJSON).to.not.equal('Page not found.');
    assert(response.length > 0);

    // save user ids to delete in store
    store.userIdsToDelete = response
      .filter(x => x.username !== 'arne anka')
      .map(x => x._id);

    // setup some dummy users for next step
    if(!store.dummyUsers){
      store.dummyUsers = require('./dummy-users.json');
    }
  }
});