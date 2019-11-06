module.exports = ({ expect, assert, response }) => ({
    path: 'user',
    method: 'post',
    body: {
        username: 'kim.johnsson@telia.com',
        password: '123456',
        ssn: '1998-10-03'
      },
    test() {
      //Make sure a new client (without session) is not logged in!
      expect(response).to.have.property('_id')
    }
  });