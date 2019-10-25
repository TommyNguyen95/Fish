module.exports = ({ expect, response }) => ({
  path: 'users',
  method: 'get',
  test() {
    expect(response.nonJSON).to.equal('Page not found.');
  }
});