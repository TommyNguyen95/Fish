module.exports = ({ expect, assert, response }) => ({
  path: 'transactions',
  method: 'get',
  test() {
    //Make sure you can create a user with all required data!
    expect(response).to.equal('List of transactions')
  }
});