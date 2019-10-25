const express = require('express');
const bodyParser = require('body-parser');
const connectToDb = require('./config/db');
const config = require('./config/config');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

connectToDb();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: 'Två laxar i en lax ask',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: global.db
  })
}));

app.get('/', (req, res) => res.send('Välkommen till Fi$h super server'));
app.listen(config.PORT, () => console.log(`Gulligagruppens server is on port ${config.PORT}`));