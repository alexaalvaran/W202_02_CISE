import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import * as nodemailer from 'nodemailer';

// Mock the entire nodemailer module
jest.mock('nodemailer');

describe('NotificationService', () => {
  let service: NotificationService;
  let mockSendMail: jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationService],
    }).compile();

    service = module.get<NotificationService>(NotificationService);

    mockSendMail = jest.fn().mockResolvedValue({});

    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: mockSendMail,
    });

    process.env.GMAIL_USER = 'testuser@gmail.com';
    process.env.GMAIL_PASSWORD = 'testpassword';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send an email for a valid "approved" type', async () => {
    await service.sendEmailBasedOnType('recipient@example.com', 'approved');

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    expect(mockSendMail).toHaveBeenCalledWith({
      from: process.env.GMAIL_USER,
      to: 'recipient@example.com',
      subject: 'SPEED Article Approved',
      text: 'Your article has been approved.',
      html: '<p>Your article has been approved.</p>',
    });
  });

  it('should throw an error for an invalid email type', async () => {
    await expect(
      service.sendEmailBasedOnType('recipient@example.com', 'invalid-type'),
    ).rejects.toThrow('Invalid email type');

    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it('should handle sending email errors', async () => {
    mockSendMail.mockRejectedValue(new Error('Failed to send email'));

    await expect(
      service.sendEmailBasedOnType('recipient@example.com', 'approved'),
    ).rejects.toThrow('Failed to send email');
  });

  it('should send an email for a valid "rejected" type', async () => {
    await service.sendEmailBasedOnType('recipient@example.com', 'rejected');

    expect(mockSendMail).toHaveBeenCalledWith({
      from: process.env.GMAIL_USER,
      to: 'recipient@example.com',
      subject: 'SPEED Article Rejected',
      text: 'Your article has been rejected.',
      html: '<p>Your article has been rejected.</p>',
    });
  });

  it('should send an email for a valid "moderate" type', async () => {
    await service.sendEmailBasedOnType('recipient@example.com', 'moderate');

    expect(mockSendMail).toHaveBeenCalledWith({
      from: process.env.GMAIL_USER,
      to: 'recipient@example.com',
      subject: 'New SPEED Article',
      text: 'There are new articles to be moderated',
      html: '<p>There are new articles to be moderated</p>',
    });
  });
});
