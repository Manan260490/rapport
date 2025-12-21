const nodemailer = require("nodemailer");
module.exports = mailer = async (mailBody, reciver, text, subject) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "support@rapporthr.in",
      pass: "xfidfvvajvbrkrwm",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let response = await transporter.sendMail({
    from: '"Rapport HR Solutions" <support@rapporthr.in>', // sender address
    to: reciver, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: mailBody, // html body
  });
  console.log(response);
};
