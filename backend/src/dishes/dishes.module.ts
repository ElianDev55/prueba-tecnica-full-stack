import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DishesDetailsEntity } from 'src/details-dishes/entities/details-dish.entity';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { DishesEntity } from './entities/dish.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DishesEntity, DishesDetailsEntity]),
    AuthModule,
  ],
  controllers: [DishesController],
  providers: [DishesService],
})
export class DishesModule {}
