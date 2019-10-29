const nodemailer = require('nodemailer');

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