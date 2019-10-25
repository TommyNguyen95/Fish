module.exports = ({ expect, response }) => ({
  path: 'login',
  method: 'post',
  body: {
    username: 'arne anka',
    password: '123456'
  },
  test() {
    expect(response.username).to.equal('arne anka');
    expect(response.role).to.equal('admin');
  }
});