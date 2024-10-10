"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let NotificationService = class NotificationService {
    async sendEmailBasedOnType(email, type) {
        const emailTemplate = this.getEmailTemplate(type);
        if (!emailTemplate) {
            throw new Error('Invalid email type');
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
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
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }
    getEmailTemplate(type) {
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
            moderate: {
                subject: 'New SPEED Article',
                text: 'There are new articles to be moderated',
                html: '<p>There are new articles to be moderated</p>',
            },
            analyse: {
                subject: 'New SPEED Article',
                text: 'There are new articles to be analysed',
                html: '<p>There are new articles to be analysed</p>',
            }
        };
        return templates[type] || null;
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)()
], NotificationService);
//# sourceMappingURL=notification.service.js.map