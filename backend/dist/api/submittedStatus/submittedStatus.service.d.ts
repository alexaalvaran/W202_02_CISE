export declare class SubmittedStatusService {
    sendEmail(email: string, subject: string, text: string, html: string): Promise<void>;
    getEmailTemplate(emailType: string): any;
    findEmail(email: string): Promise<{
        email: string;
    }>;
}
