import { SubmittedStatusService } from './submittedStatus.service';
export declare class SubmittedStatusController {
    private readonly submittedStatusService;
    constructor(submittedStatusService: SubmittedStatusService);
    sendEmail({ email }: {
        email: string;
    }): Promise<{
        status: number;
        message: string;
    }>;
}
