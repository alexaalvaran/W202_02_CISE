import { HttpStatus } from '@nestjs/common';
import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly submittedStatusService;
    constructor(submittedStatusService: NotificationService);
    sendEmail({ email, type }: {
        email: string;
        type: string;
    }): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
