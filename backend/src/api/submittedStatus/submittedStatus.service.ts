import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SubmittedStatusService {
  async sendEmail(email: string, subject: string, text: string, html: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER, // sender address
        to: email, // receiver email
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // HTML body
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  getEmailTemplate(emailType: string){
    const emailTemplates = {
      approved: {
        subject: 'SPEED Article Status',
        text: 'Your submitted SPEED article has been approved',
        html: '<h1> SPEED ARTILCE STATUS </h1> <p> Your submitted SPEED article has been approved. </p> <p> You can check your submitted article at ... </p>',
      },
      rejected: {
        subject: 'SPEED Article Status',
        text: 'Your submitted SPEED article has been rejected',
        html: '<h1> SPEED ARTILCE STATUS </h1> <p> Your submitted SPEED article has been rejected. </p> <p> You can submit a new article</p>',
      },
      analyst: {
        subject: 'SPEED Article',
        text: 'New Articles',
        html: '<h1> NEW SPEED ARTILCES </h1> <p> There are new articles to be analysed in SPEED. </p> <p> You can check the queue here </p>',
      },
      moderator: {
        subject: 'SPEED Article',
        text: 'New Articles',
        html: '<h1> NEW SPEED ARTILCES </h1> <p> There are new articles to be moderated in SPEED. </p> <p> You can check the queue here </p>',
      },
    };

    return emailTemplates[emailType] || null;
  }
  async findEmail(email: string): Promise<{ email: string }> {
    return { email };
  }
}
