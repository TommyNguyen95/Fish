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
    html:
      `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /><!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" /><!--<![endif]-->
    <!--[if (gte mso 9)|(IE)]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
    <style type="text/css">
      body {width: 700px;margin: 0 auto;}
      table {border-collapse: collapse;}
      table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
      img {-ms-interpolation-mode: bicubic;}
    </style>
    <![endif]-->

    <style type="text/css">
      body, p, div {
        font-family: arial;
        font-size: 14px;
      }
      body {
        color: #000000;
      }
      body a {
        color: #1188E6;
        text-decoration: none;
      }
      p { margin: 0; padding: 0; }
      table.wrapper {
        width:100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      @media screen and (max-width:480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
            text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 480px !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
      }
    </style>
    <!--user entered Head Start-->

     <!--End Head user entered-->
  </head>
  <body>
    <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size: 14px; font-family: arial; color: #000000; background-color: #0058a3;">
      <div class="webkit">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#0058a3">
          <tr>
            <td valign="top" bgcolor="#0058a3" width="100%">
              <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="100%">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <!--[if mso]>
                          <center>
                          <table><tr><td width="700">
                          <![endif]-->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:700px;" align="center">
                            <tr>
                              <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #000000; text-align: left;" bgcolor="#0058a3" width="100%" align="left">

    <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%"
           style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
      <tr>
        <td role="module-content">
          <p></p>
        </td>
      </tr>
    </table>

    <table class="module"
           role="module"
           data-type="spacer"
           border="0"
           cellpadding="0"
           cellspacing="0"
           width="100%"
           style="table-layout: fixed;">
      <tr>
        <td style="padding:0px 0px 200px 0px;"
            role="module-content"
            bgcolor="">
        </td>
      </tr>
    </table>

    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;"
            height="100%"
            valign="top"
            bgcolor="">
            <h2 style="text-align: center;"><span style="color:#FFFFFF;"><strong><span style="font-family:lucida sans unicode,lucida grande,sans-serif;">Aktivera ditt konto genom att klicka p&aring; knappen!</span></strong></span></h2>

        </td>
      </tr>
    </table>
  <table border="0" cellPadding="0" cellSpacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%"><tbody><tr><td align="center" class="outer-td" style="padding:0px 0px 0px 0px"><table border="0" cellPadding="0" cellSpacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center"><tbody><tr><td align="center" bgcolor="#FDD100" class="inner-td" style="border-radius:6px;font-size:16px;text-align:center;background-color:inherit"><a style="background-color:#FDD100;border:1px solid #333333;border-color:#000000;border-radius:6px;border-width:0px;color:#000000;display:inline-block;font-family:arial,helvetica,sans-serif;font-size:16px;font-weight:normal;letter-spacing:0px;line-height:16px;padding:12px 18px 12px 18px;text-align:center;text-decoration:none" href="${process.env.NODE_ENV == 'production' ? 'https://api.getfish.se' : 'http://localhost:3001'}/api/activate/${id}" target="_blank">KLICKA HÄR</a></td></tr></tbody></table></td></tr></tbody></table>
    <table class="module"
           role="module"
           data-type="spacer"
           border="0"
           cellpadding="0"
           cellspacing="0"
           width="100%"
           style="table-layout: fixed;">
      <tr>
        <td style="padding:0px 0px 200px 0px;"
            role="module-content"
            bgcolor="">
        </td>
      </tr>
    </table>
  
                              </td>
                            </tr>
                          </table>
                          <!--[if mso]>
                          </td></tr></table>
                          </center>
                          <![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>
      `
  });

  // console.log('Message sent: %s', info.messageId);

}

activationMail().catch(console.error);

async function sendResetPasswordLink(user) {
  // Generate test SMTP service account from ethereal.email
  if (!user) {
    return
  }

  let { username, id } = user

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
    // text: `Ditt nya lösenord är : ${password}`, // plain text body
    html:
      `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /><!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" /><!--<![endif]-->
    <!--[if (gte mso 9)|(IE)]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
    <style type="text/css">
      body {width: 700px;margin: 0 auto;}
      table {border-collapse: collapse;}
      table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
      img {-ms-interpolation-mode: bicubic;}
    </style>
    <![endif]-->

    <style type="text/css">
      body, p, div {
        font-family: arial;
        font-size: 14px;
      }
      body {
        color: #000000;
      }
      body a {
        color: #1188E6;
        text-decoration: none;
      }
      p { margin: 0; padding: 0; }
      table.wrapper {
        width:100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      @media screen and (max-width:480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
            text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 480px !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
      }
    </style>
    <!--user entered Head Start-->

     <!--End Head user entered-->
  </head>
  <body>
    <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size: 14px; font-family: arial; color: #000000; background-color: #0058a3;">
      <div class="webkit">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#0058a3">
          <tr>
            <td valign="top" bgcolor="#0058a3" width="100%">
              <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="100%">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <!--[if mso]>
                          <center>
                          <table><tr><td width="700">
                          <![endif]-->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:700px;" align="center">
                            <tr>
                              <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #000000; text-align: left;" bgcolor="#0058a3" width="100%" align="left">

    <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%"
           style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
      <tr>
        <td role="module-content">
          <p></p>
        </td>
      </tr>
    </table>

    <table class="module"
           role="module"
           data-type="spacer"
           border="0"
           cellpadding="0"
           cellspacing="0"
           width="100%"
           style="table-layout: fixed;">
      <tr>
        <td style="padding:0px 0px 200px 0px;"
            role="module-content"
            bgcolor="">
        </td>
      </tr>
    </table>

    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;"
            height="100%"
            valign="top"
            bgcolor="">
            <h2 style="text-align: center;"><span style="color:#FFFFFF;"><strong><span style="font-family:lucida sans unicode,lucida grande,sans-serif;">&Aring;terst&auml;ll ditt l&ouml;senord&nbsp;genom att klicka p&aring; knappen!</span></strong></span></h2>

        </td>
      </tr>
    </table>
  <table border="0" cellPadding="0" cellSpacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%"><tbody><tr><td align="center" class="outer-td" style="padding:0px 0px 0px 0px"><table border="0" cellPadding="0" cellSpacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center"><tbody><tr><td align="center" bgcolor="#FDD100" class="inner-td" style="border-radius:6px;font-size:16px;text-align:center;background-color:inherit"><a style="background-color:#FDD100;border:1px solid #333333;border-color:#000000;border-radius:6px;border-width:0px;color:#000000;display:inline-block;font-family:arial,helvetica,sans-serif;font-size:16px;font-weight:normal;letter-spacing:0px;line-height:16px;padding:12px 18px 12px 18px;text-align:center;text-decoration:none" href="${process.env.NODE_ENV == 'production' ? 'https://api.getfish.se' : 'http://localhost:3001'}/api/resetpassword/${id}" target="_blank">KLICKA HÄR</a></td></tr></tbody></table></td></tr></tbody></table>
    <table class="module"
           role="module"
           data-type="spacer"
           border="0"
           cellpadding="0"
           cellspacing="0"
           width="100%"
           style="table-layout: fixed;">
      <tr>
        <td style="padding:0px 0px 200px 0px;"
            role="module-content"
            bgcolor="">
        </td>
      </tr>
    </table>
  
                              </td>
                            </tr>
                          </table>
                          <!--[if mso]>
                          </td></tr></table>
                          </center>
                          <![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>
      `
  });

  console.log('Message sent: %s', info.messageId);

}

sendResetPasswordLink().catch(console.error);


async function resetPassword(user) {
  // Generate test SMTP service account from ethereal.email
  if (!user) {
    return
  }

  let { password, username } = user

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
    text: `Ditt nya lösenord är: ${password}`, // plain text body
    html: `
            < a href = "http://localhost:3001/api/resetPassword/${id}" > KLICKA HÄR FÖR ATT AKTIVERA DITT KONTO</a>
          `
  });

  console.log('Message sent: %s', info.messageId);

}

resetPassword().catch(console.error);

module.exports = { 'reset': resetPassword, 'activate': activationMail, 'sendResetLink': sendResetPasswordLink }