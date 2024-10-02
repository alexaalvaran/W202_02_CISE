import { HttpStatus } from '@nestjs/common';
import { SubmittedStatusService } from './submittedStatus.service';
export declare class SubmittedStatusController {
    private readonly submittedStatusService;
    constructor(submittedStatusService: SubmittedStatusService);
    sendEmail({ email, type }: {
        email: string;
        type: string;
    }): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
