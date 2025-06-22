import { Module } from '@nestjs/common';
import { SaucesService } from './sauces.service';
import { SaucesController } from './sauces.controller';

@Module({
  controllers: [SaucesController],
  providers: [SaucesService],
})
export class SaucesModule {}
