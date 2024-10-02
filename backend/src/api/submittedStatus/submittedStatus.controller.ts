import { Body, Controller, Post, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { SubmittedStatusService } from './submittedStatus.service';

@Controller('/api/submittedStatus')
export class SubmittedStatusController {
  constructor(private readonly submittedStatusService: SubmittedStatusService) {}

  @Post()
  async sendEmail(@Body() { email, type }: { email: string , type:string}) {

    if(!email || !type){
      throw new BadRequestException('Missing email or email type');
    }

    const emailTemplate = this.submittedStatusService.getEmailTemplate(type);
    if(!emailTemplate){
      throw new BadRequestException('Invalid email type');
    }
    try {

      const foundEmail = await this.submittedStatusService.findEmail(email);

      if (!foundEmail) {
        throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
      }

      await this.submittedStatusService.sendEmail(
        foundEmail.email,
      emailTemplate.subject,
    emailTemplate.text,
  emailTemplate.html,
);

      return { status: 200, message: 'Email sent successfully' };
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      console.error('Error:', error);
      throw new HttpException('Failed to send email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
