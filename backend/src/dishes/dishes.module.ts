import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { DishesEntity } from './entities/dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DishesEntity])],
  controllers: [DishesController],
  providers: [DishesService],
})
export class DishesModule {}
