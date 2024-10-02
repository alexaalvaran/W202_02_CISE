import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { SubmittedStatusService } from './submittedStatus.service';

@Controller('/api/submittedStatus')
export class SubmittedStatusController {
  constructor(private readonly submittedStatusService: SubmittedStatusService) {}

  @Post()
  async sendEmail(@Body() { email }: { email: string }) {
    try {
      const foundEmail = await this.submittedStatusService.findEmail(email);

      if (!foundEmail) {
        throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
      }

      await this.submittedStatusService.sendEmail(foundEmail.email);

      return { status: 200, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error:', error);
      throw new HttpException('Failed to send email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
