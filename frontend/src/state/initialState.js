export default {
  apiEndpoint: (process.env.NODE_ENV === 'production' ? 'https://api.getfish.se' : 'http://localhost:3001'),
  loginState: {
    showLogo: true,
    username: '',
    password: '',
    isLoggedIn: false,
    firstname: '',
    lastname: '',
    relations: [],
    role: '',
    active: false,
    balance: 0,
    transactions: [],
  },
  transactionState: {
    amount: 0,
    message: '',
    email: '',
    checkPassword: '',
  }
}