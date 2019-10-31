module.exports = ({ expect, assert, response }) => ({
  path: 'login',
  method: 'get',
  test() {
    expect(response).to.be.an('array').that.is.empty;
  }
});