module.exports = ({expect, response}) => ({
  path: 'login',
  method: 'post',
  body: {
    username: 'hamid2@telia.com',
    password: '123456'
  },
  test(){
    expect(response.username).to.equal('hamid2@telia.com');
    expect(response.role).to.equal('admin');

  }
})