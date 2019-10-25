module.exports = ({ expect, response }) => ({
  path: 'login',
  method: 'get',
  test() {
    expect(response.username).to.equal('arne anka');
    expect(response.role).to.equal('admin');
  }
});