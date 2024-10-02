export declare class SubmittedStatusService {
    sendEmail(email: string): Promise<void>;
    findEmail(email: string): Promise<{
        email: string;
    }>;
}
