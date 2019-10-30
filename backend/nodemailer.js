const nodemailer = require('nodemailer');

async function activationMail(user) {
  // Generate test SMTP service account from ethereal.email
  if (!user) {
    return
  }

  let { id, username } = user

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
    to: username, // list of receivers
    subject: 'Welcome to FI$H-APP', // Subject line
    text: "klicka här för att aktivera", // plain text body
    html: `<a href="http://localhost:3001/api/activate/${id}">KLICKA HÄR FÖR ATT AKTIVERA DITT KONTO</a>`
  });

  console.log('Message sent: %s', info.messageId);


}

activationMail().catch(console.error);





module.exports = activationMail