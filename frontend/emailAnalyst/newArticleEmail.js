const nodemailer = require("nodemailer");
const newArticleEmail = require('./newArticleEmail');

//Creates reusable transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "rienne0203@gmail.com", // email sent from this account
    pass: "tlck slmc gwhs ucgv", // gmail generated password
  },
});

const mailOptions = {
  from: {
    name: 'W202_02 SPEED APP',
    address: 'rienne0203@gmail.com',
  }, // sender email
  to: "achiu.heart@gmail.com", // receiver email
  subject: "APP new articles for analyst", // email subject line 
  text: "Hello,\n\nThere are new articles waiting to be reviewed by an analyst. Please use the button below to access the analyst page.\n\nBest regards,\nSPEED App Team", // plain text body
  html: `
    <p>Please <a href="http://localhost:3000/login">login</a> and check.</p>
    <p>Best regards,<br/>SPEED App Team</p>
  `, // html body
};

// function to find errors from transporter
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Email sent successfully: ' + info.response);
});
