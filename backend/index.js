const express = require('express');
const bodyParser = require('body-parser');
const connectToDb = require('./config/db');
const config = require('./config/config');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const userRoutes = require('./api/userRoutes');
const nodemailer = require('nodemailer');


connectToDb();

const app = express();

async function main() {
  // Generate test SMTP service account from ethereal.email
 

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true,
    auth: {
      user: 'apikey',
      pass: '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'
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"FI$H" <fishapplication@outlook.com>', // sender address
    to: 'tommyduynguyen95@gmail.com', // list of receivers
    subject: 'Welcome to FI$H-APP', // Subject line
    text: 'BRURRHH', // plain text body
    // html: '<b>Hello world?</b>' // html body
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

}

main().catch(console.error);

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
app.use(userRoutes);
app.listen(config.PORT, () => console.log(`Gulligagruppens server is on port ${config.PORT}`));