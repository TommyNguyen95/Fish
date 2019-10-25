module.exports = ({ response, repeat, store, i, expect }) => ({
  path: 'users/' + store.userIdsToDelete[i],
  method: 'delete',
  test() {
    expect(response.deletedCount).to.equal(1);
    // Repeat as long as there are more to delete
    if(store.userIdsToDelete[i + 1]){ repeat(); }
  }
});