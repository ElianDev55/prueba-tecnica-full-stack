import { Body, Controller, Post } from '@nestjs/common';
import { EmailTemplate } from './interfaces/email-temaplate.interface';
import { SendGridService } from './send-grid.service';

@Controller('send-grid')
export class SendGridController {
  constructor(private readonly sendGridService: SendGridService) {}

  @Post()
  async create(@Body() emailTemplate: EmailTemplate) {
    return await this.sendGridService.create(emailTemplate);
  }
}
