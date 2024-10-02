import { Body, Controller, Post, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { SubmittedStatusService } from './submittedStatus.service';

@Controller('/api/submittedStatus')
export class SubmittedStatusController {
  constructor(private readonly submittedStatusService: SubmittedStatusService) {}

  @Post()
  async sendEmail(@Body() { email, type }: { email: string; type: string }) {
    // Validate input
    if (!email || !type) {
      throw new BadRequestException('Missing email or email type');
    }

    try {
      await this.submittedStatusService.sendEmailBasedOnType(
        email,
        type,
      );

      console.log('Email sent successfully');
      return { status: HttpStatus.OK, message: 'Email sent successfully' };

    } catch (error) {
      console.error('Error:', error);
      throw new HttpException('Failed to send email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
