module.exports = ({ expect, assert, response }) => ({
  path: 'user',
  method: 'post',
  body: {
    "username": "kim.johnsson@telia.com",
    "password": "noccoLover4Lajf",
    "ssn": "20110512"
  },
  test() {
    //Make sure you can create a user with all required data!
    expect(response).to.have.property('_id')
  }
});