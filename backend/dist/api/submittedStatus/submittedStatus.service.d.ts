export declare class SubmittedStatusService {
    sendEmailBasedOnType(email: string, type: string): Promise<void>;
    getEmailTemplate(type: string): any;
}
