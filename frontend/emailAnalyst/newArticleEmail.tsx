import { Button } from "@react-email/components";

const nodemailer = require("nodemailer");
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
        name: 'Adrienne Chiu',
        address:'rienne0203@gmail.com'
    }, //sender email
    to: "achiu.heart@gmail.com, ymw7320@autuni.ac.nz",  //reciever email
    subject: "APP new articles", //email subject line 
    text: "New articles waiting to be reviewed", //email body text
    html: "<b>You have new articles waiting to be reviewed. Please login and check.</b>", //html body text
    
  }

    //function to find errors from transporter
     transporter.sendMail(mailOptions, function(error: string, info: { response: string; }){
    if (error) {
      console.log("Error:" + error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  