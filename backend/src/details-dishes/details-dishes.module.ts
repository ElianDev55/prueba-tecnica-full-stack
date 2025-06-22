import { Module } from '@nestjs/common';
import { DetailsDishesService } from './details-dishes.service';
import { DetailsDishesController } from './details-dishes.controller';

@Module({
  controllers: [DetailsDishesController],
  providers: [DetailsDishesService],
})
export class DetailsDishesModule {}
