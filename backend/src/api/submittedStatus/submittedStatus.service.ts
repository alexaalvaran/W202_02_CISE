import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SubmittedStatusService {
  async sendEmail(email: string): Promise<void> {
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
        subject: `SPEED Article Status`, // Subject line
        text: 'SPEED Article Approved', // plain text body
        html: '<p>Approved</p>', // HTML body
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  // Simulate a method to find the email in your database
  async findEmail(email: string): Promise<{ email: string }> {
    // Add your logic here to find the email from the database
    return { email };
  }
}
