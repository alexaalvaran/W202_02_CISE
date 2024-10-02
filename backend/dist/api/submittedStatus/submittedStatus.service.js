"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmittedStatusService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let SubmittedStatusService = class SubmittedStatusService {
    async sendEmail(email, subject, text, html) {
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
                subject: subject,
                text: text,
                html: html,
            });
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }
    getEmailTemplate(emailType) {
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
    async findEmail(email) {
        return { email };
    }
};
exports.SubmittedStatusService = SubmittedStatusService;
exports.SubmittedStatusService = SubmittedStatusService = __decorate([
    (0, common_1.Injectable)()
], SubmittedStatusService);
//# sourceMappingURL=submittedStatus.service.js.map