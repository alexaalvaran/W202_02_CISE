export declare class NotificationService {
    sendEmailBasedOnType(email: string, type: string): Promise<void>;
    getEmailTemplate(type: string): any;
}
