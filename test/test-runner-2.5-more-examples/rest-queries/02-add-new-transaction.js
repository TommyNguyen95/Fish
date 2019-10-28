module.exports = ({ expect, assert, response }) => ({
  path: 'transactions',
  method: 'post',
  body: {
    to: "5db6d6b4a3f01803184e8f49",
    from: '5db6d6b4a3f01803184e8f50',
    amount: 300,
    message: 'Uppblåsbar banjo hehhe'
  },
  test() {
    expect(response).to.have.property('_id');
  }
});