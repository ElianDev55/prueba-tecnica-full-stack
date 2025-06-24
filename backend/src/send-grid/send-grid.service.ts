import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { EmailTemplate } from './interfaces/email-temaplate.interface';

@Injectable()
export class SendGridService {
  private readonly logger = new Logger(SendGridService.name);
  private readonly sendGridApiKey: string = process.env.SENDGRID_API_KEY ?? '';

  async create(emailTemplate: EmailTemplate) {
    sgMail.setApiKey(this.sendGridApiKey);
    const msg = {
      to: emailTemplate.to,
      from: emailTemplate.from,
      subject: emailTemplate.subject,
      templateId: emailTemplate.templateId,
      dynamicTemplateData: emailTemplate.dynamicTemplateData,
    };

    this.logger.verbose('Sending email to: ', emailTemplate.to);

    try {
      await sgMail
        .send(msg)
        .then(() => {
          this.logger.verbose('Email sent');
          return {
            message: 'Email sent',
          };
        })
        .catch((error) => {
          this.logger.error('Error sending email: ', error);
          throw new InternalServerErrorException(error);
        });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
