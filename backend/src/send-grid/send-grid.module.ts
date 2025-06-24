import { Module } from '@nestjs/common';
import { SendGridController } from './send-grid.controller';
import { SendGridService } from './send-grid.service';

@Module({
  controllers: [SendGridController],
  providers: [SendGridService],
  exports: [SendGridService],
})
export class SendGridModule {}
