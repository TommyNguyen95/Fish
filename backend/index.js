// Make this bad boy global so we don't have to import it everywhere
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const connectToDb = require('./config/db');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo')(session);
const userRoutes = require('./api/userRoutes');
const transactionsRoutes = require('./api/transactionsRoutes');
const dbtoggler = require('./dbtoggler');
const acl = require('./acl/acl');
const fishRules = require('./acl/fish-rules.json')
require('dotenv').config()

let config = {
  PORT: (process.env.NODE_ENV == 'production' ? 3020 : 3001),
  salt: 'två laxar i en laxask1337',
  db: process.env.DB_HOST,
  db_test: process.env.DB_TEST
}
global.config = config

io.on('connection', socket => {
  console.log('User connected');

  socket.on('message', (message) => {
    console.log(message);

  })

  socket.on('disconnect', () => {
    console.log('Disconnected');
  })
})

// Initial connection to DB
connectToDb()
app.use(bodyParser.json())

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(dbtoggler())

app.use(session({
  secret: config.salt,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: global.db,
    collection: 's',
    ttl: 14 * 24 * 60 * 60 //14 dagar
  })
})
)

app.get('/', (req, res) => {
  res.send('Välkommen till Fi$h super server')
});
app.use(acl(fishRules));
app.use(userRoutes);
app.use(transactionsRoutes);
http.listen(config.PORT, () => console.log(`Gulligagruppens server is on port ${config.PORT}`));