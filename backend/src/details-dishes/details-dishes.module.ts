import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailsDishesController } from './details-dishes.controller';
import { DetailsDishesService } from './details-dishes.service';
import { DishesDetailsEntity } from './entities/details-dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DishesDetailsEntity])],
  controllers: [DetailsDishesController],
  providers: [DetailsDishesService],
})
export class DetailsDishesModule {}
