module.exports = ({ response, repeat, store, i, expect }) => ({
  path: 'users',
  method: 'post',
  body: store.dummyUsers[i],
  test() {
    // does the server say user created
    expect(response.success).to.equal('User created');
    // repeat this query as long as more dummy users
    if(store.dummyUsers[i + 1]){ repeat(); }
  }
});