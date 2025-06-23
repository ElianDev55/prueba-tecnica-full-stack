import { Module } from '@nestjs/common';
import { SendGridService } from './send-grid.service';
import { SendGridController } from './send-grid.controller';

@Module({
  controllers: [SendGridController],
  providers: [SendGridService],
})
export class SendGridModule {}
