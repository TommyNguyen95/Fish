export default {
  apiEndpoint: (process.env.NODE_ENV === 'production' ? 'https://api.getfish.se' : 'http://localhost:3001'),
  loginState: {
    username: '',
    password: '',
    isLoggedIn: false
  },
  hamidState: {
    isDead: false,
  }
}