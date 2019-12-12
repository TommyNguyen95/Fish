// Make this bad boy global so we don't have to import it everywhere
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
require('./socket/socket')(io);
const bodyParser = require('body-parser');
const connectToDb = require('./config/db');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo')(session);
const userRoutes = require('./api/userRoutes');
const subscribeRoutes = require('./api/subscribeRoute');
const transactionsRoutes = require('./api/transactionsRoutes');
const dbtoggler = require('./dbtoggler');
const acl = require('./acl/acl');
const fishRules = require('./acl/fish-rules.json')
const webpush = require('web-push');
require('dotenv').config()

let config = {
  PORT: (process.env.NODE_ENV == 'production' ? 3001 : 3001),
  salt: 'två laxar i en laxask1337',
  db: process.env.DB_HOST,
  db_test: process.env.DB_TEST
}
global.config = config

const vapidKeys = {
  public: 'BNbQqABsvzqKWMgMrZuo2G4JIAmehEFH-wf8WDh3Ot1YBr1TLymn75SLOtx8U4mIvKFtrXlbcZ8GJArp0-d5hoE',
  private: process.env.VAPID_PRIVATE
}

webpush.setVapidDetails(
  'mailto:noreply.getfish@gmail.com',
  vapidKeys.public,
  vapidKeys.private
);

// Initial connection to DB
connectToDb()
app.use(bodyParser.json())

app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.1.30:3000', 'https://getfish.se'],
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
app.use(userRoutes, subscribeRoutes);
app.use(transactionsRoutes);
http.listen(config.PORT, () => console.log(`Gulligagruppens server is on port ${config.PORT}`));