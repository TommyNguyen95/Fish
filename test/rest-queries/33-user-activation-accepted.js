module.exports = ({ expect, assert, response, store }) => ({
  path: 'activatetestuser',
  method: 'post',
  body: store.userdata,
  test() {
    // Activate our testuser by a magic endpoint
    expect(response.nonJSON).to.equal('activated')
  }
})