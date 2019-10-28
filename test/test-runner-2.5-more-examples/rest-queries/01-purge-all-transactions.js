module.exports = ({ expect, assert, response }) => ({
  path: 'transactionsSecretPurgeUrl',
  method: 'delete',
  test() {
    expect(response).to.be.an('array').that.is.empty;
  }
});