module.exports = ({ expect, response }) => ({
  path: 'transactions',
  method: 'get',
  test() {
    expect(response.nonJSON).to.equal('Page not found.');
  }
});