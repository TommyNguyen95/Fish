// Make this bad boy global so we don't have to import it everywhere
const config = require('./config/config')
global.config = config;
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

// Initial connection to DB
connectToDb()
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(dbtoggler())
app.use(session({
  secret: global.config.salt,
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
app.listen(global.config.PORT, () => console.log(`Gulligagruppens server is on port ${global.config.PORT}`));