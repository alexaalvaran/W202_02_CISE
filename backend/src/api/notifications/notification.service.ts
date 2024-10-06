import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {

  async sendEmailBasedOnType(email: string, type: string): Promise<void> {
    const emailTemplate = this.getEmailTemplate(type);
    if (!emailTemplate) {
      throw new Error('Invalid email type');
    }

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
        from: process.env.GMAIL_USER,
        to: email,
        subject: emailTemplate.subject,
        text: emailTemplate.text,
        html: emailTemplate.html,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  getEmailTemplate(type: string) {
    const templates = {
      approved: {
        subject: 'SPEED Article Approved',
        text: 'Your article has been approved.',
        html: '<p>Your article has been approved.</p>',
      },
      rejected: {
        subject: 'SPEED Article Rejected',
        text: 'Your article has been rejected.',
        html: '<p>Your article has been rejected.</p>',
      },
      moderate : {
        subject: 'New SPEED Article',
        text: 'There are new articles to be moderated',
        html: '<p>There are new articles to be moderated</p>',
      }
    };

    return templates[type] || null;
  }


}