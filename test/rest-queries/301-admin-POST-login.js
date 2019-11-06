module.exports = ({expect, response}) => ({
  path: 'login',
  method: 'post',
  body: {
    username: 'admin@test.nu',
    password: '123456'
  },
  test(){
    expect(response.username).to.equal('admin@test.nu');
    expect(response.role).to.equal('admin');
  }
})