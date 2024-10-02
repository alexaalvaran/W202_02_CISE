

const nodemailer = require("nodemailer");
const newArticleEmail = require('./newArticleEmail');
//require("dotenv").config();

//Creates resusable transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "rienne0203@gmail.com", //email sent from this account
      pass: "tlck slmc gwhs ucgv", //gmail generated password
    },
  });

  const mailOptions = {
    from: {
        name: 'W202_02 SPEED APP',
        address:'rienne0203@gmail.com'
    }, //sender email
    to: "achiu.heart@gmail.com, ymw7320@autuni.ac.nz",  //reciever email
    subject: "APP new articles for analyst", //email subject line 
    text: "New articles waiting to be reviewed by analyst. Please use button below to redirect to analyst page.", //email body text
    html: "<b>You have new articles waiting to be reviewed. Please login and check.</b>", //html body text
    
  }

    //function to find errors from transporter
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Email sent successfully: ' + info.response);
    });

  

