// Make this bad boy global so we don't have to import it everywhere
const express = require('express');
const bodyParser = require('body-parser');
const connectToDb = require('./config/db');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const userRoutes = require('./api/userRoutes');
const transactionsRoutes = require('./api/transactionsRoutes');
const dbtoggler = require('./dbtoggler');
const acl = require('./acl/acl');
const fishRules = require('./acl/fish-rules.json')
require('dotenv').config()

let config = {
  PORT: '3001',
  salt: 'två laxar i en laxask1337',
  db: process.env.DB_HOST,
  db_test: process.env.DB_TEST
}
global.config = config

// Initial connection to DB
connectToDb()
const app = express();
app.use(cors());
app.use(bodyParser.json());

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
app.listen(config.PORT, () => console.log(`Gulligagruppens server is on port ${config.PORT}`));