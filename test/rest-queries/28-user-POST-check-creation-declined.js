module.exports = ({ expect, assert, response }) => ({
  path: 'user',
  method: 'post',
  body: {
    "firstname": "Kim",
    "lastname": "Johnsson",
    "username": "kim.johnsson@telia.com",
    "password": "noccoLover4Lajf"
  },
  test() {
    //Make sure you cannot create a bullshit user by NOT posting all the required data
    expect(response).to.have.property('error')
  }
});