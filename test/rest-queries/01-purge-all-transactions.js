module.exports = ({ expect, assert, response }) => ({
  path: 'transactions',
  method: 'delete',
  test() {
    expect(response).to.be.an('array').that.is.empty;
  }
});